import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import { ContainerProfessionals } from './styles'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'

export default function ProfessionalsScreen() {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [categoria, setCategoria] = useState({ descricao: 'PetShop' })
    const [profissionais, setProfissionais] = useState([
        {
            nome: 'Finos e Cheirosos',
            descricao: 'Banho e Tosa de animais de pequeno e médio porte.'
        },
        {
            nome: 'Finos e Cheirosos',
            descricao: 'Banho e Tosa de animais de pequeno e médio porte.'
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
            <ContainerProfessionals>
                <Highlights destaques={{ categoria, profissionais }} />
                <View style={{ flex: 4, backgroundColor: 'white', marginTop: 2 }}>

                </View>
            </ContainerProfessionals>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ProfessionalsScreen.navigationOptions = {
    header: null
}