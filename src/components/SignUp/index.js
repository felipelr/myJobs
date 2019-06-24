import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import { white } from '../common/util/colors'

import {
    TextSignUpTitle, ViewContainerGotoLogin, TextGotoLogin,
    ButtonGotoLogin, TextGotoLoginButton, ViewFixedContainer,
    ViewContainerButtons, ButtonPurple, TextButtonPurple,
    ButtonWhite, TextButtonWhite, ScrollViewContainerForm
} from './styles'

function SignUp(props) {
    const [viewVisible, setViewVisible] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [document_number, setDocumentNumber] = useState('')
    const [dataBirth, setDataBirth] = useState('')
    const [genre, setGenre] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    return (
        <ScrollViewContainerForm>
            <CardJobs backColor={white} width='300' height='670' opacity={1}>
                <TextSignUpTitle>Sign Up</TextSignUpTitle>
                <ViewFixedContainer height='330'>
                    <View>
                        <TextInputJobs value={name} onChangeText={(text) => setName(text)} placeholder='Nome' />
                        <TextInputJobs value={phone} onChangeText={(text) => setPhone(text)} placeholder='Telefone' textContentType='telephoneNumber' />
                        <TextInputJobs value={dataBirth} onChangeText={(text) => setDataBirth(text)} placeholder='Data de Nascimento' />
                        <TextInputJobs value={document_number} onChangeText={(text) => setDocumentNumber(text)} placeholder='CPF' />

                        <TextInputJobs value={email} onChangeText={(text) => setEmail(text)} placeholder='Email' textContentType='emailAddress' />
                        <TextInputJobs value={password} onChangeText={(text) => setPassword(text)} placeholder='Senha' textContentType='password' secureTextEntry={true} />
                        <TextInputJobs value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} placeholder='Confirme a Senha' textContentType='password' secureTextEntry={true} />
                        
                        <ViewContainerButtons>
                            <ButtonPurple onPress={() => setViewVisible(2)}>
                                <TextButtonPurple>Confirmar</TextButtonPurple>
                            </ButtonPurple>
                        </ViewContainerButtons>

                        <ViewContainerGotoLogin>
                            <TextGotoLogin>Já possui cadastro?</TextGotoLogin>
                            <ButtonGotoLogin onPress={props.ownProps.onPressLogin}>
                                <TextGotoLoginButton>Fazer Login</TextGotoLoginButton>
                            </ButtonGotoLogin>
                        </ViewContainerGotoLogin>
                    </View>
                </ViewFixedContainer>
            </CardJobs>
        </ScrollViewContainerForm>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)