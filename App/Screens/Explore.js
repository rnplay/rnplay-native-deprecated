'use strict';

var React = require('react-native');

var {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  TouchableOpacity,
} = React;

var AppList = require("../Components/AppList");
var Search = require('../Screens/Search');

var Explore = React.createClass({
  getInitialState() {
    return {
      values: ['Picks', 'Search'],
      value: 'Picks',
      selectedIndex: 0
    }
  },

  renderSearch() {
    return(<Search />);
  },

  renderFavorites() {
    return(<Text>Favorites</Text>);
  },

  renderPicks() {
    return(
      <AppList url="/plays/picks.json" />
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

  render(){
    StatusBarIOS.setStyle(StatusBarIOS.Style.darkContent);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <View style={styles.segmentContainer}>
            <SegmentedControlIOS
              tintColor={'#712FA9'}
              values={this.state.values}
              selectedIndex={this.state.selectedIndex}
              onValueChange={this._onValueChange} />
          </View>
        </View>
        {this.state.value == 'Picks' && this.renderPicks()}
        {this.state.value == 'Search' && this.renderSearch()}
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  segmentContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 4,
  },
});

module.exports = Explore;
