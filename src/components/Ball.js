import React, { Component } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

class Ball extends Component {
    componentWillMount() {
        // step 1: set the begining position
        this.position = new Animated.ValueXY(0, 0);
        // step 2: define how does it move
        Animated.spring(this.position, {
            toValue: { x: 200, y: 500 }
        }).start();
    }

    render() {
        // step 3: connect animated to element
        return (
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball} />
            </Animated.View>
        );
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
