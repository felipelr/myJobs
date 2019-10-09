import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import ActionCreators from '../../store/actionCreators'

import { ViewContainer } from './styles'

function SplashScreen(props) {

    getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('@userData')
            if (userData) {
                let userType = 1
                const clientData = await AsyncStorage.getItem('@clientData')
                const professionalData = await AsyncStorage.getItem('@professionalData')

                if (clientData) {
                    props.clientUpdateSuccess(JSON.parse(clientData))
                }

                if (professionalData) {
                    props.professionalUpdateSuccess(JSON.parse(professionalData))
                    userType = 2
                }

                const dados = { ...JSON.parse(userData), userType }

                props.authSuccess(dados)

                return "sucesso"
            }
            return null;
        } catch (e) {
            return null
        }
    }

    useEffect(() => {
        getUserData()
            .then((dados) => {
                if (dados === "sucesso") {
                    props.ownProps.navigation.navigate('ProfessionalSearch')
                } else {
                    props.ownProps.navigation.navigate('Login')
                }
            })
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