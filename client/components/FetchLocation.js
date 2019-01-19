import React, { Component } from 'react';
import { Button } from 'react-native';

const fetchLocation = props => {
    return (
        <Button title="Get current location" onPress={props.onGetLocation}/>
    );
};

export default fetchLocation;
