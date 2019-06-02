import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity } from 'react-native'

import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import List from '../../components/List/index'
import Footer from '../../components/Footer/index'
import ServicesSolicitation from '../../components/ServicesSolicitation/index'
import { ContainerList } from './styles'

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
    const [solicitacoes, setSolicitacoes] = useState({
        abertas: 10,
        andamento: 2,
        finalizadas: 52
    })

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
            <ServicesSolicitation solicitacoes={solicitacoes} />
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