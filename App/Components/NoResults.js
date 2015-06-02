'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

var NoResults = React.createClass({
  render() {
    return(
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No Results</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 44,
  },
  noResultsText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ccc',
  },
});

module.exports = NoResults;
