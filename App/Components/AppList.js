'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Navigator,
  PixelRatio
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
      <View style={styles.appContainer}>
        <TouchableOpacity onPress={() => this.selectApp(app)}>
          <Text style={styles.app}>{app.name || app.module_name}</Text>
        </TouchableOpacity>
        { this.renderCreator(app) }
      </View>
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
  },
  loadingContainer: {
    flex: 1,
    paddingBottom: 44,
  },
  appContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#eee"
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
  cameraButton: {
    height: 60,
    width: 20,
    alignSelf: 'center',
    marginLeft: 5
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
  app: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#712FA9'
  },
  spinner: {
    flex: 1,
  },
});

module.exports = AppList;
