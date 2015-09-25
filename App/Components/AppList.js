'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator,
  PixelRatio,
  Platform,
} = React;

var ActionSheetIOS = require('ActionSheetIOS');

var reloadApp = require('../Utilities/reloadApp');
var Api = require("../Api/Core");
var NoResults = require('../Components/NoResults');
var generateAppURL = require('../Utilities/generateAppURL');
var Spinner = require('./Spinner');
var Colors = require('../Utilities/Colors');

var AppList = React.createClass({
  getInitialState() {
    return {
      page: 1,
      data: [],
      hasError: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount() {
    this.fetchApps();
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ hasError: false, loaded: false, page: 1, data: [] });
      this.fetchApps();
    }
  },

  fetchApps(page = 1) {
    if (!this.requestInFlight) {
      this.requestInFlight = true;
      var separator = this.props.url.indexOf('?') !== -1 ?
        '&' :
        '?';
      var url = `${this.props.url}${separator}page=${page}`;
      console.log(page);

      Api.get(url)
        .then((data) => {
          if (data.error) {
            // TODO: check for 401 Unauthorized
            if (Navigator.getContext(this)) {
              Navigator.getContext(this).replace({id: "login", error: data.error});
            }
            return;
          }

          var newData = this.state.data.concat(data);

          this.setState({
            data: newData,
            dataSource: this.state.dataSource.cloneWithRows(newData),
            loaded: true,
            hasError: false
          });
        })
        .catch((e) => {
          this.setState({hasError: true});
          this.requestInFlight = false;
        })
        .finally(() => {
          this.requestInFlight = false;
        })
        .done();
    }
  },

  _handleEndReached() {
    var nextPage = this.state.page += 1;
    this.setState({ page: nextPage });
    this.fetchApps(nextPage);
  },

  renderAppList() {
    return (
      <ListView
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={this.renderApp}
        initialPageSize={10}
        pageSize={5}
        onEndReachedThreshold={1200}
        onEndReached={this._handleEndReached} />
    );
  },

  renderCreator(app) {
    if (app.creator && !this.props.hideCreator) {
      var avatarUrl = 'https://rnplay.org/' + app.creator.avatar_url + "?v=1";

      return (
        <View style={styles.creator}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: avatarUrl}} />
          </View>
          <Text style={styles.username} numberOfLines={1}>{app.creator.username || 'guest'}</Text>
        </View>
      )
    }
  },

  shareApp(app) {
    var url = 'https://rnplay.org/apps/' + app.url_token;
    var message = '"' + (app.name || app.module_name) + '" on rnplay.org';

    ActionSheetIOS.showShareActionSheetWithOptions(
      {url: url, message: message},
      (error) => console.log(error),
      (success) => console.log(success)
    );
  },

  renderApp(app) {
    return (
        <TouchableHighlight underlayColor={Colors.veryLightGrey} onLongPress={() => this.shareApp(app)}
                                                    onPress={() => this.selectApp(app)}>
          <View style={styles.appContainer}>
            <View style={styles.appTextDescription}>
              <Text style={styles.appTitle} numberOfLines={1}>{app.name || app.module_name}</Text>
              <View style={styles.targetBuild}>
                <Text style={styles.targetBuildText}>Targets <Text>{app.build_name}</Text></Text>
              </View>

              <View style={styles.viewCount}>
                <Text style={styles.viewCountText}>{app.view_count} <Text>views</Text></Text>
              </View>
            </View>

            { this.renderCreator(app) }
          </View>
        </TouchableHighlight>
    );
  },

  selectApp(app) {
    Api.post("/apps/"+app.url_token+"/view.json");
    reloadApp(generateAppURL(app), app.bundle_path, app.module_name, app.name);
  },

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <Spinner isLoading={true} />
      </View>
    );
  },

  renderNoResults() {
    return(
      <NoResults />
    );
  },

  renderRetry() {
    return (
      <View style={styles.retryButtonWrapper}>
        <Image source={require("image!network_error")} style={{opacity: 0.9, marginBottom: 30}} />
        <TouchableHighlight
          style={styles.retryButtonHighlight}
          onPress={() => this.fetchApps()}>
          <View style={styles.retryButtonView}>
            <Text style={styles.retryButtonText}>Connection failed. Retry?</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  render() {
    if (!this.state.loaded && !this.state.hasError) {
      return this.renderLoading();
    } else if (this.state.hasError && !this.state.data.length) {
      return this.renderRetry();
    } else {
      if (this.state.dataSource.getRowCount() > 0) {
        return this.renderAppList();
      }
      else {
        return this.renderNoResults();
      }
    }
  }
});

var deviceWidth = require('Dimensions').get('window').width;

var styles = StyleSheet.create({
  retryButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },

  retryButtonHighlight: {
    borderRadius: 7,
    overflow: 'hidden',
  },

  retryButtonView: {
    height: 40,
    backgroundColor: Colors.tintColor,
  },

  retryButtonText: {
    padding:10,
    paddingLeft: 20,
    paddingRight: 20,
    color:'white',
    textAlign:'center',
    fontWeight:'700'
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  loadingContainer: {
    flex: 1,
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 3 / PixelRatio.get(),
    borderBottomColor: "#eee"
  },

  appTextDescription: {
    flexDirection: 'column',
    marginLeft: 10,
  },

  targetBuild: {
    opacity: 0.4,
    paddingBottom: 2,
  },

  viewCount: {
    opacity: 0.4,
  },

  targetBuildText: {
    fontSize: 12,
    fontFamily: 'Avenir Next',
  },

  viewCountText: {
    fontSize: 12,
    fontFamily: 'Avenir Next',
  },

  creator: {
    position: 'absolute',
    right: 0,
    width: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    fontSize: 11,
    opacity: 0.4,
    width: 50,
    textAlign: 'center',
  },

  avatarContainer: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: "black"
  },

  avatar: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
  },

  cancelButton: {
    color: 'white',
    flex: 1,
    fontSize: 25,
    marginLeft: 20
  },

  appTitle: {
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: Colors.tintColor,
    width: deviceWidth - 70,
    flex: 1,
  },
});

module.exports = AppList;
