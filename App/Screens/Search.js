'use strict';

var React = require('react-native');
var AppList = require("../Components/AppList");
var NoResults = require('../Components/NoResults');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
} = React;

var Explore = React.createClass({
  getInitialState() {
    return {
      searchText: '',
      showAppList: false
    }
  },

  _handleSearch() {
    this.setState({
      showAppList: false,
      searchUrl: `/apps/search.json?name=${this.state.searchText}`
    });

    if (this.state.searchText !== '') {
      this.setState({ showAppList: true });
    }
  },

  renderList() {
    return(
      <AppList url={this.state.searchUrl} />
    );
  },

  renderNoResults() {
    return(
      <NoResults />
    );
  },

  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchRow}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="always"
              returnKeyType={'search'}
              placeholder="SEARCH..."
              style={styles.input}
              onChangeText={(text) => this.setState({searchText: text})}
              onSubmitEditing={this._handleSearch}
            />
          </View>
        </View>
        {this.state.showAppList ? this.renderList() : this.renderNoResults()}
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchRow: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    marginBottom: 9,
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 14,
    color: 'black',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    marginTop: 0,
  },
});

module.exports = Explore;
