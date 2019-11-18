import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform, PermissionsAndroid, BackHandler, Modal, ScrollView, View, FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import CameraRoll from "@react-native-community/cameraroll"
import RNFetchBlob from 'rn-fetch-blob'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import assets from '../../screens/ProfessionalHomeScreen/assets'

import {
    Capa,
    VwContainerTitle,
    TxtTitle,
    VwContainerRating,
    VwContainerContent,
    VwContainerServices,
    VwContainerStories,
    ContainerAvatar,
    ContentComentarios,
    ModalContainer,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    ViewContainerMenu,
    ViewContainerButtonsMenu,
    ButtonMenu,
    ButtonMenuText,
    ViewImageListItem,
    ImageItem,
    ViewContainerMenuOpacity,
    ImageNewStory,
    styles
} from './styles'

import RatingJobs from '../../components/RatingJobs/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import Stories from '../../components/Stories/index'
import CardsServices from '../../components/CardsServices/index'
import ComentariosList from '../../components/ComentariosList'
import Footer from '../../components/Footer/index'

function ProfessionalHomeScreen(props) {
    const [image, setImage] = useState((props.professionalData.photo && props.professionalData.photo.length > 0) ? { uri: props.professionalData.photo + '?v=' + new Date().getTime() } : { uri: '' })
    const [newStory, setNewStory] = useState('')
    const [services, setServices] = useState([])
    const [comments, setComments] = useState([])
    const [stories, setStories] = useState([])
    const [modalOpened, setModalOpened] = useState(false)
    const [menuOpened, setMenuOpened] = useState(true)
    const [cameraOpened, setCameraOpened] = useState(false)
    const [folderImagesOpened, setFolderImagesOpened] = useState(false)
    const [imagesFolder, setImagesFolder] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [endCursor, setEndCursor] = useState('')
    const [storyTempVisible, setStoryTempVisible] = useState(false)

    const getProfessionalServices = useGet(`/professionalServices/view/${props.professionalData.id}.json`, props.token)
    const getProfessionalComments = useGet(`/professionalComments/view/${props.professionalData.id}/${props.selectedService.id}.json`, props.token)
    const getStories = useGet(`/stories/view/${props.professionalData.id}.json`, props.token)

    useEffect(() => {
        if (this != null)
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            if (this != null)
                this.backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (getProfessionalServices.data && getProfessionalServices.data.professionalServices) {
            setServices(getProfessionalServices.data.professionalServices.map(item => {
                return {
                    ...item.service,
                    rating: item.rating,
                    amount_ratings: item.amount_ratings
                }
            }))
            if (services && services.length > 0) {
                props.professionalHomeSetSelectedService(services[0])
            }
        }
    }, [getProfessionalServices.loading])

    useEffect(() => {
        if (props.selectedService.id !== 0) {
            getProfessionalComments.refetch(`/professionalComments/view/${props.professionalData.id}/${props.selectedService.id}.json`)
        }
    }, [props.selectedService.id])

    useEffect(() => {
        if (getProfessionalComments.data && getProfessionalComments.data.professionalComments) {
            setComments(getProfessionalComments.data.professionalComments.map(item => {
                return {
                    comment: item.comment,
                    rating: item.rating,
                    amount_ratings: item.amount_ratings,
                    photo: item.client.photo,
                    client_name: item.client.name,
                }
            }))
        }
    }, [getProfessionalComments.loading])

    useEffect(() => {
        if (getStories.data && getStories.data.stories) {
            setStories(getStories.data.stories.map(item => item))
        }
    }, [getStories.loading])

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth])

    const handleBackPress = async () => {
        if (storyTempVisible)
            setStoryTempVisible(false)
        else
            props.logoutRequest()
        return true
    }

    handleNewStoryClick = () => {
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

    handleShowMenu = () => {
        setModalOpened(true)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
    }

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
            const data = await this.camera.takePictureAsync(options)
            setNewStory(data)
            setStoryTempVisible(true)
        }
    }

    handleModalClose = () => {
        setNewStory('')
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
        setStoryTempVisible(false)
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

    handleSelectPicture = (item) => {
        RNFetchBlob.fs.readFile(item.uri, 'base64')
            .then(data => {
                item = {
                    ...item,
                    base64: data
                }
                setNewStory(item)
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

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <HeaderJobs />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }} behavior={behavior}>
                    <Capa imagem={assets.capa} />
                    <VwContainerTitle>
                        <VwContainerRating>
                            <RatingJobs avaliacao={5} qtdeAvaliacoes={130000} />
                        </VwContainerRating>
                        <TxtTitle size={24}>
                            {props.professionalData.name}
                        </TxtTitle>
                    </VwContainerTitle>
                    <VwContainerContent>
                        <VwContainerStories>
                            <TxtTitle size={14}>
                                Stories
                            </TxtTitle>
                            <Stories novaImagem stories={stories} onPressNewStory={handleNewStoryClick} />
                        </VwContainerStories>
                        <VwContainerServices>
                            <TxtTitle size={14}>
                                Serviços
                            </TxtTitle>
                            <CardsServices services={services} selectedService={props.selectedService.id} loading={getProfessionalServices.loading} />
                        </VwContainerServices>
                        <ContentComentarios>
                            <TxtTitle size={14}>
                                Comentários do Serviço: {props.selectedService.title}
                            </TxtTitle>
                            <ComentariosList comments={comments} loading={getProfessionalComments.loading} />
                        </ContentComentarios>
                    </VwContainerContent>
                    <ContainerAvatar>
                        {image.uri.length > 0 &&
                            <Avatar
                                rounded
                                containerStyle={styles}
                                source={{ uri: image.uri }}
                                size={120} />}

                        {image.uri.length <= 0 &&
                            <Avatar
                                rounded
                                containerStyle={styles}
                                size={120} />}
                    </ContainerAvatar>
                    <Modal
                        visible={modalOpened}
                        transparent={menuOpened}
                        animationType="fade"
                        onRequestClose={handleModalClose}
                    >
                        {menuOpened && (
                            <ViewContainerMenu>
                                <ViewContainerMenuOpacity />
                                <ViewContainerButtonsMenu>
                                    <ButtonMenu onPress={handleShowCamera}>
                                        <ButtonMenuText>Tirar Foto</ButtonMenuText>
                                    </ButtonMenu>
                                    <ButtonMenu onPress={handleShowFolder}>
                                        <ButtonMenuText>Galeria</ButtonMenuText>
                                    </ButtonMenu>
                                    <ButtonMenu onPress={handleModalClose}>
                                        <ButtonMenuText>Cancelar</ButtonMenuText>
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
                                    {storyTempVisible && (
                                        <React.Fragment>
                                            <ImageNewStory
                                                source={{ uri: newStory.uri }}
                                                resizeMode="cover"
                                            />
                                        </React.Fragment>
                                    )}
                                    {!storyTempVisible && (
                                        <React.Fragment>
                                            <TakePictureButtonContainer onPress={handleTakePicture}>
                                                <TakePictureButtonLabel />
                                            </TakePictureButtonContainer>
                                        </React.Fragment>
                                    )}
                                </ModalContainer>
                                {!storyTempVisible &&
                                    <ModalButtons>
                                        <CameraButtonContainer onPress={handleModalClose}>
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CameraButtonContainer>
                                        <CameraButtonContainer onPress={handleCameraModalConfirm}>
                                            <ContinueButtonText>Continuar</ContinueButtonText>
                                        </CameraButtonContainer>
                                    </ModalButtons>
                                }

                            </ModalContainer>
                        )}
                        {folderImagesOpened && (
                            <ModalContainer>
                                <ModalContainer>
                                    <FlatList
                                        numColumns={3}
                                        data={imagesFolder}
                                        keyExtractor={image => image.filename}
                                        renderItem={({ item }) => {
                                            return (
                                                <ViewImageListItem onPress={() => handleSelectPicture(item)}>
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
                                    <CameraButtonContainer onPress={handleModalClose}>
                                        <CancelButtonText>Cancelar</CancelButtonText>
                                    </CameraButtonContainer>
                                </ModalButtons>
                            </ModalContainer>
                        )}
                    </Modal>
                </View>
            </ScrollView>
            <Footer perfilOnPress={() => props.navigation.navigate('Perfil')} />
        </React.Fragment>
    )
}

ProfessionalHomeScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        professionalCtr: state.professional,
        professionalData: state.professional.professional,
        selectedService: state.professionalHome.selectedService,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalHomeScreen)