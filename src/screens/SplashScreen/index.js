import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import ActionCreators from '../../store/actionCreators'

import { ViewContainer } from './styles'

function SplashScreen(props) {

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('@userData')
            if (userData) {
                const clientData = await AsyncStorage.getItem('@clientData')
                const professionalData = await AsyncStorage.getItem('@professionalData')

                let userType = professionalData ? 2 : 1

                const userJson = { ...JSON.parse(userData), userType }
                const clientJson = clientData ? JSON.parse(clientData) : null
                const professionalJson = professionalData ? JSON.parse(professionalData) : null

                if (clientJson !== null)
                    props.clientUpdateSuccess(clientJson)

                if (professionalJson !== null)
                    props.professionalUpdateSuccess(professionalJson)

                props.authSuccess(userJson)

                props.ownProps.navigation.navigate('CategoriesSearch')
            } else {
                props.ownProps.navigation.navigate('Login')
            }
        } catch (e) {
            props.ownProps.navigation.navigate('Login')
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

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
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientUpdateSuccess: (dados) => dispatch(ActionCreators.clientUpdateSuccess(dados)),
        professionalUpdateSuccess: (dados) => dispatch(ActionCreators.professionalUpdateSuccess(dados)),
        authSuccess: (dados) => dispatch(ActionCreators.authSuccess(dados)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)