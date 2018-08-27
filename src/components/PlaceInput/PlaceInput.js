import React, { Component } from 'react';
import DefaultInput from '../ui/DefaultInput';

const placeInput = props => {

  return (
    <DefaultInput 
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onChangeText}
    />
  );
}


export default placeInput;