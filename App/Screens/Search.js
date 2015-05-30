'use strict';

var React = require('react-native');

var {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View
} = React;

var Explore = React.createClass({
  getInitialState() {
    return {
      values: ['Picks', 'Favorites', 'Search'],
      value: 'Picks',
      selectedIndex: 0
    }
  },

  renderSearch() {
    return(<Text>Search</Text>);
  },

  renderFavorites() {
    return(<Text>Favorites</Text>);
  },

  renderPicks() {
    return(<Text>Picks</Text>);
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
    return (
      <View style={styles.mainContainer}>
        <NavigationBar title={'Explore'} />
        <View style={styles.segmentContainer}>
          <SegmentedControlIOS
          tintColor={'#712FA9'}
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onValueChange={this._onValueChange} />
        </View>
        {this.state.value == 'Picks' && this.renderPicks()}
        {this.state.value == 'Search' && this.renderSearch()}
        {this.state.value == 'Favorites' && this.renderFavorites()}
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  segmentContainer: {
    margin: 20,
  },
});

module.exports = Explore;
