import React, { useState, useEffect, useRef } from 'react'
import { Platform, PermissionsAndroid, BackHandler, Modal, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'
import Moment from 'moment'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import {
    Capa,
    CapaEmpty,
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
    ImageNewStory,
    styles
} from './styles'

import RatingJobs from '../../components/RatingJobs/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import Stories from '../../components/Stories/index'
import CardsServices from '../../components/CardsServices/index'
import ComentariosList from '../../components/ComentariosList'
import Footer from '../../components/Footer/index'
import NewStoryForm from '../../components/NewStoryForm'
import GaleryMyJobs from '../../components/GaleryMyJobs'
import MenuPicture from '../../components/MenuPicture'
import StoriesCarousel from '../../components/StoriesCarousel'

function ProfessionalHomeScreen(props) {
    const [professionalData, setProfessionalData] = useState(props.professionalData ? props.professionalData : props.professionalSelected)
    const [image, setImage] = useState((professionalData.photo && professionalData.photo.length > 0) ? { uri: professionalData.photo + '?v=' + Moment(professionalData.modified).toDate().getTime() } : { uri: '' })
    const [backImage, setBackImage] = useState((professionalData.backImage && professionalData.backImage.length > 0) ? { uri: professionalData.backImage + '?v=' + Moment(professionalData.modified).toDate().getTime() } : { uri: '' })
    const [newStory, setNewStory] = useState('')
    const [newStoryVisible, setNewStoryVisible] = useState(false)
    const [services, setServices] = useState([])
    const [comments, setComments] = useState([])
    const [stories, setStories] = useState([])
    const [modalOpened, setModalOpened] = useState(false)
    const [menuOpened, setMenuOpened] = useState(true)
    const [cameraOpened, setCameraOpened] = useState(false)
    const [folderImagesOpened, setFolderImagesOpened] = useState(false)
    const [storiesCarouselOpened, setStoriesCarouselOpened] = useState(false)
    const [firstImageCarousel, setFirstImageCarousel] = useState('')

    const pageRef = useRef()

    const getProfessionalServices = useGet(`/professionalServices/services/${professionalData.id}.json`, props.token)
    const getProfessionalComments = useGet(`/professionalComments/comments/${professionalData.id}/${props.selectedService.id}.json`, props.token)
    const getStories = useGet(`/stories/viewSingle/${professionalData.id}.json?limit=50&page=1`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        if (props.userType == 'professional') {
            if (props.fcmToken) {
                props.chatUpdateUserFcmToken(props.token, props.user.sub, props.fcmToken)
            }
        }

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (getProfessionalServices.data) {
            if (getProfessionalServices.data.professionalServices) {
                const array = getProfessionalServices.data.professionalServices.map(item => {
                    return {
                        ...item.service,
                        rating: item.rating,
                        amount_ratings: item.amount_ratings
                    }
                })
                setServices(array)
            }
        }
    }, [getProfessionalServices.data])

    useEffect(() => {
        if (services && services.length > 0) {
            props.professionalHomeSetSelectedService(services[0])
        }
        else {
            props.professionalHomeSetSelectedService({ id: 0, title: '' })
        }
    }, [services])

    useEffect(() => {
        if (props.selectedService && props.selectedService.id !== 0) {
            getProfessionalComments.refetch(`/professionalComments/view/${professionalData.id}/${props.selectedService.id}.json`)
        }
    }, [props.selectedService])

    useEffect(() => {
        if (getProfessionalComments.data && getProfessionalComments.data.professionalComments) {
            setComments(getProfessionalComments.data.professionalComments.map(item => {
                return {
                    id: item.id,
                    comment: item.comment,
                    rating: item.rating,
                    amount_ratings: item.amount_ratings,
                    photo: item.client.photo,
                    client_name: item.client.name,
                }
            }))
        }
    }, [getProfessionalComments.data])

    useEffect(() => {
        if (getStories.data && getStories.data.stories) {
            setStories(getStories.data.stories.map(item => item))
        }
    }, [getStories.data])

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth])

    useEffect(() => {
        pageRef.current = storiesCarouselOpened ? 'storiesCarousel' : ''
    }, [storiesCarouselOpened])

    useEffect(() => {
        if (props.professionalData)
            setProfessionalData(props.professionalData)
    }, [props.professionalData])


    useEffect(() => {
        if (props.professionalSelected)
            setProfessionalData(props.professionalSelected)
    }, [props.professionalSelected])

    useEffect(() => {
        setImage((professionalData.photo && professionalData.photo.length > 0) ? { uri: professionalData.photo + '?v=' + Moment(professionalData.modified).toDate().getTime() } : { uri: '' })
        setBackImage((professionalData.backImage && professionalData.backImage.length > 0) ? { uri: professionalData.backImage + '?v=' + Moment(professionalData.modified).toDate().getTime() } : { uri: '' })
    }, [professionalData.modified])

    const handleBackPress = async () => {
        if (pageRef.current === 'storiesCarousel') {
            handleFinishPresentitionCarousel()
            return true
        }

        props.logoutRequest()
        return true
    }

    handleNewStoryClick = () => {
        setNewStory('')
        setNewStoryVisible(false)
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
            const options = { quality: 1, base64: true, forceUpOrientation: true, fixOrientation: true, pauseAfterCapture: true };
            const data = await this.camera.takePictureAsync(options)
            setNewStory(data)
        }
    }

    handleModalClose = () => {
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
        setNewStory('')
        setNewStoryVisible(false)
    }

    handleCameraModalConfirm = () => {
        if (newStory !== '') {
            //finalizar o cadastro da new story
            setNewStoryVisible(true)
        }
    }

    handleShowCamera = () => {
        if (this.camera)
            this.camera.resumePreview()

        setMenuOpened(false)
        setCameraOpened(true)
    }

    handleShowFolder = () => {
        setMenuOpened(false)
        setFolderImagesOpened(true)
    }

    handleSelectPicture = (item) => {
        RNFetchBlob.fs.readFile(item.uri, 'base64')
            .then(data => {
                item = {
                    ...item,
                    base64: data
                }
                setNewStory(item)
                setNewStoryVisible(true)
                setFolderImagesOpened(false)
            })
            .catch(err => {
                setNewStory('')
                setFolderImagesOpened(false)
            })
    }

    handleNewStorySuccess = () => {
        setNewStory('')
        setNewStoryVisible(false)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
        getStories.refetch(`/stories/viewSingle/${professionalData.id}.json?limit=5&page=1`)
    }

    handleOpenCarousel = (imageUri, index) => {
        setFirstImageCarousel({ uri: imageUri, index: index })
        setStoriesCarouselOpened(true)
    }

    handleFinishPresentitionCarousel = () => {
        setStoriesCarouselOpened(false)
        props.storiesRestartSelfPage()
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            {storiesCarouselOpened &&
                <StoriesCarousel
                    firstImage={firstImageCarousel}
                    onFinishPresentation={handleFinishPresentitionCarousel} />}

            {!storiesCarouselOpened &&
                <React.Fragment>
                    {props.professionalData.id && <HeaderJobs title='Home' />}
                    {props.professionalSelected.id && <HeaderJobs title='Profissional' chat={() => props.navigation.navigate('ProfessionalChat')} />}

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1 }} behavior={behavior}>
                            {backImage.uri.length > 0 && <Capa source={{ uri: backImage.uri }} />}
                            {backImage.uri.length <= 0 && <CapaEmpty />}

                            <VwContainerTitle>
                                <VwContainerRating>
                                    <RatingJobs avaliacao={5} qtdeAvaliacoes={130000} />
                                </VwContainerRating>
                                <TxtTitle size={24}>
                                    {professionalData.name}
                                </TxtTitle>
                            </VwContainerTitle>

                            <VwContainerContent>
                                <VwContainerStories>
                                    <TxtTitle size={14}>Stories</TxtTitle>
                                    <Stories
                                        novaImagem={props.professionalData.id ? true : false}
                                        stories={stories}
                                        onPressNewStory={handleNewStoryClick}
                                        onPressStory={(imageUri, index) => handleOpenCarousel(imageUri, index)} />
                                </VwContainerStories>

                                <VwContainerServices>
                                    <TxtTitle size={14}>Serviços</TxtTitle>
                                    <CardsServices services={services} selectedService={props.selectedService.id} loading={getProfessionalServices.loading} />
                                </VwContainerServices>

                                <ContentComentarios>
                                    <TxtTitle size={14}>Comentários do Serviço: {props.selectedService.title}</TxtTitle>
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
                                onRequestClose={handleModalClose}>

                                {menuOpened &&
                                    <MenuPicture
                                        onCameraPress={handleShowCamera}
                                        onGaleryPress={handleShowFolder}
                                        onCancelPress={handleModalClose} />}

                                {(cameraOpened && !newStoryVisible) && (
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
                                            {newStory !== '' && (
                                                <ImageNewStory
                                                    source={{ uri: newStory.uri }}
                                                    resizeMode='center'
                                                />
                                            )}
                                            {newStory === '' && (
                                                <TakePictureButtonContainer onPress={handleTakePicture}>
                                                    <TakePictureButtonLabel />
                                                </TakePictureButtonContainer>
                                            )}
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

                                {newStoryVisible &&
                                    <NewStoryForm
                                        image={newStory}
                                        onSuccess={handleNewStorySuccess} />}

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
                        </View>
                    </ScrollView>
                    <Footer
                        type={props.userType}
                        perfilOnPress={() => props.navigation.navigate('Perfil')}
                        offersOnPress={() => props.navigation.navigate('NewCall')}
                        chatOnPress={() => props.navigation.navigate('ProfessionalListChat')} />
                </React.Fragment>
            }
        </React.Fragment>
    )
}

ProfessionalHomeScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        isAuth: state.auth.isAuth,
        userType: state.auth.userType,
        token: state.auth.token,
        professionalCtr: state.professional,
        professionalData: state.professional.professional,
        professionalSelected: state.professional.selected,
        selectedService: state.professionalHome.selectedService,
        user: state.auth.user,
        fcmToken: state.chat.fcmToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service)),
        storiesRestartSelfPage: () => dispatch(ActionCreators.storiesRestartSelfPage()),
        chatUpdateUserFcmToken: (token, userId, fcmToken) => dispatch(ActionCreators.chatUpdateUserFcmToken(token, userId, fcmToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalHomeScreen)