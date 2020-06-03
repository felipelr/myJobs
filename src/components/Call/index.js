import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Overlay, Avatar, AirbnbRating, Rating } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'

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
    ViewContainerCenter,
    ViewGray,
    TxtRatingName,
} from './styles'

import CardJobs from '../CardJobs'
import ButtonPurple from '../ButtonPurple'
import Loading from '../Loading'
import TextError from '../TextError'
import TextInputJobs from '../TextInputJobs'

import { white, purple, black, lightgray } from '../common/util/colors'

function Call(props) {
    const [call] = useState(props.ownProps.call)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [overlayRatingVisible, setOverlayRatingVisible] = useState(false)
    const [requisitou, setRequisitou] = useState(false)
    const [rate, setRate] = useState(5)
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState({})
    const [ratingNames] = useState(["Péssimo", "Ruim", "Regular", "Bom", "Muito Bom"])

    const scrollViewRef = useRef()

    useEffect(() => {
        cleanBadge()

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

    useEffect(() => {
        if (requisitou && !props.clientCtr.isUpdating) {
            if (props.clientCtr.errorUpdating) {
                setRequisitou(false)
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                //finalizar com sucesso
                const edtCall = { ...call, rating: rating }
                setOverlayRatingVisible(false)
                props.ownProps.onFinished(edtCall)
            }
        }
    }, [props.clientCtr.isUpdating])

    const handleConfirmFinishCall = () => {
        setOverlayVisible(false)
        setRequisitou(true)
        props.professionalFinishCallRequest(props.token, call)
    }

    const handleRateCall = () => {
        const form = {
            rate: rate,
            description: description,
            professional_id: call.professional.id,
            client_id: props.clientData.id,
            call_id: call.id,
        }
        setRating(form)
        setRequisitou(true)
        props.clientCallRateRequest(props.token, form)
    }

    const cleanBadge = async () => {
        try {
            const itemToClean = {
                client_id: call.client_id,
                professional_id: call.professional_id
            }
            const storageName = `@badgeCall`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadgeChat = JSON.parse(strBadge)
            if (arrayBadgeChat != null) {
                const array = arrayBadgeChat.filter((item) => item.client_id != itemToClean.client_id && item.professional_id != itemToClean.professional_id)
                const array2 = arrayBadgeChat.filter((item) => item.client_id == itemToClean.client_id && item.professional_id == itemToClean.professional_id)
                if (array2.length > 0) {
                    const item = {
                        client_id: itemToClean.client_id,
                        professional_id: itemToClean.professional_id,
                        badge: 0
                    }
                    array.push(item)
                    props.clientSetUpdateCallBadge(true)
                }
                else {
                    const item = {
                        client_id: itemToClean.client_id,
                        professional_id: itemToClean.professional_id,
                        badge: 0
                    }
                    array.push(item)
                }
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
        } catch (e) {
            console.log('cleanBadge => ', e)
        }
    }

    return (
        <ViewGray>
            <ScrollViewContainer ref={(c) => scrollViewRef.current = c} keyboardShouldPersistTaps='always'>
                <ViewContainer>
                    {props.professionalCtr.loading && <Loading size='large' color={purple} height='330' error={props.professionalCtr.error} />}

                    {!props.professionalCtr.loading && (
                        <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                            {props.professionalCtr.error && <TextError>{props.professionalCtr.errorMessage}</TextError>}

                            {call.client &&
                                <React.Fragment>
                                    <TxtTitle>Cliente</TxtTitle>
                                    <TxtDescription>{call.client.name}</TxtDescription>
                                    <TxtDescription>{call.client.phone}</TxtDescription>
                                </React.Fragment>
                            }
                            {call.professional &&
                                <React.Fragment>
                                    <TxtTitle>Professional</TxtTitle>
                                    <TxtDescription>{call.professional.name}</TxtDescription>
                                    <TxtDescription>{call.professional.description}</TxtDescription>
                                </React.Fragment>
                            }
                            <TxtTitle>Categoria</TxtTitle>
                            <TxtDescription>{call.service.subcategory.category.description}</TxtDescription>
                            <TxtTitle>Subcategoria</TxtTitle>
                            <TxtDescription>{call.service.subcategory.description}</TxtDescription>
                            <TxtTitle>Serviço</TxtTitle>
                            <TxtDescription>{call.service.title}</TxtDescription>
                            <TxtTitle>Detalhes</TxtTitle>
                            <TxtDescription>{call.description}</TxtDescription>
                            {(call.client && call.status === 1) &&
                                <ViewContainerButton>
                                    <ButtonPurple onPress={() => setOverlayVisible(true)}>Finalizar Chamado</ButtonPurple>
                                </ViewContainerButton>
                            }
                            {(call.professional && call.status === 2 && !call.rating) &&
                                <ViewContainerButton>
                                    <ButtonPurple onPress={() => setOverlayRatingVisible(true)}>Avaliar Chamado</ButtonPurple>
                                </ViewContainerButton>
                            }
                            {(call.professional && call.status === 2 && call.rating) &&
                                <React.Fragment>
                                    <TxtRatingName>{ratingNames[call.rating.rate - 1]}</TxtRatingName>
                                    <Rating
                                        startingValue={call.rating.rate}
                                        imageSize={40}
                                        readonly={true}
                                    />
                                </React.Fragment>
                            }
                        </CardJobs>
                    )}

                    <Overlay
                        overlayStyle={{ height: 'auto' }}
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

                    <Overlay
                        overlayStyle={{ height: 'auto' }}
                        isVisible={overlayRatingVisible}
                        onBackdropPress={() => setOverlayRatingVisible(false)}
                    >
                        <React.Fragment>
                            {props.clientCtr.isUpdating && <Loading elevation={0} size='large' color={purple} height='350' error={props.clientCtr.errorUpdating} />}

                            {!props.clientCtr.isUpdating && (
                                <ViewContainerOverlay>
                                    <ViewContainerCenter>
                                        {props.clientCtr.errorUpdating && <TextError>{props.clientCtr.errorMessage}</TextError>}

                                        {call.professional &&
                                            <React.Fragment>
                                                <Avatar
                                                    rounded
                                                    size={100}
                                                    source={{ uri: call.professional.photo }} />
                                                <TxtTitle>{call.professional.name}</TxtTitle>
                                            </React.Fragment>
                                        }

                                        <AirbnbRating
                                            showRating={true}
                                            count={5}
                                            reviews={ratingNames}
                                            defaultRating={5}
                                            size={40}
                                            onFinishRating={(value) => setRate(value)}
                                        />

                                        <TextInputJobs
                                            style={{ paddingTop: 30, width: '85%' }}
                                            value={description}
                                            name='description'
                                            onChangeText={(name, text) => setDescription(text)}
                                            placeholder='Comentário' />
                                    </ViewContainerCenter>
                                    <ViewContainerButtonOverlay>
                                        <TouchButtton backColor={purple} onPress={() => handleRateCall()}>
                                            <TxtButtton color={white}>AVALIAR</TxtButtton>
                                        </TouchButtton>
                                    </ViewContainerButtonOverlay>
                                </ViewContainerOverlay>
                            )}
                        </React.Fragment>
                    </Overlay>
                </ViewContainer>
            </ScrollViewContainer>
        </ViewGray>

    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        professionalData: state.professional.professional,
        professionalCtr: state.professional,
        clientData: state.client.client,
        clientCtr: state.client,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalFinishCallRequest: (token, call) => dispatch(ActionCreators.professionalFinishCallRequest(token, call)),
        clientCallRateRequest: (token, rate) => dispatch(ActionCreators.clientCallRateRequest(token, rate)),
        clientSetUpdateCallBadge: (updateChatBadge) => dispatch(ActionCreators.clientSetUpdateCallBadge(updateChatBadge)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Call)