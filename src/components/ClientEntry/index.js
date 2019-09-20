import React, { useState, useEffect } from 'react'
import { View, Modal, PermissionsAndroid, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import CameraRoll from "@react-native-community/cameraroll"
import RNFetchBlob from 'react-native-fetch-blob'

import { urlMyJobs } from '../../config/config'

import ActionCreators from '../../store/actionCreators'

import { formatPhone, formatDate } from '../common/util/functions'

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
    ViewContainerMenu,
    ViewContainerButtonsMenu,
    ButtonMenu,
    ButtonMenuText,
    ViewImageListItem,
    ImageItem
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
    const [image, setImage] = useState(props.client.client.image_path ? { uri: urlMyJobs + props.client.client.image_path } : { uri: '' })
    const [requisitou, setRequisitou] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)
    const [menuOpened, setMenuOpened] = useState(true)
    const [cameraOpened, setCameraOpened] = useState(false)
    const [folderImagesOpened, setFolderImagesOpened] = useState(false)
    const [imagesFolder, setImagesFolder] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [endCursor, setEndCursor] = useState('')

    useEffect(() => {
        if (requisitou && !props.client.isUpdating) {
            if (props.client.errorUpdating) {
                setRequisitou(false)
                this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
            }
            else
                props.ownProps.onUpdate()
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

    handleAvatarClick = () => {
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

    handleClickConfimar = () => {
        if (invalidField === '') {
            let clientData = {
                ...props.client.client,
                name: name,
                phone: phone,
                document: documentNumber,
                date_birth: dateBirth.split('/').reverse().join('-'),
                gender: gender,
                image: image.base64 ? image.base64 : ''
            }
            setRequisitou(true)
            props.clientUpdateRequest(clientData, props.token)
        }
    }

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
            const data = await this.camera.takePictureAsync(options)
            setImage(data)
        }
    }

    handleSelectPicture = (item) => {
        RNFetchBlob.fs.readFile(item.uri, 'base64')
            .then(data => {
                item = {
                    ...item,
                    base64: data
                }
                setImage(item)
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
    }

    handleShowMenu = () => {
        setModalOpened(true)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
    }

    handleModalClose = () => {
        setImage(props.client.client.image_path ? { uri: urlMyJobs + props.client.client.image_path } : { uri: '' })
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
    }

    handleCameraModalConfirm = () => {
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
    }

    handleShowCamera = () => {
        setMenuOpened(false)
        setCameraOpened(true)
    }

    handleShowFolder = () => {
        setMenuOpened(false)
        setFolderImagesOpened(true)
        loadGaleryPhotos()
    }

    loadGaleryPhotos = () => {
        if (hasNextPage) {
            CameraRoll.getPhotos({
                first: 10,
                after: endCursor,
                assetType: 'Photos',
            })
                .then(r => {
                    const photos = r.edges.map(item => item.node.image)
                    if (imagesFolder.length > 0)
                        setImagesFolder([...imagesFolder, ...photos])
                    else
                        setImagesFolder(photos)
                    setHasNextPage(r.page_info.has_next_page)
                    setEndCursor(r.page_info.end_cursor)
                })
                .catch((err) => {
                    console.error(err)
                    setImagesFolder([])
                })
        }
    }

    return (
        <ScrollViewContainer ref={(c) => this.scrollViewContainer = c}>
            <View style={{ flex: 1, padding: 8 }}>
                {props.client.isUpdating && <Loading size='large' color={purple} height='330' error={props.client.errorUpdating} />}

                {props.client.errorUpdating && <TextError>{props.client.errorMessage}</TextError>}

                {!props.client.isUpdating && (
                    <React.Fragment>
                        <ContainerAvatar>
                            <Avatar
                                rounded
                                containerStyle={{ elevation: 2, alignSelf: "center" }}
                                source={image.uri.length > 0 ? { uri: image.uri + '?v=' + new Date().getTime() } : { uri: '' }}
                                size={120}
                                onPress={this.handleAvatarClick}
                                showEditButton
                                editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }} />
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
                            visible={modalOpened}
                            transparent={menuOpened}
                            animationType="slide"
                            onRequestClose={this.handleModalClose}
                        >
                            {menuOpened && (
                                <ViewContainerMenu>
                                    <ViewContainerButtonsMenu>
                                        <ButtonMenu onPress={this.handleShowCamera}>
                                            <ButtonMenuText>Tirar Foto</ButtonMenuText>
                                        </ButtonMenu>
                                        <ButtonMenu onPress={this.handleShowFolder}>
                                            <ButtonMenuText>Galeria</ButtonMenuText>
                                        </ButtonMenu>
                                    </ViewContainerButtonsMenu>
                                </ViewContainerMenu>
                            )}
                            {cameraOpened && (
                                <ModalContainer>
                                    <ModalContainer>
                                        <RNCamera
                                            ref={camera => { this.camera = camera; }}
                                            style={{ flex: 1 }}
                                            type={RNCamera.Constants.Type.front}
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
                                        <TakePictureButtonContainer onPress={this.handleTakePicture}>
                                            <TakePictureButtonLabel />
                                        </TakePictureButtonContainer>
                                    </ModalContainer>
                                    <ModalButtons>
                                        <CameraButtonContainer onPress={this.handleModalClose}>
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CameraButtonContainer>
                                        <CameraButtonContainer onPress={this.handleCameraModalConfirm}>
                                            <ContinueButtonText>Continuar</ContinueButtonText>
                                        </CameraButtonContainer>
                                    </ModalButtons>
                                </ModalContainer>
                            )}
                            {folderImagesOpened && (
                                <ModalContainer>
                                    <ModalContainer>
                                        <FlatList
                                            numColumns={2}
                                            data={imagesFolder}
                                            keyExtractor={image => image.filename}
                                            renderItem={({ item }) => {
                                                return (
                                                    <ViewImageListItem onPress={() => this.handleSelectPicture(item)}>
                                                        <ImageItem
                                                            source={{ uri: item.uri }}
                                                            resizeMode="stretch"
                                                        />
                                                    </ViewImageListItem>
                                                )
                                            }}
                                            onEndReached={(info) => {
                                                loadGaleryPhotos()
                                            }}
                                        />
                                    </ModalContainer>
                                    <ModalButtons>
                                        <CameraButtonContainer onPress={this.handleModalClose}>
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CameraButtonContainer>
                                    </ModalButtons>
                                </ModalContainer>
                            )}
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