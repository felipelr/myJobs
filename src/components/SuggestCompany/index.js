import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../common/util/colors'

import { formatPhone } from '../common/util/functions'

import {
    ViewContainer,
    ViewContainerButton
} from './styles'

import TextInputJobs from '../TextInputJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

function SuggestCompany(props) {
    const [invalidField, setInvalidField] = useState('')
    const [newRequest, setNewRequest] = useState(false)
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [contactPhone, setContactPhone] = useState('')

    useEffect(() => {
        if (newRequest && !props.professional.loading) {
            if (props.professional.error)
                setNewRequest(false)
            else
                props.ownProps.onUpdate()
        }
    }, [props.professional.loading])

    useEffect(() => {
        if (contactPhone.length > 0) {
            let phone_ = formatPhone(contactPhone)
            if (contactPhone !== phone_)
                setContactPhone(phone_)
        }
    }, [contactPhone])

    handleOnChange = (field, text) => {
        switch (field) {
            case 'name':
                setName(text)
                break
            case 'contact':
                setContact(text)
                break
            case 'contactPhone':
                setContactPhone(text)
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
            case 'name':
                if (value < 5)
                    return false
                break
            case 'contact':
                if (value.length < 5)
                    return false
                break
            case 'contactPhone':
                if (value.length < 14)
                    return false
                break
            default:
                break
        }
        return true
    }

    handleClickEnviar = () => {
        if (invalidField === '') {
            setNewRequest(true)
            const data = {
                name,
                contact,
                phone: contactPhone
            }
            props.sendNewSuggest(props.token, data)
        }
    }

    return (
        <ViewContainer>
            {props.professional.loading && <Loading size='large' color={purple} height='330' error={props.professional.error} />}

            {!props.professional.loading && (
                <React.Fragment>
                    {props.professional.error && <TextError>{props.professional.errorMessage}</TextError>}
                    <TextInputJobs
                        value={name}
                        onChangeText={(text) => handleOnChange('name', text)}
                        placeholder='Nome'
                        invalidValue={invalidField}
                        nameField='name' />

                    <TextInputJobs
                        value={contact}
                        onChangeText={(text) => handleOnChange('contact', text)}
                        placeholder='Nome do contato'
                        invalidValue={invalidField}
                        nameField='contact' />

                    <TextInputJobs
                        value={contactPhone}
                        onChangeText={(text) => handleOnChange('contactPhone', text)}
                        placeholder='Telefone'
                        textContentType='telephoneNumber'
                        keyboardType='phone-pad'
                        invalidValue={invalidField}
                        nameField='contactPhone' />

                    <ViewContainerButton>
                        <ButtonPurple onPress={handleClickEnviar}>Enviar</ButtonPurple>
                    </ViewContainerButton>
                </React.Fragment>
            )}
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        professional: state.professional,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendNewSuggest: (token, data) => dispatch(ActionCreators.professionalsSendNewSuggest(token, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCompany)