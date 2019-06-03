import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements'
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'

import { ScrollViewContainer, TextHireService, ViewCardContainer, ViewContainerConfirmar, ViewCardContent } from './styles'
import CardJobs from '../../components/CardJobs/index'
import TextInputJobs from '../../components/TextInputJobs/index'
import { purple } from '../../components/common/util/colors'

export default function ServiceHireScreen(props) {
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
            <ScrollViewContainer>
                <View style={{ flex: 1 }}>
                    <TextHireService>Falta pouco...</TextHireService>
                    <ViewCardContainer>
                        <CardJobs backColor='white' width='300' height='450' paddingCard='20'>
                            <ViewCardContent>
                                <TextInputJobs placeholder='Nome completo' />
                                <TextInputJobs placeholder='Telefone para contato' />
                                <TextInputJobs placeholder='Endereço' />
                                <TextInputJobs placeholder='Bairro' />
                                <TextInputJobs placeholder='Quantidade de orçamentos' />
                                <ViewContainerConfirmar>
                                    <Button title="Confirmar Orçamentos" buttonStyle={{ backgroundColor: purple }} />
                                </ViewContainerConfirmar>
                            </ViewCardContent>
                        </CardJobs>
                    </ViewCardContainer>
                </View>
            </ScrollViewContainer>
        </KeyboardAvoidingView>
    )
}

ServiceHireScreen.navigationOptions = {
    header: null
}