import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import { ContainerProfessionals } from './styles'

import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import HeaderJob from '../../components/HeaderJobs/index'
import Categories from '../../components/Categories/index'

export default function ProfessionalSearch() {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [categoria, setCategoria] = useState({ descricao: 'PetShop' })
    const [profissionais, setProfissionais] = useState([
        {
            nome: 'Finos e Cheirosos',
            descricao: 'Banho e Tosa de animais de pequeno e médio porte.',
            avaliacao: 3,
            qtdeAvaliacoes: 143000
        },
        {
            nome: 'CatDog',
            descricao: 'Vacinação e cuidados médicos.',
            avaliacao: 3.5,
            qtdeAvaliacoes: 76000
        },
        {
            nome: 'Love Cats',
            descricao: 'Vacinação e cuidados médicos.',
            avaliacao: 4.5,
            qtdeAvaliacoes: 76000
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
            <HeaderJob filter={true}/>
            <ContainerProfessionals>
                <Highlights titulo='Destaques do mês' destaques={{ categoria, profissionais }} />
                <Categories /> 
                <View style={{ flex: 4, marginTop: 2 }}>
                
                </View>
            </ContainerProfessionals>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ProfessionalSearch.navigationOptions = {
    header: null
}