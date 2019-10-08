import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { ViewContainer } from './styles'

function SplashScreen(props) {

    useEffect(() => {
        props.authRequest()
    }, [])

    useEffect(() => {
        if (props.auth.authMessage === 'success') {
            props.ownProps.navigation.navigate('ProfessionalSearch')
        }
        else {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.auth.authMessage])

    return (
        <ViewContainer>
        </ViewContainer>
    )
}

SplashScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authRequest: () => dispatch(ActionCreators.authRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)