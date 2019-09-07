import React, { useState, useEffect } from 'react'
import { View, PermissionsAndroid, Platform } from 'react-native'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { formatPhone, formatDate } from '../common/util/functions'

import {
    ScrollViewContainer, ViewContainerButton
} from './styles'

import TextInputJobs from '../../components/TextInputJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'

function ClientEntry(props) {
    const [invalidField, setInvalidField] = useState('')
    const [genderList, setGenderList] = useState([
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
    const [name, setName] = useState(props.client.client.name)
    const [phone, setPhone] = useState(props.client.client.phone)
    const [documentNumber, setDocumentNumber] = useState(props.client.client.document)
    const [dateBirth, setDateBirth] = useState(props.client.client.date_birth.substring(0, 10).split('-').reverse().join(''))
    const [gender, setGender] = useState(props.client.client.gender)
    const [newRequest, setNewRequest] = useState(-1)

    useEffect(() => {
        if (props.client.isUpdating) {
            if (newRequest === -1) {
                setNewRequest(1)
            }
        }
        else if (newRequest === 1) {
            if (props.client.errorUpdating) {
                this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                props.ownProps.onUpdate()
            }
        }
    }, [props.client.isUpdating])

    useEffect(() => {
        if (dateBirth.length > 0) {
            let date_ = formatDate(dateBirth)
            if (dateBirth !== date_)
                setDateBirth(date_)
        }
    }, [dateBirth])

    useEffect(() => {
        if (phone.length > 0) {
            let phone_ = formatPhone(phone)
            if (phone !== phone_)
                setPhone(phone_)
        }
    }, [phone])

    handleOnChange = (field, text) => {
        switch (field) {
            case 'name':
                setName(text)
                break
            case 'phone':
                setPhone(text)
                break
            case 'documentNumber':
                setDocumentNumber(text)
                break
            case 'dateBirth':
                setDateBirth(text)
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
            case 'documentNumber':
                if (value.length === 0)
                    return false
                break
            case 'phone':
                if (value.length < 14)
                    return false
                break
            case 'dateBirth':
                if (value.length < 10)
                    return false
                break
            case 'gender':
                if (value === '' || value === 'SELECIONE')
                    return false
                break
            default:
                break
        }
        return true
    }

    handleClickConfimar = () => {
        if (invalidField === '') {
            let clientData = {
                ...props.client.client,
                name: name,
                phone: phone,
                document: documentNumber,
                date_birth: dateBirth.split('/').reverse().join('-'),
                gender: gender
            }

            props.clientUpdateRequest(clientData, props.token)
        }
    }

    return (
        <ScrollViewContainer ref={(c) => this.scrollViewContainer = c}>
            <View style={{ flex: 1, padding: 8 }}>
                {
                    props.client.errorUpdating && <TextError>{props.client.errorMessage}</TextError>
                }
                <TextInputJobs
                    value={name}
                    onChangeText={(text) => handleOnChange('name', text)}
                    placeholder='Nome'
                    invalidValue={invalidField}
                    nameField='name' />

                <TextInputJobs
                    value={phone}
                    onChangeText={(text) => handleOnChange('phone', text)}
                    placeholder='Telefone'
                    textContentType='telephoneNumber'
                    keyboardType='phone-pad'
                    invalidValue={invalidField}
                    nameField='phone' />

                <TextInputJobs
                    value={documentNumber}
                    onChangeText={(text) => handleOnChange('documentNumber', text)}
                    placeholder='CPF'
                    invalidValue={invalidField}
                    nameField='documentNumber' />

                <TextInputJobs
                    value={dateBirth}
                    onChangeText={(text) => handleOnChange('dateBirth', text)}
                    placeholder='Data de Nascimento'
                    keyboardType='number-pad'
                    invalidValue={invalidField}
                    nameField='dateBirth' />

                <PickerJobs
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                    itemsList={genderList} />

                <ViewContainerButton>
                    <ButtonPurple onPress={handleClickConfimar}>Confirmar</ButtonPurple>
                </ViewContainerButton>
            </View>
        </ScrollViewContainer>

    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        client: state.client,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientUpdateRequest: (client, token) => dispatch(ActionCreators.clientUpdateRequest(client, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEntry)