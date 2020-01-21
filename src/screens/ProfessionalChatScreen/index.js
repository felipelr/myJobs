import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler, Keyboard } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import { ViewContainerInfo, TextInfo, ViewContainerChat, ViewContainerNewMessage, TouchIcon } from './styles'
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import useGet from '../../services/restServices';

import ActionCreators from '../../store/actionCreators'

///////ChatMessages
import { ScrollViewContainerMessages } from './styles'

///////ChatTextDate
import { ViewChatDate, TextChatDate } from './styles'

///////ChatItem
import { ViewChatItem, ViewChatText, TextMessage } from './styles'

function ChatMessages(props) {
    const { mensagens } = props
    return (
        <ScrollViewContainerMessages>
            {
                mensagens && mensagens.map((item, index) => {
                    if (index === 0) {
                        return (
                            <React.Fragment key={index} >
                                <ChatTextDate mensagem={item} />
                                <ChateItem mensagem={item} />
                            </React.Fragment>
                        )
                    }
                    else {
                        const previousItem = mensagens[index - 1]
                        if (previousItem.date != item.date) {
                            return (
                                <React.Fragment key={index} >
                                    <ChatTextDate mensagem={item} />
                                    <ChateItem mensagem={item} />
                                </React.Fragment>
                            )
                        }
                        else {
                            return <ChateItem key={index} mensagem={item} />
                        }
                    }
                })
            }
        </ScrollViewContainerMessages>
    )
}

function ChatTextDate(props) {
    const { mensagem } = props
    return (
        <ViewChatDate>
            <TextChatDate>{mensagem.date}</TextChatDate>
        </ViewChatDate>
    )
}

function ChateItem(props) {
    const { mensagem } = props
    return (
        <ViewChatItem justifyContent={mensagem.from === 'client' ? 'flex-start' : 'flex-end'}>
            <ViewChatText
                backColor={mensagem.from === 'client' ? '#D3D4FE' : '#EAEAEA'}
                marginRight={mensagem.from === 'client' ? 50 : 0}
                marginLeft={mensagem.from === 'client' ? 0 : 50}
            >
                <TextMessage>
                    {mensagem.message}
                </TextMessage>
            </ViewChatText>
        </ViewChatItem>
    )
}

function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([])

    const getMessages = useGet(`/chatMessages/messages.json?client_id=${props.user.id}&professional_id=${props.professionalSelected.id}&last_id=0`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        const kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        const knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            backHandler.remove()
            kbShow.remove()
            knHide.remove()
        }
    }, [])

    useEffect(() => {
        if (getMessages.data && getMessages.data.chatMessages) {
            setMensagens(getMessages.data.chatMessages);
        }
    }, [getMessages.data]);

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={() => handleBackPress()} title='Finos e Cheirosos' />
            <ViewContainerInfo>
                <TextInfo>Solicitações de Profissionais</TextInfo>
                <TextInfo>Informações do serviço</TextInfo>
            </ViewContainerInfo>
            <ViewContainerChat>
                <ChatMessages mensagens={mensagens} />
            </ViewContainerChat>
            <ViewContainerNewMessage style={{ marginBottom: keyboardIsVisible ? 35 : 0 }}>
                <Input
                    placeholder='Digite sua mensagem'
                    placeholderTextColor={white}
                    containerStyle={{ flex: 1 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    inputStyle={{ backgroundColor: lightpurple, color: white, paddingTop: 0, paddingBottom: 0, borderRadius: 2 }} />
                <TouchIcon>
                    <Icon name='send' size={25} color={gray} />
                </TouchIcon>
            </ViewContainerNewMessage>
        </KeyboardAvoidingView>
    )
}

ProfessionalChatScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        user: state.auth.userType === 'client' ? state.client.client : state.professional.professional,
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.services.selected,
        professionalSelected: state.professional.selected,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //serviceSelected: (service) => dispatch(ActionCreators.serviceSelected(service))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalChatScreen);