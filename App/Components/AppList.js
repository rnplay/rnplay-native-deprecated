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
} = React;

var AppReloader = require('NativeModules').AppReloader;
var Api = require("../Api/Core");
var NoResults = require('../Components/NoResults');
var generateAppURL = require('../Utilities/generateAppURL');

var AppList = React.createClass({
  getInitialState() {
    return {
      page: 1,
      data: [],
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
      this.setState({ loaded: false });
      this.fetchApps();
    }
  },

  fetchApps() {
    if (!this.requestInFlight) {
      this.requestInFlight = true;
      var separator = this.props.url.indexOf('?') !== -1 ?
        '&' :
        '?';
      var url = `${this.props.url}${separator}page=${this.state.page}`;

      Api.get(url)
        .then((data) => {
          if (data.error) {
            // TODO: check for 401 Unauthorized
            if (Navigator.getContext(this)) {
              Navigator.getContext(this).replace({id: "login", error: data.error});
            }

            return;
          }

          var page = data.length ?
            this.state.page + 1:
            this.state.page;

          var newData = this.state.data.concat(data);
          this.setState({
            data: newData,
            page,
            dataSource: this.state.dataSource.cloneWithRows(newData),
            loaded: true
          });
          this.requestInFlight = false;
        })
        .done();

    }
  },

  renderAppList() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderApp}
          onEndReached={this.fetchApps}
          style={styles.listView} />
      </View>
    );
  },

  renderCreator(app) {
    if (app.creator && !this.props.hideCreator) {
      var avatarUrl = 'https://rnplay.org/' + app.creator.avatar_url;

      return (
        <View style={styles.creator}>
          <Image style={styles.avatar} resizeMode="contain" source={{uri: avatarUrl}} />
          <Text style={styles.username} numberOfLines={1}>{app.creator.username || 'guest'}</Text>
        </View>
      )
    }
  },

  renderApp(app) {
    return (
      <View style={{marginBottom: 15}}>
        <TouchableHighlight underlayColor="#F5F5F5" onPress={() => this.selectApp(app)}>
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
      </View>
    );
  },

  selectApp(app) {
    console.log(generateAppURL(app));
    AppReloader.reloadAppWithURLString(generateAppURL(app), app.module_name);
  },

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS color={'#712FA9'} style={styles.spinner} size="large" />
      </View>
    );
  },

  renderNoResults() {
    return(
      <NoResults />
    );
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
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
  listView: {
    marginTop: -9,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  appContainer: {
    marginTop: -18,
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 8,
    paddingTop: 15,
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
  avatar: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: "#000"
  },
  cancelButton: {
    color: '#fff',
    flex: 1,
    fontSize: 25,
    marginLeft: 20
  },
  appTitle: {
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: '#712FA9',
    width: deviceWidth - 70,
    flex: 1,
  },
  spinner: {
    flex: 1,
  },
});

module.exports = AppList;
