import React, { useState, useEffect } from 'react'
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import ActionCreators from '../../store/actionCreators'

import { white, purple, gray, gold } from '../common/util/colors'

import {
    ContainerFooter,
    FooterButton,
    ItemRounded
} from './styles'

function Footer({ type, selected, ...props }) {
    const [badgeChat, setBadgeChat] = useState(0)
    const [badgeCall, setBadgeCall] = useState(0)

    useEffect(() => {
        loadChatBadges()
        loadCallBadges()
    }, [])

    useEffect(() => {
        if (props.updateChatBadge) {
            props.chatSetUpdateChatBadge(false)
            loadChatBadges()
        }
    }, [props.updateChatBadge])

    useEffect(() => {
        if (props.updateCallBadge) {
            props.clientSetUpdateCallBadge(false)
            loadCallBadges()
        }
    }, [props.updateCallBadge])

    const itemSelected = selected ? selected : 'home'
    const typeFooter = type ? type : 'client'

    const loadChatBadges = async () => {
        let badge = 0;
        try {
            const storageName = `@badgeChat`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadge = JSON.parse(strBadge)
            if (arrayBadge != null) {
                if (props.professionalData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.professional_id == props.professionalData.id && itemBadge.badge > 0)
                    if (arrayFiltered) {
                        badge = arrayFiltered.length
                    }
                }
                else if (props.clientData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.client_id == props.clientData.id && itemBadge.badge > 0)
                    if (arrayFiltered) {
                        badge = arrayFiltered.length
                    }
                }
            }
        } catch (ex) {
            console.log('loadChatBadges => ', ex)
        }
        setBadgeChat(badge)
    }

    const loadCallBadges = async () => {
        let badge = 0;
        try {
            const storageName = `@badgeCall`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadge = JSON.parse(strBadge)
            if (arrayBadge != null) {
                if (props.professionalData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.professional_id == props.professionalData.id && itemBadge.badge > 0)
                    if (arrayFiltered) {
                        badge = arrayFiltered.length
                    }
                }
                else if (props.clientData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.client_id == props.clientData.id && itemBadge.badge > 0)
                    if (arrayFiltered) {
                        badge = arrayFiltered.length
                    }
                }
            }
        } catch (ex) {
            console.log('loadCallBadges => ', ex)
        }
        setBadgeCall(badge)
    }

    if (typeFooter === 'client') {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.callsOnPress}>
                    <React.Fragment>
                        <Icon name="playlist-add-check" size={25} color={itemSelected === 'calls' ? gold : white} />
                        {badgeCall > 0 && <Badge value={badgeCall} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                    </React.Fragment>
                </FooterButton>
                <FooterButton onPress={props.favoriteOnPress}>
                    <ItemRounded backColor={itemSelected === 'favorite' ? gold : white}>
                        <Icon name="favorite" style={{ alignSelf: 'center' }} size={15} color={purple} />
                    </ItemRounded>
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <React.Fragment>
                        <Icon name="chat" size={25} color={itemSelected === 'chat' ? gold : white} />
                        {badgeChat > 0 && <Badge value={badgeChat} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                    </React.Fragment>
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? gold : white} />
                </FooterButton>
            </ContainerFooter>
        )
    }
    else {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.callsOnPress}>
                    <React.Fragment>
                        <Icon name="playlist-add-check" size={25} color={itemSelected === 'calls' ? gold : white} />
                        {badgeCall > 0 && <Badge value={badgeCall} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                    </React.Fragment>
                </FooterButton>
                <FooterButton onPress={props.professionalProfileOnPress}>
                    <Icon name="control-point" size={25} color={(itemSelected === 'professional-profile' && !props.professionalSelected.id) ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <React.Fragment>
                        <Icon name="chat" size={25} color={itemSelected === 'chat' ? gold : white} />
                        {badgeChat > 0 && <Badge value={badgeChat} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                    </React.Fragment>
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? gold : white} />
                </FooterButton>
            </ContainerFooter>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        clientData: state.client.client,
        professionalData: state.professional.professional,
        updateChatBadge: state.chat.updateChatBadge,
        updateCallBadge: state.client.updateCallBadge,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chatSetUpdateChatBadge: (updateChatBadge) => dispatch(ActionCreators.chatSetUpdateChatBadge(updateChatBadge)),
        clientSetUpdateCallBadge: (updateChatBadge) => dispatch(ActionCreators.clientSetUpdateCallBadge(updateChatBadge)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)