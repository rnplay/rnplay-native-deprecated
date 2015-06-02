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
var About = require('../Screens/About');
var Search = require('../Screens/Search');

var Icon = require('FAKIconImage');

var Modal = require('react-native-modal');
var DeviceHeight = require('Dimensions').get('window').height;

var Explore = React.createClass({
  mixins: [Modal.Mixin],

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

  showModalTransition(transition) {
    transition('opacity', {duration: 200, begin: 0, end: 1});
    transition('height', {duration: 200, begin: DeviceHeight * 2, end: DeviceHeight});
  },

  hideModalTransition(transition) {
    transition('height', {duration: 200, begin: DeviceHeight, end: DeviceHeight * 2, reset: true});
    transition('opacity', {duration: 200, begin: 1, end: 0});
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
          <TouchableOpacity onPress={() => this.openModal()} style={styles.infoButton}>
            <Icon
              name='ion|ios-help'
              size={25}
              color='#712FA9'
              style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
        {this.state.value == 'Picks' && this.renderPicks()}
        {this.state.value == 'Search' && this.renderSearch()}
        <Modal
          backdropType="blur"
          backdropBlur="dark"
          isVisible={this.state.isModalOpen}
          forceToFront={true}
          customShowHandler={this.showModalTransition}
          customHideHandler={this.hideModalTransition}
          onPressBackdrop={() => this.closeModal()}>
          <About />
        </Modal>
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
    flex: 2,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 4,
  },
  infoButton: {
    flex: 1,
  },
  infoIcon: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    marginLeft: 10,
    marginRight: 17,
  },
});

module.exports = Explore;
