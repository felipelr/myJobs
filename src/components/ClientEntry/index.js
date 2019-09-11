import React, { useState, useEffect } from 'react'
import { View, Modal, PermissionsAndroid, Platform } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import { formatPhone, formatDate } from '../common/util/functions'

import {
    ScrollViewContainer, ViewContainerButton, ModalContainer,
    TakePictureButtonContainer, TakePictureButtonLabel,
    ModalButtons, CameraButtonContainer, CancelButtonText, ContinueButtonText,
    ContainerAvatar
} from './styles'
import { purple } from '../common/util/colors'

import TextInputJobs from '../../components/TextInputJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

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
    const [requisitou, setRequisitou] = useState(false)
    const [cameraModalOpened, setCameraModalOpened] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (requisitou) {
            if (props.client.errorUpdating) {
                this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                props.ownProps.onUpdate()
            }
        } else if (props.client.isUpdating) {
            setRequisitou(true)
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

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
            const data = await this.camera.takePictureAsync(options)
            setImage(data)
            console.log(image)
        }
    }

    handleCameraModalOpen = () => {
        if (Platform.OS === 'ios') {
            setCameraModalOpened(true)
        } else {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'Acesso a câmera requisitado',
                        'message': 'Este aplicativo precisar acessar sua câmera'
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        setCameraModalOpened(true)
                    } else {
                        alert("Permission Denied")
                    }
                } catch (err) {
                    alert(err)
                }
            }
            requestCameraPermission()
        }
    }

    handleCameraModalClose = () => {
        setCameraModalOpened(false)
    }

    handleCameraModalConfirm = () => {
        setCameraModalOpened(false)
    }

    return (
        <ScrollViewContainer ref={(c) => this.scrollViewContainer = c}>
            <View style={{ flex: 1, padding: 8 }}>
                {props.client.errorUpdating && <TextError>{props.client.errorMessage}</TextError>}
                {props.client.isUpdating && <Loading size='large' color={purple} height='330' />}
                {!props.client.isUpdating && (
                    <React.Fragment>
                        <ContainerAvatar>
                            <Avatar
                                rounded
                                containerStyle={{ elevation: 2, alignSelf: "center" }}
                                source={{
                                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                                size={140}
                                onPress={this.handleCameraModalOpen} />
                        </ContainerAvatar>

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

                        <Modal
                            visible={cameraModalOpened}
                            transparent={false}
                            animationType="slide"
                            onRequestClose={this.handleCameraModalClose}
                        >
                            <ModalContainer>
                                <ModalContainer>
                                    <RNCamera
                                        ref={camera => { this.camera = camera; }}
                                        style={{ flex: 1 }}
                                        type={RNCamera.Constants.Type.back}
                                        autoFocus={RNCamera.Constants.AutoFocus.on}
                                        flashMode={RNCamera.Constants.FlashMode.off}
                                        permissionDialogTitle={"Permissão para usar a câmera"}
                                        permissionDialogMessage={"Nós precisamos da sua permissão para usar a câmera do seu celular."}
                                    />
                                    <TakePictureButtonContainer onPress={this.handleTakePicture}>
                                        <TakePictureButtonLabel />
                                    </TakePictureButtonContainer>
                                </ModalContainer>
                                <ModalButtons>
                                    <CameraButtonContainer onPress={this.handleCameraModalClose}>
                                        <CancelButtonText>Cancelar</CancelButtonText>
                                    </CameraButtonContainer>
                                    <CameraButtonContainer onPress={this.handleCameraModalConfirm}>
                                        <ContinueButtonText>Continuar</ContinueButtonText>
                                    </CameraButtonContainer>
                                </ModalButtons>
                            </ModalContainer>
                        </Modal>
                    </React.Fragment>
                )}
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