/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableOpacity
} = React;

var Bridge = require('NativeModules').AppDelegate;
var Camera = require('react-native-camera');

var RNPlayNative = React.createClass({
  
  getInitialState: function() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.fetchApps();
  },

  fetchApps: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true
        });
      })
      .done();
  },

  renderAppList: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>React Native Playground</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderApp}
          style={styles.listView}
        />
      </View>
    );
  },

  renderApp: function(app) {
    return (
      <TouchableOpacity onPress={() => this.selectApp(app)}>
        <Text style={styles.app}>{app.name}</Text>
      </TouchableOpacity>
    );
  },

  selectApp: function(app) {
    Bridge.loadAppFromBundleURL(app.app_bundle.url, app.module_name);
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS size="large" />
      </View>
    );
  },

  onBarCodeRead(data) {
    if (!this.barCodeRead) {
      this.barCodeRead = true
      var appdata = JSON.parse(data.data)
      Bridge.loadAppFromBundleURL(appdata.url, appdata.module_name);
    }
  },

  render: function() {
    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this.onBarCodeRead}
     />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
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
    color: '#2B608A'
  }
});

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative);