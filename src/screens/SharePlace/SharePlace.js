import React, { Component } from 'react';
import { 
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/ui/MainText';
import HeadingText from '../../components/ui/HeadingText';
import { addPlace, startAddPlace } from '../../store/actions/index';
  
class SharePlace extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    })
  }

  componentDidUpdate() {
    if(this.props.placeAdded) {
      this.props.navigator.switchToTab({tabIndex: 0});
    }
  }

  onNavigatorEvent = event => {

    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onStartAddPlace();
      }
    }

    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  placeNameChangedHandler = value => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value,
            valid: validate(value, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  }
  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }

  render() {
    let submitButton = (
      <Button 
        title="Share the Place!" 
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />);
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage 
            onImagePicked={this.imagePickedHandler} 
            ref={ref => (this.imagePicker = ref)} 
          />
          <PickLocation 
            onLocationPicked={this.locationPickedHandler}
            ref={ref => (this.locationPicker = ref)}
          />
          <PlaceInput 
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          /> 
          <View style={styles.button}>
            { submitButton }
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SharePlace)
