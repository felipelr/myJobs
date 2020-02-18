import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Animated, Dimensions } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'
import useGet from '../../services/restServices'

import {
    ViewContainer,
    ScrollViewContainer,
} from './styles'

import { lightgray, purple, white, black } from '../common/util/colors'

import HeaderJobs from '../../components/HeaderJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

function SuggestService(props) {
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [newRequest, setNewRequest] = useState(false)

    useEffect(() => {
        props.ownProps.changeVisiblityPerfilHeader(true)

        return () => {

        }
    }, [])

    const handleClickBack = () => {
        props.ownProps.changeVisiblityPerfilHeader(true)
        setShowForm(false)
        outAnimation()
    }

    const handleConfirmPress = () => {

    }

    const inAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
            delay: 0
        }).start()
    }

    const outAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: Dimensions.get('screen').width, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()
    }

    return (
        <React.Fragment>
            {showForm &&
                <HeaderJobs
                    title='Sugerir Serviços'
                    back={handleClickBack}
                    confirm={handleConfirmPress}
                />}
            <ViewContainer>
                <ScrollViewContainer>
                    <View style={{ flex: 1 }}>
                        {!showForm &&
                            <Animated.View style={slideRight.getLayout()}>
                                
                            </Animated.View>
                        }
                        {showForm &&
                            <Animated.View style={slideLeft.getLayout()}>

                            </Animated.View>
                        }
                    </View>
                </ScrollViewContainer>
            </ViewContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        professionalData: state.professional.professional,
        loading: state.professional.loading,
        error: state.professional.error,
        errorMessage: state.professional.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalConfigCategory: (token, config) => dispatch(ActionCreators.professionalConfigCategory(token, config)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestService)