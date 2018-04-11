// @flow

import React, { Component, type Node } from 'react'
import { View, Animated, TouchableWithoutFeedback } from 'react-native'

type Props = {
  children?: Node,
  springConfig?: {},
  perspective: number
}

type State = {
  spring: Animated.value,
  tapPoint: Animated.Value,
  viewSize: Array<number>
}

class Wobblifier extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      spring: new Animated.Value(0),
      tapPoint: new Animated.ValueXY({
        x: 0,
        y: 0
      }),
      viewSize: [0, 0]
    }
  }

  onTap = event => {
    const { locationX: x, locationY: y } = event.nativeEvent
    this.state.tapPoint.setValue({ x, y })
    this.spring(0)
  }

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout
    this.setState({ viewSize: [width, height] })
  }

  getTransform = () => {
    const { tapPoint, spring, viewSize } = this.state
    const tapX = tapPoint.x.interpolate({
      inputRange: [0, viewSize[0]],
      outputRange: [-1, 1]
    })
    const tapY = tapPoint.y.interpolate({
      inputRange: [0, viewSize[1]],
      outputRange: [1, -1]
    })
    const rotateX = Animated.multiply(spring, tapY).interpolate({
      inputRange: [-0.75, 0, 0.75],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp'
    })
    const rotateY = Animated.multiply(spring, tapX).interpolate({
      inputRange: [-0.75, 0, 0.75],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp'
    })
    const scale = Animated.multiply(
      spring,
      Animated.add(tapX, tapY).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [0, 1, 0]
      })
    ).interpolate({
      inputRange: [0, 5],
      outputRange: [1, 0]
    })
    return [
      { perspective: this.props.perspective },
      { rotateX },
      { rotateY },
      { scale }
    ]
  }

  spring = async toValue =>
    new Promise(resolve =>
      Animated.spring(this.state.spring, {
        tension: 30,
        friction: 2,
        velocity: 20,
        ...this.props.springConfig,
        toValue,
        useNativeDriver: true
      }).start(resolve)
    )

  render = () => (
    <TouchableWithoutFeedback onPress={this.onTap}>
      <View onLayout={this.onLayout}>
        <Animated.View
          onLayout={this.onLayout}
          style={{
            transform: this.getTransform()
          }}
        >
          {this.props.children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

Wobblifier.defaultProps = {
  children: null,
  springConfig: {},
  perspective: 200
}

export default Wobblifier
