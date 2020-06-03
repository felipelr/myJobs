import React, { useState, useEffect, useRef } from 'react'
import { Platform, PermissionsAndroid, BackHandler, Modal, ScrollView, View, Alert, Linking } from 'react-native'
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFont from 'react-native-vector-icons/FontAwesome'

import useGetMyJobs from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'
import { useGet, usePost } from '../../services/useRequest'

import {
    styles,
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
    TxtMaisInfo,
    TouchMaisInfo,
    TxtProfessionalDescrption,
    ViewInfo,
    TextInfo,
    TextAddress,
    TxtHabilitarInstagram,
    ViewInstagram,
    TouchInstagram,
    TouchCapa,
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
import { getParameterByName } from '../../components/common/util/functions'
import { saveInstaAcessTokenLong, saveInstaUserID } from '../../components/common/util/localStorage'
import { instagramAppID, instagramAppSecret, instagramRedirectUrl } from '../../config/config'

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
    const [moreInfoVisible, setMoreInfoVisible] = useState(false)
    const [isProfSelected, setProfSelected] = useState(false)
    const [typeImage, setTypeImage] = useState(false)
    const [typeImageHandle, setTypeImageHandle] = useState('')
    const [image, setImage] = useState({ uri: '' })
    const [backImage, setBackImage] = useState({ uri: '' })
    const [requisitou, setRequisitou] = useState(false)

    const pageRef = useRef()
    const cameraRef = useRef()
    const routeRef = useRef()

    const getProfessionalServices = useGetMyJobs('', props.token)
    const getRatings = useGetMyJobs('', props.token)
    const getRate = useGetMyJobs('', props.token)

    const getStories = useGetMyJobs('', props.token)
    const getInstaStoriesSaved = useGetMyJobs('', props.token)
    const getInstaStories = useGet('')

    const postInstaAcessToken = usePost('', {})
    const getInstaAcessTokenLong = useGet('')

    //START - USE EFFECTS SECTION
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        if (props.userType == 'professional') {
            if (props.fcmToken) {
                props.chatUpdateUserFcmToken(props.token, props.user.sub, props.fcmToken)
            }
        }

        Linking.addEventListener('url', handleOpenURL)

        return () => {
            backHandler.remove()
            props.professionalSetProfessionalView({})
            Linking.removeEventListener('url', handleOpenURL)
        }
    }, [])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    useEffect(() => {
        loadProfessionalDataImages(professionalData)
    }, [professionalData.modified])

    useEffect(() => {
        setProfSelected(props.professionalSelected.id ? true : false)
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
        if (props.instaToken.length > 0 && !isProfSelected) {
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
        const arrayFull = storiesMyJobs.concat(storiesInstagram)
        const arrayOrdered = arrayFull.sort((a, b) => a.created.getTime() > b.created.getTime() ? -1 : a.created.getTime() < b.created.getTime() ? 1 : 0)
        setStoriesComplete(arrayOrdered)
    }, [storiesMyJobs, storiesInstagram])

    useEffect(() => {
        setStoriesPage(1)
        setStories(arrayPaginate(storiesComplete, 5, 1))
    }, [storiesComplete])

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
        if (postInstaAcessToken.data && postInstaAcessToken.data.access_token) {
            //resultado com acessToken de curta duracao
            const instaToken = postInstaAcessToken.data.access_token
            const instaUserID = postInstaAcessToken.data.user_id
            console.log('instaAcessToken => ', instaToken)

            //salvar insta user id
            saveInstaUserID(instaUserID).then(saved => {
                if (saved)
                    props.authSetInstaUserId(instaUserID)
            })

            //gerar o token de longa duracao
            const grant = 'ig_exchange_token'
            getInstaAcessTokenLong.refetch(`https://graph.instagram.com/access_token?grant_type=${grant}&client_secret=${instagramAppSecret}&access_token=${instaToken}`)
        }
    }, [postInstaAcessToken.data])

    useEffect(() => {
        if (getInstaAcessTokenLong.data && getInstaAcessTokenLong.data.access_token) {
            //resultado com acessToken de longa duracao
            const instaLongToken = getInstaAcessTokenLong.data.access_token
            console.log('newInstaAcessTokenLong => ', instaLongToken)

            //salvar o token de longa duracao
            saveInstaAcessTokenLong(instaLongToken).then((saved) => {
                if (saved) {
                    props.authSetInstaTokenLong(instaLongToken)
                }
            })
        }
    }, [getInstaAcessTokenLong.data])

    useEffect(() => {
        if (props.servicesUpdated) {
            if (isProfSelected) {
                getProfessionalServices.refetch(`/professionalServices/services/${props.professionalSelected.id}.json`)
            }
            else {
                getProfessionalServices.refetch(`/professionalServices/services/${props.professionalData.id}.json`)
            }
        }
    }, [props.servicesUpdated])

    useEffect(() => {
        if (props.ratingUpdated) {
            props.professionalSetRatingUpdated(false)
            if (isProfSelected) {
                getRate.refetch(`/ratings/professional/${props.professionalSelected.id}.json`)
                getProfessionalServices.refetch(`/professionalServices/services/${props.professionalSelected.id}.json`)
            }
            else {
                getRate.refetch(`/ratings/professional/${props.professionalData.id}.json`)
                getProfessionalServices.refetch(`/professionalServices/services/${props.professionalData.id}.json`)
            }
        }
    }, [props.ratingUpdated])

    useEffect(() => {
        if (requisitou && !props.professionalCtr.isUpdating) {
            if (props.professionalCtr.errorUpdating) {
                setRequisitou(false)
                //erro
            }
            else {
                //atualizar foto na screen
                if (typeImage === 'backImage') {
                    setImages({
                        ...images,
                        backImage: backImage,
                    })
                }
                else {
                    setImages({
                        ...images,
                        image: image,
                    })
                }
            }
        }
    }, [props.professionalCtr.isUpdating])
    //END - USE EFFECTS SECTION

    //START - FUNCTIONS SECTION
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

        if (isProfSelected) {
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
                props.professionalSetProfessionalView({})
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
        setTypeImageHandle('stories')
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

    const handleNewStorySuccess = () => {
        setNewStory('')
        setNewStoryVisible(false)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
        setModalOpened(false)
        getStories.refetch(`/stories/viewSingle/${professionalData.id}.json?limit=50&page=1`)
        if (props.instaToken.length > 0 && !isProfSelected) {
            props.storiesSetInstagramData([])
            setTimeout(() => {
                getInstaStories.refetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&access_token=${props.instaToken}`)
            }, 1000)
        }
    }

    const handleShowMenu = () => {
        setModalOpened(true)
        setMenuOpened(true)
        setCameraOpened(false)
        setFolderImagesOpened(false)
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

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true, forceUpOrientation: true, fixOrientation: true, pauseAfterCapture: true };
            const data = await cameraRef.current.takePictureAsync(options)

            if (typeImageHandle === 'stories') {
                setNewStory(data)
            }
            else if (typeImageHandle === 'perfil') {
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
    }

    const handleSelectPicture = (item) => {
        if (typeImageHandle === 'stories') {
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
        else if (typeImageHandle === 'perfil') {
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

                            //salvar imagem
                            let professionalData_ = {
                                ...professionalData,
                                image: typeImage === 'photo' ? data : '',
                                imageBackground: typeImage === 'backImage' ? data : ''
                            }
                            setRequisitou(true)
                            props.professionalUpdateRequest(professionalData_, props.token)
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
    }

    const handleOpenCarousel = (item) => {
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
        props.professionalSetProfessionalView({})

        props.navigation.navigate(view, {
            previewScreen: props.route.name
        })
    }

    const toggleOverlay = () => {
        setMoreInfoVisible(!moreInfoVisible)
    }

    const handleClickInstagram = () => {
        console.log('handleClickInstagram')
        const scope = 'user_profile,user_media'
        const state = props.user.sub
        const url = `https://www.instagram.com/oauth/authorize?client_id=${instagramAppID}&redirect_uri=${instagramRedirectUrl}&scope=${scope}&response_type=code&state=${state}`
        Linking.openURL(url).then(result => {
            console.log('openURL', result)
        }).catch(err => {
            console.error('An error occurred', err)
        });
    }

    const handleOpenURL = (event) => {
        console.log('handleOpenURL => ', event)
        if (event != null) {
            if (event.url) {
                const url = event.url.replace("#_", "")
                const code = getParameterByName('code', url)
                const userid = getParameterByName('state', url)

                console.log('code => ', code)
                console.log('userid => ', userid)

                if (code && code.length) {
                    //autorizado
                    const data = {
                        client_id: instagramAppID,
                        client_secret: instagramAppSecret,
                        code: code,
                        grant_type: 'authorization_code',
                        redirect_uri: instagramRedirectUrl,
                    }

                    postInstaAcessToken.refetch('https://api.instagram.com/oauth/access_token', data)
                }
            }
        }
    }

    const handleAvatarClick = (type) => {
        setTypeImage(type)
        setTypeImageHandle('perfil')
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
    //END - FUNCTIONS SECTION

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
                    {!isProfSelected && <HeaderJobs title='Home' />}
                    {isProfSelected &&
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
                            <TouchCapa onPress={() => handleAvatarClick('backImage')}>
                                {images.backImage.uri.length > 0 && <Capa source={{ uri: images.backImage.uri }} />}
                                {images.backImage.uri.length <= 0 && <CapaEmpty />}
                            </TouchCapa>

                            <VwContainerTitle>
                                <VwContainerRating>
                                    <RatingJobs avaliacao={professionalRate.avg} qtdeAvaliacoes={professionalRate.count} />
                                </VwContainerRating>
                                <TxtTitle size={24}>
                                    {professionalData.name}
                                </TxtTitle>
                            </VwContainerTitle>
                            <TouchMaisInfo onPress={toggleOverlay}>
                                <TxtMaisInfo>Mais informações</TxtMaisInfo>
                            </TouchMaisInfo>

                            <VwContainerContent>
                                <VwContainerStories>
                                    {
                                        (!isProfSelected && props.instaToken.length === 0) &&
                                        <TouchInstagram onPress={handleClickInstagram}>
                                            <ViewInstagram>
                                                <IconFont name="instagram" size={25} color={white} style={{ padding: 5 }} />
                                                <TxtHabilitarInstagram>Habilitar feed do Instagram</TxtHabilitarInstagram>
                                            </ViewInstagram>
                                        </TouchInstagram>
                                    }

                                    <TxtTitle size={14}>Stories</TxtTitle>
                                    <Stories
                                        loading={getStories.loading || getInstaStoriesSaved.loading || getInstaStories.loading}
                                        novaImagem={!isProfSelected}
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
                                        source={{ uri: images.image.uri }}
                                        onPress={() => handleAvatarClick('photo')} />
                                }

                                {(images && images.image.uri.length <= 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        icon={{ name: 'image' }}
                                        onPress={() => handleAvatarClick('photo')} />
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

                            <Overlay isVisible={moreInfoVisible} onBackdropPress={toggleOverlay} overlayStyle={{ height: 'auto' }}>
                                <React.Fragment>
                                    <ViewInfo>
                                        <Avatar
                                            containerStyle={{ alignSelf: 'center' }}
                                            size={50}
                                            source={{ uri: professionalData.photo, }}
                                            rounded={true}
                                        />
                                        <TextInfo>{professionalData.name}</TextInfo>
                                    </ViewInfo>
                                    <TxtProfessionalDescrption>{professionalData.description}</TxtProfessionalDescrption>
                                    {professionalData.professionalsAddresses &&
                                        <React.Fragment>
                                            <TextAddress>Endereço</TextAddress>
                                            <TxtProfessionalDescrption>
                                                {professionalData.professionalsAddresses.map(address => `${address.street}, ${address.street_number} - ${address.neighborhood} - ${address.city.name}/${address.city.state.initials} \n\n`)}
                                            </TxtProfessionalDescrption>
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            </Overlay>
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
                        professionalProfileOnPress={() => props.professionalSetProfessionalView({})}
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
        professionalSelected: state.professional.professionalView,
        selectedService: state.professionalHome.selectedService,
        user: state.auth.user,
        fcmToken: state.chat.fcmToken,
        instaToken: state.auth.instaTokenLong,
        instaUserID: state.auth.instaUserID,
        storiesInstagram: state.stories.storiesInstagram,
        servicesUpdated: state.professional.servicesUpdated,
        ratingUpdated: state.professional.ratingUpdated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service)),
        chatUpdateUserFcmToken: (token, userId, fcmToken) => dispatch(ActionCreators.chatUpdateUserFcmToken(token, userId, fcmToken)),
        professionalSetProfessionalView: (professional) => dispatch(ActionCreators.professionalSetProfessionalView(professional)),
        clientSelectedRequest: (client) => dispatch(ActionCreators.clientSelected(client)),
        storiesSetFinishPresentation: (finish) => dispatch(ActionCreators.storiesSetFinishPresentation(finish)),
        storiesSaveIntragramData: (finish) => dispatch(ActionCreators.storiesSaveIntragramData(finish)),
        authSetInstaTokenLong: (token) => dispatch(ActionCreators.authSetInstaTokenLong(token)),
        storiesSetInstagramData: (stories) => dispatch(ActionCreators.storiesSetInstagramData(stories)),
        authSetInstaUserId: (id) => dispatch(ActionCreators.authSetInstaUserId(id)),
        professionalSetRatingUpdated: (updated) => dispatch(ActionCreators.professionalSetRatingUpdated(updated)),
        professionalUpdateRequest: (professional, token) => dispatch(ActionCreators.professionalUpdateRequest(professional, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalHomeScreen)