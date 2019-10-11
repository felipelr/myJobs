import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../common/util/colors'

import {
    ViewContainer,
    ViewContainerButton
} from './styles'

import TextInputJobs from '../TextInputJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

function ChangePassword(props) {
    const [invalidField, setInvalidField] = useState('')
    const [newRequest, setNewRequest] = useState(false)
    const [userId, setUserId] = useState(props.auth.user.sub)
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    useEffect(() => {
        if (newRequest && !props.auth.isUpdating) {
            if (props.auth.error)
                setNewRequest(false)
            else
                props.ownProps.onUpdate()
        }
    }, [props.auth.isUpdating])

    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    validateField = (name, text) => {
        switch (name) {
            case 'currentPassword':
                if (text < 5)
                    return false
                break
            case 'newPassword':
                if (text.length < 5)
                    return false
                break
            case 'confirmNewPassword':
                if (text !== form.newPassword)
                    return false
                break
            default:
                break
        }
        return true
    }

    handleClickChangePassword = () => {
        if (invalidField === '') {
            setNewRequest(true)
            props.changePasswordRequest(props.token, { id: userId }, form.currentPassword, form.newPassword)
        }
    }

    return (
        <ViewContainer>
            {props.auth.isUpdating && <Loading size='large' color={purple} height='330' error={props.auth.error} />}

            {!props.auth.isUpdating && (
                <React.Fragment>
                    {props.auth.error && <TextError>{props.auth.errorMessage}</TextError>}
                    <TextInputJobs
                        name='currentPassword'
                        onChangeText={handleOnChange}
                        placeholder='Senha Atual'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField === 'currentPassword'} />

                    <TextInputJobs
                        name='newPassword'
                        onChangeText={handleOnChange}
                        placeholder='Nova Senha'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField === 'newPassword'} />

                    <TextInputJobs
                        name='confirmNewPassword'
                        onChangeText={handleOnChange}
                        placeholder='Confirme a Nova Senha'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField === 'confirmNewPassword'} />

                    <ViewContainerButton>
                        <ButtonPurple onPress={handleClickChangePassword}>Alterar Senha</ButtonPurple>
                    </ViewContainerButton>
                </React.Fragment>
            )}
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        auth: state.auth,
        client: state.client,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePasswordRequest: (token, user, currentPassword, newPassword) => dispatch(ActionCreators.changePasswordRequest(token, user, currentPassword, newPassword)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)