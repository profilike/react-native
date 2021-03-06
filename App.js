import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

import { 
  addPlace,
  deletePlace,
  deselectPlace,
  selectPlace
} from './src/store/actions';

class App extends React.Component {

  placeAddedHanler = placeName => {
    this.props.onAddPlace(placeName);
    console.log('Place Added');
  };
  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }
  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }
  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  }
 
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHanler} />
        <PlaceList 
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
