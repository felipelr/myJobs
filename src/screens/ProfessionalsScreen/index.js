import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import { ContainerProfessionals } from './styles'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'

export default function ProfessionalsScreen() {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

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

            </ContainerProfessionals>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ProfessionalsScreen.navigationOptions = {
    header: null
}