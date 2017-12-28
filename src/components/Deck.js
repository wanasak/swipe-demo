import React, { Component } from "react";
import { View, Animated, PanResponder } from "react-native";

class Deck extends Component {
    constructor(props) {
        super(props);

        this.position = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evet, gesture) => {
                this.position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: () => {}
        });
    }

    getCardStyle() {
        return {
            ...this.position.getLayout(),
            transform: [{ rotate: '-45deg' }]
        };
    }

    renderCard() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCard()}
            </View>
        );
    }
}

export default Deck;
