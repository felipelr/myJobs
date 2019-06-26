import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Switch } from 'react-native'
import { CheckBox } from 'react-native-elements'

import TextInputJobs from '../TextInputJobs/index'
import PickerJobs from '../PickerJobs/index'
import CardJobs from '../CardJobs/index'
import { white, purple } from '../common/util/colors'

import {
    TextSignUpTitle, ViewContainerGotoLogin, TextGotoLogin,
    ButtonGotoLogin, TextGotoLoginButton, ViewFixedContainer,
    ViewContainerRow, ButtonPurple, TextButtonPurple,
    ScrollViewContainerForm
} from './styles'
import { styleSheets } from './styles'

function SignUp(props) {
    const [viewVisible, setViewVisible] = useState(1)
    const [userType, setUserType] = useState(1)
    const [genreList, setGenreList] = useState([
        {
            label: 'Masculino',
            value: 'MASCULINO'
        },
        {
            label: 'Feminino',
            value: 'FEMININO'
        },
        {
            label: 'Outro',
            value: 'OUTRO'
        }
    ])

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
            <CardJobs backColor={white} width='300' height='800' opacity={1}>
                <TextSignUpTitle>Sign Up</TextSignUpTitle>
                <ViewFixedContainer height='330'>
                    <View>
                        <ViewContainerRow>
                            <CheckBox title='Cliente' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType === 1} onPress={() => setUserType(1)} />
                            <CheckBox title='Profissional' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType !== 1} onPress={() => setUserType(2)} />
                        </ViewContainerRow>
                        <TextInputJobs value={name} onChangeText={(text) => setName(text)} placeholder='Nome' />
                        <TextInputJobs value={phone} onChangeText={(text) => setPhone(text)} placeholder='Telefone' textContentType='telephoneNumber' />
                        <TextInputJobs value={document_number} onChangeText={(text) => setDocumentNumber(text)} placeholder='CPF' />
                        <TextInputJobs value={dataBirth} onChangeText={(text) => setDataBirth(text)} placeholder='Data de Nascimento' />
                        <PickerJobs selectedValue={genre} onValueChange={(itemValue, itemIndex) => setGenre(itemValue)} itemsList={genreList} />

                        <TextInputJobs value={email} onChangeText={(text) => setEmail(text)} placeholder='Email' textContentType='emailAddress' />
                        <TextInputJobs value={password} onChangeText={(text) => setPassword(text)} placeholder='Senha' textContentType='password' secureTextEntry={true} />
                        <TextInputJobs value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} placeholder='Confirme a Senha' textContentType='password' secureTextEntry={true} />

                        <ViewContainerRow>
                            <ButtonPurple>
                                <TextButtonPurple>Confirmar</TextButtonPurple>
                            </ButtonPurple>
                        </ViewContainerRow>

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