'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} = React;

var NavigationBar = React.createClass({

  getTitle() {
   return (<Text style={styles.navTitle}>{this.props.title}</Text>);
  },

  getLeftButton() {
    var {
      onPrev,
      prevTitle
    } = this.props;

    if(this.props.onPrev && this.props.prevTitle) {
      return (
        <TouchableOpacity onPress={onPrev}>
          <Text style={styles.navButton}>
            {prevTitle}
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableWithoutFeedback>
          <Text style={styles.navButton}></Text>
        </TouchableWithoutFeedback>
      );
    }
  },

  getRightButton() {
    var {
      onNext,
      nextTitle,
    } = this.props;

    if(this.props.onNext && this.props.nextTitle) {
      return (
        <TouchableOpacity onPress={onNext}>
          <Text style={styles.navButton}>
            {nextTitle}
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableWithoutFeedback>
          <Text style={styles.navButton}></Text>
        </TouchableWithoutFeedback>
      );
    }
  },

  render() {
    return (
      <View style={styles.navbarContainer}>
        {this.getLeftButton()}
        {this.getTitle()}
        {this.getRightButton()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#712FA9',
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1 / PixelRatio.get(),
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 9,
    paddingTop: 15,
  },
  navButton: {
    flex: 0.3,
    fontFamily: "Avenir Next",
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: 10,
    marginTop: 20,
    color: 'white',
    backgroundColor: "transparent"
  },
  navTitle: {
    flex: 0.7,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontWeight: '400'
  },
});

module.exports = NavigationBar;
