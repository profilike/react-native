import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  state = {
    placeName: ''
  };

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.placeName}
            placeholder="An awesome place"
            onChangeText={this.placeNameChangeHandler}
            style={styles.placeInput}
          />
          <Button
            title="Add"
            style={styles.placeButton}
          />
        </View>  
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
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});
