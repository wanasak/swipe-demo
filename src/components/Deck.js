import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);

        this.state = { index: 0 };

        this.position = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evet, gesture) => {
                this.position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe("right");
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe("left");
                } else {
                    this.resetPosition();
                }
            }
        });
    }

    resetPosition() {
        // reset position
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    forceSwipe(direction) {
        const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete(direction);
        });
    }

    onSwipeComplete(direction) {
        const { data, onSwipeLeft, onSwipeRight } = this.props;
        const item = data[this.state.index];

        direction === "right" ? onSwipeRight() : onSwipeLeft();
        
        this.position.setValue({ x: 0,  y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    getCardStyle() {
        // interpolation
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ["-120deg", "0deg", "120deg"]
        });

        return {
            ...this.position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCard() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((item, i) => {
            // return nul for swiped card
            if (i < this.state.index) { return null; }

            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.card]}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View key={item.id} style={styles.card}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }

    render() {
        return <View>{this.renderCard()}</View>;
    }
}

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: SCREEN_WIDTH
    }
});

export default Deck;
