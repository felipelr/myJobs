import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { lightgray } from '../common/util/colors'

import {
    ViewContainer,
} from './styles'

function ProgressBarMyJobs({ percentage, color, height }, ...props) {
    const [width] = useState(new Animated.Value(0))
    const [w, setW] = useState('0%')

    useEffect(() => {
        Animated.timing(width, {
            toValue: percentage,
            duration: 500
        }).start()

        setW(width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        }))
    }, [percentage])

    return (
        <Animated.View style={{
            width: w,
            backgroundColor: color ? color : lightgray,
            height: height ? height : 5,
            borderRadius: 5
        }} />
    )
}

export default ProgressBarMyJobs