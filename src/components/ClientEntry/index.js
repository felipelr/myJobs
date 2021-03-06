import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, PermissionsAndroid, Platform, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import Moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ActionCreators from '../../store/actionCreators'

import { formatPhone, formatDate, formatDocumento } from '../common/util/functions'

import {
    ScrollViewContainer,
    ViewContainerButton,
    ModalContainer,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    ContainerAvatar,
    FlipCameraButtonContainer,
} from './styles'

import { purple, white } from '../common/util/colors'

import TextInputJobs from '../TextInputJobs/index'
import PickerJobs from '../PickerJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'
import GaleryMyJobs from '../GaleryMyJobs'
import MenuPicture from '../MenuPicture'

const ClientEntry = (props) => {
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
    const [form, setForm] = useState({
        ...props.client.client,
        date_birth: props.client.client.date_birth.substring(0, 10).split('-').reverse().join(''),
    })
    const [image, setImage] = useState(props.client.client.photo ? { uri: props.client.client.photo } : { uri: '' })
    const [requisitou, setRequisitou] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)
    const [menuOpened, setMenuOpened] = useState(true)
    const [cameraOpened, setCameraOpened] = useState(false)
    const [folderImagesOpened, setFolderImagesOpened] = useState(false)
    const [imgVersion] = useState(Moment(props.client.client.modified).toDate().getTime())
    const [cameraType, setCameraType] = useState('front')

    const scrollViewRef = useRef()
    const cameraRef = useRef()
    const phoneRef = useRef()
    const documentRef = useRef()
    const dateBirthRef = useRef()

    useEffect(() => {
        if (requisitou && !props.client.isUpdating) {
            if (props.client.errorUpdating) {
                setRequisitou(false)
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                props.ownProps.onUpdate()
            }
        }
    }, [props.client.isUpdating])

    useEffect(() => {
        if (form.date_birth.length > 0) {
            let date_ = formatDate(form.date_birth)
            if (form.date_birth !== date_) {
                setForm({
                    ...form,
                    'date_birth': date_
                })
            }
        }
    }, [form.date_birth])

    useEffect(() => {
        if (form.phone.length > 0) {
            let phone_ = formatPhone(form.phone)
            if (form.phone !== phone_) {
                setForm({
                    ...form,
                    'phone': phone_
                })
            }
        }
    }, [form.phone])

    useEffect(() => {
        if (form.document.length > 0) {
            let doc = formatDocumento(form.document)
            if (form.document !== doc) {
                setForm({
                    ...form,
                    'document': doc
                })
            }
        }
    }, [form.document])

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
            case 'document':
                if (value.length === 0)
                    return false
                break
            case 'phone':
                if (value.length < 14)
                    return false
                break
            case 'date_birth':
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

    const handleAvatarClick = () => {
        if (Platform.OS === 'ios') {
            handleShowMenu()
        } else {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.requestMultiple(
                        [
                            PermissionsAndroid.PERMISSIONS.CAMERA,
                            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        ]
                    )
                    if (granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED) {
                        handleShowMenu()
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

    const handleClickConfimar = () => {
        if (invalidField === '') {
            let clientData = {
                ...props.client.client,
                ...form,
                date_birth: form.date_birth.split('/').reverse().join('-'),
                image: image.base64 ? image.base64 : ''
            }
            setRequisitou(true)
            props.clientUpdateRequest(clientData, props.token)
        }
    }

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true, forceUpOrientation: true, fixOrientation: true, pauseAfterCapture: true };
            const data = await cameraRef.current.takePictureAsync(options)
            ImageResizer.createResizedImage(data.uri, 250, 250, 'JPEG', 100)
                .then(({ uri }) => {
                    RNFetchBlob.fs.readFile(uri, 'base64')
                        .then(data64 => {
                            setImage({
                                uri: uri,
                                base64: data64
                            })
                        })
                        .catch(err => {

                        })
                }).catch((err) => {

                })
        }
    }

    const handleSelectPicture = (item) => {
        ImageResizer.createResizedImage(item.uri, 250, 250, 'JPEG', 100)
            .then(({ uri }) => {
                RNFetchBlob.fs.readFile(uri, 'base64')
                    .then(data => {
                        setImage({
                            uri: uri,
                            base64: data
                        })
                        setMenuOpened(true)
                        setCameraOpened(false)
                        setFolderImagesOpened(false)
                        setModalOpened(false)
                    })
                    .catch(err => {
                        setMenuOpened(true)
                        setCameraOpened(false)
                        setFolderImagesOpened(false)
                        setModalOpened(false)
                    })
            }).catch((err) => {

            })
    }

    const handleShowMenu = () => {
        setModalOpened(true)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
    }

    const handleModalClose = () => {
        setImage(props.client.client.photo ? { uri: props.client.client.photo } : { uri: '' })
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
    }

    const handleCameraModalConfirm = () => {
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
    }

    const handleShowCamera = () => {
        setMenuOpened(false)
        setCameraOpened(true)
    }

    const handleShowFolder = () => {
        setMenuOpened(false)
        setFolderImagesOpened(true)
    }

    const handleFlipCamera = () => {
        setCameraType(cameraType === 'front' ? 'back' : 'front')
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView behavior={behavior}>
            <ScrollViewContainer
                ref={current => scrollViewRef.current = current}
                keyboardShouldPersistTaps='always'>
                <View style={{ flex: 1, padding: 8 }}>
                    {props.client.isUpdating && <Loading size='large' color={purple} height='330' error={props.client.errorUpdating} />}

                    {props.client.errorUpdating && <TextError>{props.client.errorMessage}</TextError>}

                    {!props.client.isUpdating && (
                        <React.Fragment>
                            <ContainerAvatar>
                                {image.uri.length > 0 &&
                                    <Avatar
                                        rounded
                                        containerStyle={{ elevation: 2, alignSelf: "center" }}
                                        source={image.uri.length > 0 ? { uri: image.uri + '?v=' + imgVersion } : { uri: '' }}
                                        size={120}
                                        onPress={handleAvatarClick}
                                        showEditButton
                                        editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                                        onEditPress={handleAvatarClick} />}

                                {image.uri.length <= 0 &&
                                    <Avatar
                                        rounded
                                        containerStyle={{ elevation: 2, alignSelf: "center" }}
                                        size={120}
                                        onPress={handleAvatarClick}
                                        showEditButton
                                        editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }} />}

                            </ContainerAvatar>

                            <TextInputJobs
                                value={form.name}
                                name='name'
                                onChangeText={handleOnChange}
                                placeholder='Nome'
                                invalidValue={invalidField === 'name'}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => phoneRef.current.focus()} />

                            <TextInputJobs
                                ref={input => { phoneRef.current = input; }}
                                value={form.phone}
                                name='phone'
                                onChangeText={handleOnChange}
                                placeholder='Telefone'
                                textContentType='telephoneNumber'
                                keyboardType='phone-pad'
                                invalidValue={invalidField === 'phone'}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => documentRef.current.focus()} />

                            <TextInputJobs
                                ref={input => { documentRef.current = input; }}
                                value={form.document}
                                name='document'
                                onChangeText={handleOnChange}
                                placeholder='CPF'
                                invalidValue={invalidField === 'document'}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => dateBirthRef.current.focus()} />

                            <TextInputJobs
                                ref={input => { dateBirthRef.current = input; }}
                                value={form.date_birth}
                                name='date_birth'
                                onChangeText={handleOnChange}
                                placeholder='Data de Nascimento'
                                keyboardType='number-pad'
                                invalidValue={invalidField === 'date_birth'}
                                returnKeyType="next" />

                            <PickerJobs
                                selectedValue={form.gender}
                                onValueChange={(itemValue, itemIndex) => {
                                    setForm({
                                        ...form,
                                        'gender': itemValue
                                    })
                                }}
                                itemsList={genderList} />

                            <ViewContainerButton>
                                <ButtonPurple onPress={handleClickConfimar} icon="check">Confirmar</ButtonPurple>
                            </ViewContainerButton>

                            <Modal
                                visible={modalOpened}
                                transparent={menuOpened}
                                animationType="fade"
                                onRequestClose={handleModalClose}>

                                {menuOpened &&
                                    <MenuPicture
                                        onCameraPress={handleShowCamera}
                                        onGaleryPress={handleShowFolder}
                                        onCancelPress={handleModalClose} />}

                                {cameraOpened && (
                                    <ModalContainer>
                                        <ModalContainer>
                                            <RNCamera
                                                ref={camera => { cameraRef.current = camera; }}
                                                style={{ flex: 1 }}
                                                type={cameraType === 'front' ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                                                autoFocus={RNCamera.Constants.AutoFocus.on}
                                                flashMode={RNCamera.Constants.FlashMode.off}
                                                androidCameraPermissionOptions={{
                                                    title: 'Permissão para usar a câmera',
                                                    message: 'Nós precisamos da sua permissão para usar a câmera',
                                                    buttonPositive: 'Ok',
                                                    buttonNegative: 'Cancel',
                                                }}
                                                androidRecordAudioPermissionOptions={{
                                                    title: 'Permissão para gravar audio',
                                                    message: 'Nós precisamos da sua permissão para usar o seu audio',
                                                    buttonPositive: 'Ok',
                                                    buttonNegative: 'Cancel',
                                                }}
                                            />
                                            <TakePictureButtonContainer onPress={handleTakePicture}>
                                                <TakePictureButtonLabel />
                                            </TakePictureButtonContainer>
                                            <FlipCameraButtonContainer onPress={handleFlipCamera}>
                                                <Icon name="switch-camera" size={40} color={white} />
                                            </FlipCameraButtonContainer>
                                        </ModalContainer>
                                        <ModalButtons>
                                            <CameraButtonContainer onPress={handleModalClose}>
                                                <CancelButtonText>Cancelar</CancelButtonText>
                                            </CameraButtonContainer>
                                            <CameraButtonContainer onPress={handleCameraModalConfirm}>
                                                <ContinueButtonText>Continuar</ContinueButtonText>
                                            </CameraButtonContainer>
                                        </ModalButtons>
                                    </ModalContainer>
                                )}

                                {folderImagesOpened &&
                                    <ModalContainer>
                                        <GaleryMyJobs onItemPress={(item) => handleSelectPicture(item)} />
                                        <ModalButtons>
                                            <CameraButtonContainer onPress={handleModalClose}>
                                                <CancelButtonText>Cancelar</CancelButtonText>
                                            </CameraButtonContainer>
                                        </ModalButtons>
                                    </ModalContainer>}
                            </Modal>
                        </React.Fragment>
                    )}
                </View>
            </ScrollViewContainer>
        </KeyboardAvoidingView>
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