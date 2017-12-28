import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class Ball extends Component {
    render() {
        return <View style={styles.ball} />
    };
};

const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: "green",
    }
})

export default Ball;
