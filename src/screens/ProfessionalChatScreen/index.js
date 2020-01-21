import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import { ViewContainerInfo, TextInfo, ViewContainerChat, ViewContainerNewMessage, TouchIcon } from './styles'
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'

import ActionCreators from '../../store/actionCreators'

///////ChatMessages
import { ScrollViewContainerMessages } from './styles'

///////ChatTextDate
import { ViewChatDate, TextChatDate } from './styles'

///////ChatItem
import { ViewChatItem, ViewChatText, TextMessage, ViewArrowLeft, ViewArrowRight } from './styles'

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
                        if (previousItem.data != item.data) {
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
            <TextChatDate>{mensagem.data}</TextChatDate>
        </ViewChatDate>
    )
}

function ChateItem(props) {
    const { mensagem } = props
    return (
        <ViewChatItem justifyContent={mensagem.tipo === 'from' ? 'flex-start' : 'flex-end'}>
            <ViewChatText
                backColor={mensagem.tipo === 'from' ? '#D3D4FE' : '#EAEAEA'}
                marginRight={mensagem.tipo === 'from' ? 50 : 0}
                marginLeft={mensagem.tipo === 'from' ? 0 : 50}
            >
                <TextMessage>
                    {mensagem.mensagem}
                </TextMessage>
            </ViewChatText>
        </ViewChatItem>
    )
}

function ProfessionalChatScreen(props) {
    const [mensagens, setMensagens] = useState([
        {
            data: '28/05/2019',
            hora: '06:23:57',
            mensagem: 'Olá senhor Miaji, não vou poder ir ao treino hoje, por favor não espere por mim.',
            tipo: 'from'
        },
        {
            data: '29/05/2019',
            hora: '06:28:42',
            mensagem: 'Olá Daniel San, amanhã terá duas vezes mais para chão limpar e cercas para pintar.',
            tipo: 'to'
        }
    ])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

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
            <ViewContainerNewMessage>
                <TouchIcon>
                    <Icon name='tag-faces' size={25} color={gray} />
                </TouchIcon>
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