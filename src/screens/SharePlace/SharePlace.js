import React, { Component } from 'react';
import { 
  View,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/ui/MainText';
import HeadingText from '../../components/ui/HeadingText';
import { addPlace } from '../../store/actions/index';
  
class SharePlace extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      placeName: ""
    }
  }

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  placeNameChangedHandler = value => {
    this.setState({
      placeName: value
    })
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput 
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          /> 
          <View style={styles.button}>
            <Button title="Share the Place!" onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName))
  }
}
export default connect(null, mapDispatchToProps)(SharePlace)
