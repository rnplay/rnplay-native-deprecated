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
  ScrollView,
} = React;

var AppReloader = require('NativeModules').AppReloader;
var Api = require("../Api/Core");
var NoResults = require('../Components/NoResults');

var AppList = React.createClass({
  getInitialState() {
    return {
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
    Api.get(this.props.url)
      .then((data) => {
        if (data.error) {
          // TODO: check for 401 Unauthorized
          if (Navigator.getContext(this)) {
            Navigator.getContext(this).replace({id: "login", error: data.error});
          }
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true
        });
      })
      .done();
  },

  renderAppList() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderApp}
          style={styles.listView}
        />
      </View>
    );
  },

  renderCreator(app) {
    return app.creator ?
    <View style={styles.creator}>
      <Image style={styles.avatar} resizeMode="contain" source={{uri: 'https://rnplay.org'+app.creator.avatar_url }} />
      <Text style={styles.username}>{app.creator.username || 'anonymous'}</Text>
    </View> : null
  },

  renderApp(app) {
    return (
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
    );
  },

  selectApp(app) {
    AppReloader.reloadAppWithURLString(app.bundle_url, app.module_name);
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -10,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    paddingBottom: 44,
  },
  appContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
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
    alignItems: 'center'
  },
  username: {
    fontSize: 12,
    opacity: .5
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
  header: {
    textAlign: "center",
    fontSize: 25,
    paddingBottom: 20,
    color: '#888'
  },
  appTitle: {
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: '#712FA9',
    width: 280,
    flex: 1,
  },
  spinner: {
    flex: 1,
  },
  cameraButton: {
    height: 60,
    width: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
});

module.exports = AppList;
