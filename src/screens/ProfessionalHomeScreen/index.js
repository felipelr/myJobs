import React, { useState, useEffect, useRef } from 'react'
import { Platform, PermissionsAndroid, BackHandler, Modal, ScrollView, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'
import Moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useGetMyJobs from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'
import { useGet } from '../../services/useRequest'

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
    FlipCameraButtonContainer,
    styles
} from './styles'

import { white } from '../../components/common/util/colors'

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

import { heightPercentageToDP } from '../../components/common/util/dimensions'

function ProfessionalHomeScreen(props) {
    const [professionalData, setProfessionalData] = useState(props.professionalSelected.id ? props.professionalSelected : props.professionalData)
    const [images, setImages] = useState({
        image: { uri: '' },
        backImage: { uri: '' },
    })
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
    const [cameraType, setCameraType] = useState('front')
    const [professionalRate, setProfessionalRate] = useState({ avg: 0, count: 0 })
    const [storiesMyJobs, setStoriesMyJobs] = useState([])
    const [storiesInstagram, setStoriesInstagram] = useState([])
    const [storiesPage, setStoriesPage] = useState(1)
    const [storiesComplete, setStoriesComplete] = useState([])

    const pageRef = useRef()
    const cameraRef = useRef()
    const routeRef = useRef()

    const getProfessionalServices = useGetMyJobs('', props.token)
    const getRatings = useGetMyJobs('', props.token)
    const getRate = useGetMyJobs('', props.token)

    const getStories = useGetMyJobs('', props.token)
    const getInstaStoriesSaved = useGetMyJobs('', props.token)
    const getInstaStories = useGet('')

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        if (props.userType == 'professional') {
            if (props.fcmToken) {
                props.chatUpdateUserFcmToken(props.token, props.user.sub, props.fcmToken)
            }
        }

        return () => {
            backHandler.remove()
            props.professionalSelectedRequest({})
        }
    }, [])

    useEffect(() => {
        loadProfessionalDataImages(professionalData)
    }, [professionalData.modified])

    useEffect(() => {
        if (props.professionalSelected.id) {
            setProfessionalData(props.professionalSelected)
            loadInfoProfessional(props.professionalSelected)
        }
        else {
            setProfessionalData(props.professionalData)
            loadInfoProfessional(props.professionalData)
        }
    }, [props.professionalSelected])

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
            getRatings.refetch(`/ratings/comments/${professionalData.id}/${props.selectedService.id}.json`)
        }
    }, [props.selectedService])

    useEffect(() => {
        if (getRatings.data && getRatings.data.comments) {
            setComments(getRatings.data.comments.map(item => {
                return {
                    id: item.id,
                    comment: item.description,
                    rating: item.rate,
                    amount_ratings: 0,
                    photo: item.client.photo,
                    client_name: item.client.name,
                }
            }))
        }
    }, [getRatings.data])

    useEffect(() => {
        if (!props.isAuth) {
            props.navigation.navigate('Login', {
                previewScreen: props.route.name,
            })
        }
    }, [props.isAuth])

    useEffect(() => {
        pageRef.current = storiesCarouselOpened ? 'storiesCarousel' : ''
    }, [storiesCarouselOpened])

    useEffect(() => {
        if (getRate.data && getRate.data.rate) {
            console.log('rate => ', getRate.data.rate)
            setProfessionalRate(getRate.data.rate)
        }
    }, [getRate.data])

    useEffect(() => {
        if (props.instaToken.length > 0 && !props.professionalSelected.id) {
            getInstaStories.refetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&access_token=${props.instaToken}`)
        }
    }, [props.instaToken])

    useEffect(() => {
        if (getStories.data && getStories.data.stories) {
            const arrayMyjobs = getStories.data.stories.map(item => {
                return {
                    ...item,
                    created: new Date(item.created),
                }
            })
            setStoriesMyJobs(arrayMyjobs)
        }
    }, [getStories.data])

    useEffect(() => {
        if (getInstaStories.data && getInstaStories.data.data) {
            console.log('getInstaStories =======================')

            if (props.storiesInstagram && props.storiesInstagram.length === 0) {
                //salvar dados do instagram
                props.storiesSaveIntragramData({
                    professional_id: professionalData.id,
                    json: getInstaStories.data.data,
                })

                props.storiesSetInstagramData(getInstaStories.data.data)
            }
        }
        else {
            console.log('getInstaStories NO DATA =======================')
        }
    }, [getInstaStories.data])

    useEffect(() => {
        if (getInstaStoriesSaved.data
            && getInstaStoriesSaved.data.story
            && getInstaStoriesSaved.data.story.json) {
            console.log('getInstaStoriesSaved =======================')

            let arrayInsta = getInstaStoriesSaved.data.story.json.map(item => {
                return {
                    id: item.id,
                    photo: item.media_url,
                    description: item.caption,
                    created: new Date(item.timestamp),
                    media_type: item.media_type,
                }
            })
            arrayInsta = arrayInsta.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
            setStoriesInstagram(arrayInsta)
        }
    }, [getInstaStoriesSaved.data])

    useEffect(() => {
        if (props.storiesInstagram && props.storiesInstagram.length > 0) {
            console.log('props.storiesInstagram =======================')

            let arrayInsta = props.storiesInstagram.map(item => {
                return {
                    id: item.id,
                    photo: item.media_url,
                    description: item.caption,
                    created: new Date(item.timestamp.substr(0, 19)),
                    media_type: item.media_type,
                }
            })
            arrayInsta = arrayInsta.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
            setStoriesInstagram(arrayInsta)
        }
        else {
            console.log('props.storiesInstagram NO DATA =======================')
        }
    }, [props.storiesInstagram])

    useEffect(() => {
        const arrayFull = storiesMyJobs.concat(storiesInstagram)
        const arrayOrdered = arrayFull.sort((a, b) => a.created.getTime() > b.created.getTime() ? -1 : a.created.getTime() < b.created.getTime() ? 1 : 0)
        setStoriesComplete(arrayOrdered)
    }, [storiesMyJobs, storiesInstagram])

    useEffect(() => {
        setStoriesPage(1)
        setStories(arrayPaginate(storiesComplete, 5, 1))
    }, [storiesComplete])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    const loadInfoProfessional = (item) => {
        console.log('loadInfoProfessional => ==========================')

        setStoriesPage(1)
        setStories([])
        setStoriesInstagram([])
        setStoriesMyJobs([])
        loadProfessionalDataImages(item)

        getProfessionalServices.refetch(`/professionalServices/services/${item.id}.json`)
        getRate.refetch(`/ratings/professional/${item.id}.json`)

        getStories.refetch(`/stories/viewSingle/${item.id}.json?limit=50&page=1`)

        if (props.professionalSelected.id) {
            getInstaStoriesSaved.refetch(`/instagram/view/${props.professionalSelected.id}.json`)
        }
        else {
            //reload instagram stories
            if (props.storiesInstagram && props.storiesInstagram.length > 0) {
                let arrayInsta = props.storiesInstagram.map(item => {
                    return {
                        id: item.id,
                        photo: item.media_url,
                        description: item.caption,
                        created: new Date(item.timestamp.substr(0, 19)),
                        media_type: item.media_type,
                    }
                })
                arrayInsta = arrayInsta.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
                setStoriesInstagram(arrayInsta)
            }
        }
    }

    const loadProfessionalDataImages = (item) => {
        let img = { uri: '' }
        let bck = { uri: '' }

        if (item.photo && item.photo != null) {
            img = { uri: item.photo }
        }
        if (item.backImage && item.backImage != null) {
            bck = { uri: item.backImage }
        }

        setImages({
            image: img,
            backImage: bck,
        })
    }

    const arrayPaginate = (array, pageSize, pageNumber) => {
        const start = (pageNumber - 1) * pageSize
        const end = pageNumber * pageSize
        return array.slice(start, end)
    }

    const handleBackPress = async () => {
        if (pageRef.current === 'storiesCarousel') {
            handleFinishPresentitionCarousel()
            return true
        }

        if (routeRef.current.params && routeRef.current.params.previewScreen) {
            let clearProfessional = true
            let canGoBack = true
            let viewProfile = false
            try {
                if (routeRef.current.params && routeRef.current.params.previewScreen === 'ProfessionalChat')
                    clearProfessional = false

                if (routeRef.current.params && routeRef.current.params.previewScreen === 'Splash')
                    canGoBack = false

                if (routeRef.current.params && routeRef.current.params.viewProfile)
                    viewProfile = true
            } catch (ex) {
                console.log(ex)
            }

            if (!viewProfile)
                canGoBack = false

            if (clearProfessional && canGoBack) {
                setServices([])
                setComments([])
                setStories([])
                props.professionalSelectedRequest({})
            }

            if (canGoBack) {
                props.navigation.navigate(routeRef.current.params.previewScreen, {
                    previewScreen: props.route.name,
                })
            }
            else {
                Alert.alert(
                    "Atenção",
                    "Deseja sair do aplicativo?",
                    [
                        {
                            text: "NÃO",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "SIM", onPress: () => props.logoutRequest() }
                    ],
                    { cancelable: false }
                );
            }
        }
        else {
            Alert.alert(
                "Atenção",
                "Deseja sair do aplicativo?",
                [
                    {
                        text: "NÃO",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "SIM", onPress: () => props.logoutRequest() }
                ],
                { cancelable: false }
            );
        }

        return true
    }

    const handleNewStoryClick = () => {
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

    const handleShowMenu = () => {
        setModalOpened(true)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
    }

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true, forceUpOrientation: true, fixOrientation: true, pauseAfterCapture: true };
            const data = await cameraRef.current.takePictureAsync(options)
            setNewStory(data)
        }
    }

    const handleModalClose = () => {
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
        setNewStory('')
        setNewStoryVisible(false)
    }

    const handleCameraModalConfirm = () => {
        if (newStory !== '') {
            //finalizar o cadastro da new story
            setNewStoryVisible(true)
        }
    }

    const handleShowCamera = () => {
        if (cameraRef.current)
            cameraRef.current.resumePreview()

        setMenuOpened(false)
        setCameraOpened(true)
    }

    const handleShowFolder = () => {
        setMenuOpened(false)
        setFolderImagesOpened(true)
    }

    const handleSelectPicture = (item) => {
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

    const handleNewStorySuccess = () => {
        setNewStory('')
        setNewStoryVisible(false)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
        getStories.refetch(`/stories/viewSingle/${professionalData.id}.json?limit=50&page=1`)
        if (props.instaToken.length > 0 && !props.professionalSelected.id) {
            props.storiesSetInstagramData([])
            getInstaStories.refetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&access_token=${props.instaToken}`)
        }
    }

    const handleOpenCarousel = (item) => {
        console.log('onPressStory => ', item)
        setFirstImageCarousel(item)
        setStoriesCarouselOpened(true)
        props.storiesSetFinishPresentation(false)
    }

    const handleFinishPresentitionCarousel = () => {
        setStoriesCarouselOpened(false)
        props.storiesSetFinishPresentation(true)
    }

    const handleFlipCamera = () => {
        setCameraType(cameraType === 'front' ? 'back' : 'front')
    }

    const handleCloseToEndStories = () => {
        const newPage = storiesPage + 1
        setStoriesPage(newPage)
        const arrayStories = stories.concat(arrayPaginate(storiesComplete, 5, newPage))
        setStories(arrayStories)
    }

    const handleFooterPress = (view) => {
        setServices([])
        setComments([])
        setStories([])
        props.professionalSelectedRequest({})

        props.navigation.navigate(view, {
            previewScreen: props.route.name
        })
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            {storiesCarouselOpened &&
                <StoriesCarousel
                    firstItem={firstImageCarousel}
                    onFinishPresentation={handleFinishPresentitionCarousel}
                    storiesMyJobs={storiesMyJobs}
                    storiesInstagram={storiesInstagram}
                    professional={professionalData} />
            }

            {!storiesCarouselOpened &&
                <React.Fragment>
                    {!props.professionalSelected.id && <HeaderJobs title='Home' />}
                    {props.professionalSelected.id &&
                        <HeaderJobs title='Profissional'
                            professional={professionalData}
                            chat={() => {
                                props.clientSelectedRequest({})
                                props.navigation.navigate('ProfessionalChat', {
                                    previewScreen: props.route.name,
                                })
                            }} />}

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1 }} behavior={behavior}>
                            {images.backImage.uri.length > 0 && <Capa source={{ uri: images.backImage.uri }} />}
                            {images.backImage.uri.length <= 0 && <CapaEmpty />}

                            <VwContainerTitle>
                                <VwContainerRating>
                                    <RatingJobs avaliacao={professionalRate.avg} qtdeAvaliacoes={professionalRate.count} />
                                </VwContainerRating>
                                <TxtTitle size={24}>
                                    {professionalData.name}
                                </TxtTitle>
                            </VwContainerTitle>

                            <VwContainerContent>
                                <VwContainerStories>
                                    <TxtTitle size={14}>Stories</TxtTitle>
                                    <Stories
                                        loading={getStories.loading || getInstaStoriesSaved.loading || getInstaStories.loading}
                                        novaImagem={props.professionalSelected.id ? false : true}
                                        stories={stories}
                                        onPressNewStory={handleNewStoryClick}
                                        onPressStory={item => handleOpenCarousel(item)}
                                        onCloseToEnd={() => handleCloseToEndStories()} />
                                </VwContainerStories>

                                <VwContainerServices>
                                    <TxtTitle size={14}>Serviços</TxtTitle>
                                    <CardsServices services={services} loading={getProfessionalServices.loading} />
                                </VwContainerServices>

                                <ContentComentarios>
                                    <TxtTitle size={14}>Comentários do Serviço: {props.selectedService.title}</TxtTitle>
                                    <ComentariosList comments={comments} loading={getRatings.loading} />
                                </ContentComentarios>
                            </VwContainerContent>

                            <ContainerAvatar>
                                {(images && images.image.uri.length > 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        source={{ uri: images.image.uri }} />
                                }

                                {(images && images.image.uri.length <= 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        icon={{ name: 'image' }} />
                                }
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
                                            {newStory !== '' && (
                                                <ImageNewStory
                                                    source={{ uri: newStory.uri }}
                                                    resizeMode='center'
                                                />
                                            )}
                                            {newStory === '' && (
                                                <React.Fragment>
                                                    <TakePictureButtonContainer onPress={handleTakePicture}>
                                                        <TakePictureButtonLabel />
                                                    </TakePictureButtonContainer>
                                                    <FlipCameraButtonContainer onPress={handleFlipCamera}>
                                                        <Icon name="switch-camera" size={40} color={white} />
                                                    </FlipCameraButtonContainer>
                                                </React.Fragment>
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
                        selected={'professional-profile'}
                        professionalSelected={props.professionalSelected}
                        homeOnPress={() => handleFooterPress('CategoriesSearch')}
                        callsOnPress={() => handleFooterPress('CallsList')}
                        chatOnPress={() => handleFooterPress('ChatList')}
                        perfilOnPress={() => handleFooterPress('Perfil')}
                        professionalProfileOnPress={() => props.professionalSelectedRequest({})}
                    />
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
        instaToken: state.auth.instaTokenLong,
        instaUserID: state.auth.instaUserID,
        storiesInstagram: state.stories.storiesInstagram,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service)),
        chatUpdateUserFcmToken: (token, userId, fcmToken) => dispatch(ActionCreators.chatUpdateUserFcmToken(token, userId, fcmToken)),
        professionalSelectedRequest: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        clientSelectedRequest: (client) => dispatch(ActionCreators.clientSelected(client)),
        storiesSetFinishPresentation: (finish) => dispatch(ActionCreators.storiesSetFinishPresentation(finish)),
        storiesSaveIntragramData: (finish) => dispatch(ActionCreators.storiesSaveIntragramData(finish)),
        authSetInstaTokenLong: (token) => dispatch(ActionCreators.authSetInstaTokenLong(token)),
        storiesSetInstagramData: (stories) => dispatch(ActionCreators.storiesSetInstagramData(stories)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalHomeScreen)