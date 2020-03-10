import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import ActionCreators from '../../store/actionCreators'

import {
    ViewContainer,
    ScrollViewContainer,
    TxtTitle,
    TxtDescription,
    ViewContainerButton,
} from './styles'

import CardJobs from '../CardJobs'
import ButtonPurple from '../ButtonPurple'

function Call(props) {
    const [call] = useState(props.ownProps.call)

    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <ScrollViewContainer>
            <ViewContainer>
                <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                    <TxtTitle>Cliente</TxtTitle>
                    <TxtDescription>{call.client.name}</TxtDescription>
                    <TxtDescription>{call.client.phone}</TxtDescription>
                    <TxtTitle>Categoria</TxtTitle>
                    <TxtDescription>{call.service.subcategory.category.description}</TxtDescription>
                    <TxtTitle>Subcategoria</TxtTitle>
                    <TxtDescription>{call.service.subcategory.description}</TxtDescription>
                    <TxtTitle>Serviço</TxtTitle>
                    <TxtDescription>{call.service.title}</TxtDescription>
                    <TxtTitle>Detalhes</TxtTitle>
                    <TxtDescription>{call.description}</TxtDescription>
                    <ViewContainerButton>
                        <ButtonPurple onPress={() => { }}>Finalizar Chamado</ButtonPurple>
                    </ViewContainerButton>
                </CardJobs>
            </ViewContainer>
        </ScrollViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        professionalData: state.professional.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalConfigCategory: (token, config) => dispatch(ActionCreators.professionalConfigCategory(token, config)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Call)