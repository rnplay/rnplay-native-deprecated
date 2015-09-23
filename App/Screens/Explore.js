'use strict';

var React = require('react-native');

var {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} = React;

var AppList = require("../Components/AppList");
var Search = require('../Screens/Search');
var Colors = require('../Utilities/Colors');
var StatusBar = require('../Components/StatusBar');

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

  _renderSegmentedControl() {
    if (Platform.OS === 'ios') {
      return (
        <SegmentedControlIOS
          tintColor={Colors.tintColor}
          values={this.state.values}
          style={styles.exploreViewPicker}
          selectedIndex={this.state.selectedIndex}
          onValueChange={this._onValueChange} />
      );
    } else {
      return(
        <View style={styles.segmentedControl}>
          {this.state.values.map(item => {
            return (
              <TouchableOpacity
                key={item}
                onPress={() => this._onValueChange(item)}
                style={styles.segmentedItem}>
                <Text style={[
                  styles.segmentedItemText,
                  this.state.value === item ? styles.segmentedItemSelected : null
                ]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  },

  render() {
    StatusBar.setStyle('default');

    return (
      <View style={styles.mainContainer}>
        {this.state.value == 'Picks' && this.renderPicks()}
        {this.state.value == 'Popular' && this.renderPopular()}
        {this.state.value == 'Search' && this.renderSearch()}
        <View style={styles.topContainer}>
          <View style={styles.segmentContainer}>
            {this._renderSegmentedControl()}
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
  },
  mainContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : null,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
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
  segmentedControl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  segmentedItem: {
    flex: 1,
    alignItems: 'center',
  },
  segmentedItemText: {
    flex: 1,
    fontSize: 16,
  },
  segmentedItemSelected: {
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  exploreViewPicker: {
    transform: [{scaleX: 1.1}, {scaleY: 1.1}],
  },
});

module.exports = Explore;
