import React, { useState, useEffect, useRef } from 'react'
import { PermissionsAndroid, Platform, View, Modal, Text } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment'

import ActionCreators from '../../store/actionCreators'

import { formatDate, formatPhone, formatDocumento } from '../common/util/functions'

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
    ImageCapa,
    ViewCapa,
    ViewIcon,
    FlipCameraButtonContainer,
} from './styles'

import { purple, lightgray, white } from '../common/util/colors'

import TextInputJobs from '../TextInputJobs/index'
import ButtonPurple from '../ButtonPurple/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'
import GaleryMyJobs from '../GaleryMyJobs'
import MenuPicture from '../MenuPicture'

function ProfessionalEntry(props) {
    const [invalidField, setInvalidField] = useState('')
    const [form, setForm] = useState({
        ...props.professional.professional,
        date_birth: props.professional.professional.date_birth.substring(0, 10).split('-').reverse().join(''),
    })
    const [image, setImage] = useState(props.professional.professional.photo ? { uri: props.professional.professional.photo } : { uri: '' })
    const [backImage, setBackImage] = useState(props.professional.professional.backImage ? { uri: props.professional.professional.backImage } : { uri: '' })
    const [requisitou, setRequisitou] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)
    const [menuOpened, setMenuOpened] = useState(true)
    const [cameraOpened, setCameraOpened] = useState(false)
    const [folderImagesOpened, setFolderImagesOpened] = useState(false)
    const [typeImage, setTypeImage] = useState(false)
    const [imgVersion] = useState(Moment(props.professional.professional.modified).toDate().getTime())
    const [cameraType, setCameraType] = useState('front')

    const scrollViewRef = useRef()
    const cameraRef = useRef()

    useEffect(() => {
        if (requisitou && !props.professional.isUpdating) {
            if (props.professional.errorUpdating) {
                setRequisitou(false)
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            }
            else
                props.ownProps.onUpdate()
        }
    }, [props.professional.isUpdating])

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
        if (form.phone && form.phone.length > 0) {
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
            default:
                break
        }
        return true
    }

    const handleAvatarClick = (type) => {
        setTypeImage(type)
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
            let professionalData = {
                ...props.professional.professional,
                ...form,
                date_birth: form.date_birth.split('/').reverse().join('-'),
                image: image.base64 ? image.base64 : '',
                imageBackground: backImage.base64 ? backImage.base64 : ''
            }
            setRequisitou(true)
            props.professionalUpdateRequest(professionalData, props.token)
        }
    }

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true, forceUpOrientation: true, fixOrientation: true, pauseAfterCapture: true };
            const data = await cameraRef.current.takePictureAsync(options)
            if (typeImage === 'backImage') {
                ImageResizer.createResizedImage(data.uri, 1024, 1024, 'JPEG', 100)
                    .then(({ uri }) => {
                        RNFetchBlob.fs.readFile(uri, 'base64')
                            .then(data64 => {
                                setBackImage({
                                    uri: uri,
                                    base64: data64
                                })
                            })
                            .catch(err => {

                            })
                    }).catch((err) => {

                    })
            }
            else {
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
    }

    const handleSelectPicture = (item) => {
        ImageResizer.createResizedImage(item.uri, 250, 250, 'JPEG', 100)
            .then(({ uri }) => {
                RNFetchBlob.fs.readFile(uri, 'base64')
                    .then(data => {
                        if (typeImage === 'backImage') {
                            setBackImage({
                                uri: uri,
                                base64: data
                            })
                        }
                        else {
                            setImage({
                                uri: uri,
                                base64: data
                            })
                        }

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
        if (image != props.professional.professional.photo)
            setImage(props.professional.professional.photo ? { uri: props.professional.professional.photo } : { uri: '' })

        if (backImage != props.professional.professional.backImage)
            setBackImage(props.professional.professional.backImage ? { uri: props.professional.professional.backImage } : { uri: '' })

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

    return (
        <ScrollViewContainer ref={(c) => scrollViewRef.current = c} keyboardShouldPersistTaps='always'>
            <View style={{ flex: 1 }}>
                {props.professional.isUpdating && <Loading size='large' color={purple} height='330' error={props.professional.errorUpdating} />}

                {props.professional.errorUpdating && <TextError>{props.professional.errorMessage}</TextError>}

                {!props.professional.isUpdating && (
                    <React.Fragment>
                        <ViewCapa onPress={() => handleAvatarClick('backImage')}>
                            {backImage.uri.length > 0 && <ImageCapa source={{ uri: backImage.uri + '?v=' + imgVersion }} />}
                            {backImage.uri.length <= 0 && <Text></Text>}
                            <ViewIcon>
                                <Icon name="edit" size={32} color={lightgray} />
                            </ViewIcon>
                        </ViewCapa>

                        <ContainerAvatar>
                            {image.uri.length > 0 &&
                                <Avatar
                                    rounded
                                    containerStyle={{ elevation: 2, alignSelf: "center" }}
                                    source={image.uri.length > 0 ? { uri: image.uri + '?v=' + imgVersion } : { uri: '' }}
                                    size={120}
                                    onPress={() => handleAvatarClick('photo')}
                                    showEditButton
                                    editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                                    onEditPress={() => handleAvatarClick('photo')} />}

                            {image.uri.length <= 0 &&
                                <Avatar
                                    rounded
                                    containerStyle={{ elevation: 2, alignSelf: "center" }}
                                    size={120}
                                    onPress={() => handleAvatarClick('photo')}
                                    showEditButton
                                    editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                                    onEditPress={() => handleAvatarClick('photo')} />}

                        </ContainerAvatar>

                        <View style={{ padding: 8 }}>
                            <TextInputJobs
                                value={form.name}
                                name='name'
                                onChangeText={handleOnChange}
                                placeholder='Nome'
                                invalidValue={invalidField === 'name'} />

                            <TextInputJobs
                                value={form.description}
                                name='description'
                                onChangeText={handleOnChange}
                                placeholder='Descrição'
                                multiline={true}
                                numberOfLines={3}
                                style={{ textAlignVertical: true }}
                                invalidValue={invalidField === 'description'} />

                            <TextInputJobs
                                value={form.phone}
                                name='phone'
                                onChangeText={handleOnChange}
                                placeholder='Telefone'
                                textContentType='telephoneNumber'
                                keyboardType='phone-pad'
                                invalidValue={invalidField === 'phone'} />

                            <TextInputJobs
                                value={form.document}
                                name='document'
                                onChangeText={handleOnChange}
                                placeholder='CPF/CNPJ'
                                invalidValue={invalidField === 'document'} />

                            <TextInputJobs
                                value={form.date_birth}
                                name='date_birth'
                                onChangeText={handleOnChange}
                                placeholder='Data de Nascimento'
                                keyboardType='number-pad'
                                invalidValue={invalidField === 'date_birth'} />

                            <ViewContainerButton>
                                <ButtonPurple onPress={handleClickConfimar} icon="check">Confirmar</ButtonPurple>
                            </ViewContainerButton>
                        </View>

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
        professionalUpdateRequest: (professional, token) => dispatch(ActionCreators.professionalUpdateRequest(professional, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalEntry)