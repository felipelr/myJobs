import React, { useState, useEffect } from 'react'
import {  KeyboardAvoidingView, Platform, Keyboard } from 'react-native'

import { ContainerProfessionals, ContainerList } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'

export default function ProfessionalsScreen() {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [categoria, setCategoria] = useState({ descricao: 'PetShop' })
    const [profissionais, setProfissionais] = useState([
        {
            nome: 'Finos e Cheirosos',
            descricao: 'Banho e Tosa de animais de pequeno e médio porte.',
            avaliacao: 3,
            qtdeAvaliacoes: 143000,
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            nome: 'CatDog',
            descricao: 'Vacinação e cuidados médicos.',
            avaliacao: 3.5,
            qtdeAvaliacoes: 76000,
            info: '87 Atendimentos realizados,  0,82km de você',
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
            <HeaderJobs back={true} filter={true} />
            <ContainerProfessionals>
                <Highlights titulo='Destaque da Categoria PetShop 2' destaques={{ categoria, profissionais }} />
                <ContainerList>
                    <List tipo='professional' titulo='Profissionais/Empresas' itens={profissionais} />
                </ContainerList>
            </ContainerProfessionals>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ProfessionalsScreen.navigationOptions = {
    header: null
}