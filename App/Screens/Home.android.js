'use strict';

var React = require('react-native');
var Explore = require('./Explore');
var MyAppsContainer = require('./MyAppsContainer');
var CustomApp = require('./CustomApp');
var About = require('./About');
var QRCodeReader = require('./QRCodeReader');
var Icon = require('../Components/Icon');
var DrawerLayout = require('react-native-drawer-layout');
var NavigationBar = require('../Components/NavigationBar');
var Colors = require('../Utilities/Colors');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
} = React;

var dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

function getIconFor(item) {
  return React.createClass({
    render() {
      return (
        <Icon name={item} size={24} style={{marginLeft: 25}} color={Colors.grey} />
      );
    },
  });
}

var MenuData = [
  {
    id: 1,
    component: {
      title: 'Explore',
      component: Explore,
    },
    icon: getIconFor('search'),
  },
  {
    id: 2,
    component: {
      title: 'My Apps',
      component: MyAppsContainer,
    },
    icon: getIconFor('briefcase'),
  },
  {
    id: 4,
    component: {
      title: 'Scan Code',
      component: QRCodeReader,
    },
    icon: getIconFor('camera'),
  },
  {
    id: 5,
    component: {
      title: 'About',
      component: About,
    },
    icon: getIconFor('help'),
  },
];

var Home = React.createClass({
  getInitialState() {
    return {
      selectedScreen: {
        title: 'About',
        component: About,
      },
    };
  },

  componentDidMount() {
    this.props.fetchProfile();

    // To better debug the drawer...
    // this.drawer.openDrawer();
  },

  _renderSelectedScreen() {
    var Component = this.state.selectedScreen.component;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.selectedScreen.title}
          handleNavIconTap={() => this.drawer.openDrawer()} />
        <Component />
      </View>
    );
  },

  _handleScreenSelected(selectedScreen) {
    this.drawer.closeDrawer();
    this.setState({ selectedScreen });
  },

  _renderMenuRow(menuItem) {
    var ItemIcon = menuItem.icon;
    return (
      <View style={{height: 50}}>
        <TouchableOpacity style={{justifyContent: 'flex-start', flexDirection: 'row'}} onPress={() => this._handleScreenSelected(menuItem.component)}>
          <ItemIcon />
          <Text style={{marginLeft: 25}}>
            {menuItem.component.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  render() {
    var navigationView = (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.tintColor}}>
          <Text style={{color: 'white', margin: 20, fontSize: 18}}>React Native Playground</Text>
        </View>
        <ListView
          dataSource={dataSource.cloneWithRows(MenuData)}
          renderRow={this._renderMenuRow}
          style={{flex: 3, paddingTop: 25}}
        />
      </View>
    );

    return (
      <DrawerLayout
        ref={drawer => this.drawer = drawer}
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        {this._renderSelectedScreen()}
      </DrawerLayout>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

var {fetchProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

module.exports = connect(null,
  (dispatch) => {
    return bindActionCreators({fetchProfile}, dispatch);
  }
)(Home);
