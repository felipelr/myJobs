import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUserData } from '../../services/authServices'
import ActionCreators from '../../store/actionCreators'

import { ViewContainer } from './styles'

function SplashScreen(props) {

    useEffect(() => {
        getUserData()
            .then(([result, user, client, professional]) => {
                if (result === "success") {
                    if (client !== null)
                        props.clientUpdateSuccess(client)

                    if (professional !== null)
                        props.professionalUpdateSuccess(professional)

                    props.authSuccess(user)

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