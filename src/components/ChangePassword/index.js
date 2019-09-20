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
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    useEffect(() => {
        if (newRequest && !props.auth.isUpdating) {
            if (props.auth.error)
                setNewRequest(false)
            else
                props.ownProps.onUpdate()
        }
    }, [props.auth.isUpdating])

    handleOnChange = (field, text) => {
        switch (field) {
            case 'currentPassword':
                setCurrentPassword(text)
                break
            case 'newPassword':
                setNewPassword(text)
                break
            case 'confirmNewPassword':
                setConfirmNewPassword(text)
                break
            default:
                break
        }

        if (!validateField(field, text))
            setInvalidField(field)
        else
            setInvalidField('')
    }

    validateField = (field, value) => {
        switch (field) {
            case 'currentPassword':
                if (value < 5)
                    return false
                break
            case 'newPassword':
                if (value.length < 5)
                    return false
                break
            case 'confirmNewPassword':
                if (value !== newPassword)
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
            props.changePasswordRequest(props.token, { id: userId }, currentPassword, newPassword)
        }
    }

    return (
        <ViewContainer>
            {props.auth.isUpdating && <Loading size='large' color={purple} height='330' error={props.auth.error} />}

            {!props.auth.isUpdating && (
                <React.Fragment>
                    {props.auth.error && <TextError>{props.auth.errorMessage}</TextError>}
                    <TextInputJobs
                        value={currentPassword}
                        onChangeText={(text) => handleOnChange('currentPassword', text)}
                        placeholder='Senha Atual'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField}
                        nameField='currentPassword' />

                    <TextInputJobs
                        value={newPassword}
                        onChangeText={(text) => handleOnChange('newPassword', text)}
                        placeholder='Nova Senha'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField}
                        nameField='newPassword' />

                    <TextInputJobs
                        value={confirmNewPassword}
                        onChangeText={(text) => handleOnChange('confirmNewPassword', text)}
                        placeholder='Confirme a Nova Senha'
                        textContentType='password'
                        secureTextEntry={true}
                        invalidValue={invalidField}
                        nameField='confirmNewPassword' />

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