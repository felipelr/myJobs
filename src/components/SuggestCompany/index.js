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
    const [form, setForm] = useState({
        name: '',
        contact: '',
        phone: '',
    })

    useEffect(() => {
        if (newRequest && !props.professional.loading) {
            if (props.professional.error)
                setNewRequest(false)
            else
                props.ownProps.onUpdate()
        }
    }, [props.professional.loading])

    useEffect(() => {
        if (form.phone.length > 0) {
            let phone_ = formatPhone(form.phone)
            if (form.phone !== phone_) {
                setForm({
                    ...form,
                    phone: phone_
                })
            }
        }
    }, [form.phone])

    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
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
            case 'phone':
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
            props.sendNewSuggest(props.token, form)
        }
    }

    return (
        <ViewContainer>
            {props.professional.loading && <Loading size='large' color={purple} height='330' error={props.professional.error} />}

            {!props.professional.loading && (
                <React.Fragment>
                    {props.professional.error && <TextError>{props.professional.errorMessage}</TextError>}
                    <TextInputJobs
                        name='name'
                        onChangeText={handleOnChange}
                        placeholder='Nome'
                        invalidValue={invalidField === 'name'} />

                    <TextInputJobs
                        name='contact'
                        onChangeText={handleOnChange}
                        placeholder='Nome do contato'
                        invalidValue={invalidField === 'contact'} />

                    <TextInputJobs
                        value={form.phone}
                        name='phone'
                        onChangeText={handleOnChange}
                        placeholder='Telefone'
                        textContentType='telephoneNumber'
                        keyboardType='phone-pad'
                        invalidValue={invalidField === 'phone'} />

                    <ViewContainerButton>
                        <ButtonPurple onPress={handleClickEnviar} icon="check">Enviar</ButtonPurple>
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