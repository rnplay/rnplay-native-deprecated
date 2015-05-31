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
  Navigator
} = React;

var AppReloader = require('NativeModules').AppReloader;
var Api = require("../Api/Core");

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

  fetchApps() {
    Api.get(this.props.url)
      .then((data) => {
        if (data.error) {
          // TODO: check for 401 Unauthorized
          this.props.navigator.replace({id: "login", error: data.error});
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
      <Image style={styles.avatar} source={{uri: app.creator.avatar_url || 'https://facebook.github.io/react-native/img/header_logo.png'}} />
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
      <View style={styles.container}>
        <ActivityIndicatorIOS color={'#712FA9'} style={styles.spinner} size="large" />
      </View>
    );
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    } else {
      return this.renderAppList();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    marginBottom: 20
  },
  creator: {
    flexDirection: 'row',
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
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 10,
    opacity: .5,
    marginTop: 3,
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
