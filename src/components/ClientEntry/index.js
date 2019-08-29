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
import ButtonPurple from '../../components/ButtonPurple/index'

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
    const [name, setName] = useState(props.auth.client.name)
    const [phone, setPhone] = useState(props.auth.client.phone)
    const [documentNumber, setDocumentNumber] = useState(props.auth.client.document)
    const [dateBirth, setDateBirth] = useState(props.auth.client.date_birth)
    const [gender, setGender] = useState(props.auth.client.gender)

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

    return (
        <ScrollViewContainer>
            <View style={{ flex: 1, padding: 8 }}>
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
                    <ButtonPurple>Confirmar</ButtonPurple>
                </ViewContainerButton>
            </View>
        </ScrollViewContainer>

    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEntry)