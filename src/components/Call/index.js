import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Overlay } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import {
    ViewContainer,
    ScrollViewContainer,
    TxtTitle,
    TxtDescription,
    ViewContainerButton,
    ViewContainerOverlay,
    ViewContainerButtonOverlay,
    TouchButtton,
    TxtButtton,
    TxtOverlay,
} from './styles'

import CardJobs from '../CardJobs'
import ButtonPurple from '../ButtonPurple'
import Loading from '../Loading'
import TextError from '../TextError'

import { white, purple, black } from '../common/util/colors'

function Call(props) {
    const [call] = useState(props.ownProps.call)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [requisitou, setRequisitou] = useState(false)

    const scrollViewRef = useRef()

    useEffect(() => {

        return () => {

        }
    }, [])

    useEffect(() => {
        if (requisitou && !props.professionalCtr.loading) {
            if (props.professionalCtr.error) {
                setRequisitou(false)
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                //finalizar com sucesso
                props.ownProps.onFinished(call)
            }
        }
    }, [props.professionalCtr.loading])

    const handleConfirmFinishCall = () => {
        setOverlayVisible(false)
        setRequisitou(true)
        props.professionalFinishCallRequest(props.token, call)
    }

    return (
        <ScrollViewContainer ref={(c) => scrollViewRef.current = c}>
            <ViewContainer>
                {props.professionalCtr.loading && <Loading size='large' color={purple} height='330' error={props.professionalCtr.error} />}

                {!props.professionalCtr.loading && (
                    <CardJobs backColor='white' width='90' height='250' paddingCard='20'>

                        {props.professionalCtr.error && <TextError>{props.professionalCtr.errorMessage}</TextError>}

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
                            <ButtonPurple onPress={() => setOverlayVisible(true)}>Finalizar Chamado</ButtonPurple>
                        </ViewContainerButton>
                    </CardJobs>
                )}

                <Overlay
                    height={200}
                    isVisible={overlayVisible}
                    onBackdropPress={() => setOverlayVisible(false)}
                >
                    <ViewContainerOverlay>
                        <TxtOverlay>Deseja confirma a finalização deste chamado?</TxtOverlay>
                        <ViewContainerButtonOverlay>
                            <TouchButtton backColor={purple} onPress={() => handleConfirmFinishCall()}>
                                <TxtButtton color={white}>SIM</TxtButtton>
                            </TouchButtton>
                            <TouchButtton backColor={white} onPress={() => setOverlayVisible(false)}>
                                <TxtButtton color={black}>NÃO</TxtButtton>
                            </TouchButtton>
                        </ViewContainerButtonOverlay>
                    </ViewContainerOverlay>
                </Overlay>
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
        professionalCtr: state.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalFinishCallRequest: (token, call) => dispatch(ActionCreators.professionalFinishCallRequest(token, call)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Call)