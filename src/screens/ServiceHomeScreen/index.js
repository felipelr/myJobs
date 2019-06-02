import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity } from 'react-native'

import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import List from '../../components/List/index'
import Footer from '../../components/Footer/index'
import { ContainerList } from './styles'


import { ServicesSolicitationContainer, ServicesSolicitationText } from './styles'


import Icon from 'react-native-vector-icons/MaterialIcons'
import CardJobs from '../../components/CardJobs/index'
import { SolicitationStatusContainer, CardStatusContainer, CardStatusText } from './styles'
import { orange, purple, green } from '../../components/common/util/colors'

function ServicesSolicition(props) {
    return (
        <ServicesSolicitationContainer>
            <ServicesSolicitationText>Solicitações de Profissionais</ServicesSolicitationText>
            <SolicitationStatus />
        </ServicesSolicitationContainer>
    )
}

function SolicitationStatus(props) {
    return (
        <SolicitationStatusContainer>
            <CardJobs backColor={orange} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='alarm' size={40} color={orange} />
                    <CardStatusText textColor={orange}>10</CardStatusText>
                    <CardStatusText textColor={orange}>Abertas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={purple} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='hourglass-empty' size={40} color={purple} />
                    <CardStatusText textColor={purple}>10</CardStatusText>
                    <CardStatusText textColor={purple}>Andamento</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={green} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='check' size={40} color={green} />
                    <CardStatusText textColor={green}>10</CardStatusText>
                    <CardStatusText textColor={green}>Finalizadas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
        </SolicitationStatusContainer>
    )
}

export default function ServiceHomeScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [categoria, setCategoria] = useState({
        descricao: 'Manicure'
    })
    const [servicos, setServicos] = useState([
        {
            descricao: 'PetShop',
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            descricao: 'Mecânico',
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            descricao: 'Diarista',
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        }
    ])

    useEffect(() => {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            this.kbShow.remove()
            this.kbShow.remove()
        }
    }, [])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back title={categoria.descricao} />
            <ServicesSolicition />
            <ContainerList>
                <List tipo='service' titulo='Serviços' itens={servicos} />
            </ContainerList>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ServiceHomeScreen.navigationOptions = {
    header: null
}