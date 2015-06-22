'use strict';

var React = require('react-native');

var {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  ScrollView,
  TouchableOpacity,
} = React;

var AppList = require("../Components/AppList");
var Search = require('../Screens/Search');

var Explore = React.createClass({
  getInitialState() {
    return {
      values: ['Picks', 'Popular', 'Search'],
      value: 'Picks',
      selectedIndex: 0
    }
  },

  renderSearch() {
    return <Search />;
  },

  renderPopular() {
    return (
      <View style={styles.contentContainer}>
        <AppList url="/apps/popular.json" />
      </View>
    )
  },

  renderPicks() {
    return (
      <View style={styles.contentContainer}>
        <AppList url="/apps/picks.json" />
      </View>
    );
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedIndex,
    });
  },

  _onValueChange(value) {
    this.setState({
      value: value,
    });
  },


  render() {
    StatusBarIOS.setStyle(StatusBarIOS.setStyle("default"));

    return (
      <View style={styles.mainContainer}>
        {this.state.value == 'Picks' && this.renderPicks()}
        {this.state.value == 'Popular' && this.renderPopular()}
        {this.state.value == 'Search' && this.renderSearch()}

        <View style={styles.topContainer}>
          <View style={styles.segmentContainer}>
            <SegmentedControlIOS
              tintColor={'#712FA9'}
              values={this.state.values}
              style={styles.exploreViewPicker}
              selectedIndex={this.state.selectedIndex}
              onValueChange={this._onValueChange} />
          </View>
        </View>
      </View>
    )
  }
});


var deviceWidth = require('Dimensions').get('window').width;

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 15,
  },
  mainContainer: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
  },
  segmentContainer: {
    flex: 1,
    marginRight: 30,
    marginLeft: 30,
  },
  exploreViewPicker: {
    transform: [{scaleX: 1.1}, {scaleY: 1.1}],
  },
});

module.exports = Explore;
