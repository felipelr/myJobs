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
import { RectButton } from 'react-native-gesture-handler'

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
    TouchCapa,
    ViewIcon,
    TouchConfigServices,
    TxtConfigServices,
} from './styles'

import { white, lightgray, purple } from '../../components/common/util/colors'

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
    const [professionalData, setProfessionalData] = useState(props.professionalData)
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
    const [typeImage, setTypeImage] = useState(false)
    const [typeImageHandle, setTypeImageHandle] = useState('')
    const [image, setImage] = useState({ uri: '' })
    const [backImage, setBackImage] = useState({ uri: '' })
    const [requisitou, setRequisitou] = useState(false)

    const pageRef = useRef()
    const cameraRef = useRef()

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
            Linking.removeEventListener('url', handleOpenURL)
        }
    }, [])

    useEffect(() => {
        setProfessionalData(props.professionalData)
        loadInfoProfessional(props.professionalData)
    }, [props.professionalData])

    useEffect(() => {
        loadProfessionalDataImages(professionalData)
    }, [professionalData.modified])

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
            loadProfessionalComments(professionalData, props.selectedService)
        }
        else {
            setComments([])
        }
    }, [props.selectedService])

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
        if (props.instaToken.length > 0) {
            loadProfessionalInstaStories()
        }
    }, [props.instaToken])

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
        reloadProfessionalInstaStories()
    }, [props.storiesInstagram])

    useEffect(() => {
        if (props.servicesUpdated) {
            loadProfessionalServices(props.professionalData)
        }
    }, [props.servicesUpdated])

    useEffect(() => {
        if (props.ratingUpdated) {
            props.professionalSetRatingUpdated(false)
            loadProfessionalRate(props.professionalData)
            loadProfessionalServices(props.professionalData)
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
    const loadInfoProfessional = async (item) => {
        setStoriesPage(1)
        setStories([])
        setStoriesInstagram([])
        setStoriesMyJobs([])
        loadProfessionalDataImages(item)

        await loadProfessionalServices(item)
        await loadProfessionalRate(item)
        await loadProfessionalStories(item)
        await reloadProfessionalInstaStories()
    }

    const loadProfessionalServices = async (professional) => {
        if (professional && professional.id) {
            const data = await getProfessionalServices.refetch(`/professionalServices/services/${professional.id}.json`)
            if (data && data.professionalServices) {
                const array = data.professionalServices.map(item => {
                    return {
                        ...item.service,
                        rating: item.rating,
                        amount_ratings: item.amount_ratings
                    }
                })
                setServices(array)
            }
            else {
                setServices([])
            }
        }
    }

    const loadProfessionalRate = async (professional) => {
        if (professional && professional.id) {
            const data = await getRate.refetch(`/ratings/professional/${professional.id}.json`)
            if (data && data.rate) {
                console.log('rate => ', data.rate)
                setProfessionalRate(data.rate)
            }
            else {
                setProfessionalRate({ avg: 0, count: 0 })
            }
        }
    }

    const loadProfessionalStories = async (professional) => {
        if (professional && professional.id) {
            const data = await getStories.refetch(`/stories/viewSingle/${professional.id}.json?limit=50&page=1`)
            if (data && data.stories) {
                const arrayMyjobs = data.stories.map(item => {
                    return {
                        ...item,
                        created: new Date(item.created),
                    }
                })
                setStoriesMyJobs(arrayMyjobs)
            }
            else {
                setStoriesMyJobs([])
            }
        }
    }

    const loadProfessionalInstaStories = async () => {
        const data = await getInstaStories.refetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&access_token=${props.instaToken}`)
        if (data && data.data) {
            if (props.storiesInstagram && props.storiesInstagram.length === 0) {
                //salvar dados do instagram
                props.storiesSaveIntragramData({
                    professional_id: professionalData.id,
                    json: data.data,
                })

                props.storiesSetInstagramData(data.data)
            }
        }
    }

    const loadProfessionalComments = async (professional, service) => {
        if (professional && professional.id && service && service.id) {
            const data = await getRatings.refetch(`/ratings/comments/${professional.id}/${service.id}.json`)
            if (data && data.comments) {
                setComments(data.comments.map(item => {
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
            else {
                setComments([])
            }
        }
    }

    const reloadProfessionalInstaStories = async () => {
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
        else {
            setStoriesInstagram([])
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

        loadProfessionalStories(professionalData)

        if (props.instaToken.length > 0) {
            props.storiesSetInstagramData([])
            setTimeout(() => {
                loadProfessionalInstaStories()
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
        console.log('typeImageHandle => ', typeImageHandle)
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

                            console.log('requisitou => SIM')

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
        props.navigation.navigate(view, {
            previewScreen: props.route.name
        })
    }

    const toggleOverlay = () => {
        setMoreInfoVisible(!moreInfoVisible)
    }

    const handleClickInstagram = () => {
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
                        .then(data => {
                            if (data && data.access_token) {
                                //resultado com acessToken de curta duracao
                                const instaToken = data.access_token
                                const instaUserID = data.user_id
                                console.log('instaAcessToken => ', instaToken)

                                //salvar insta user id
                                saveInstaUserID(instaUserID).then(saved => {
                                    if (saved)
                                        props.authSetInstaUserId(instaUserID)
                                })

                                //gerar o token de longa duracao
                                const grant = 'ig_exchange_token'
                                getInstaAcessTokenLong.refetch(`https://graph.instagram.com/access_token?grant_type=${grant}&client_secret=${instagramAppSecret}&access_token=${instaToken}`)
                                    .then(data => {
                                        if (data && data.access_token) {
                                            //resultado com acessToken de longa duracao
                                            const instaLongToken = data.access_token
                                            console.log('newInstaAcessTokenLong => ', instaLongToken)

                                            //salvar o token de longa duracao
                                            saveInstaAcessTokenLong(instaLongToken)
                                                .then(saved => {
                                                    if (saved) {
                                                        props.authSetInstaTokenLong(instaLongToken)
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
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
                    <HeaderJobs title='Home' />

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1 }} behavior={behavior}>
                            <TouchCapa onPress={() => handleAvatarClick('backImage')}>
                                <React.Fragment>
                                    {images.backImage.uri.length > 0 && <Capa source={{ uri: images.backImage.uri }} />}
                                    {images.backImage.uri.length <= 0 && <CapaEmpty />}
                                    <ViewIcon>
                                        <Icon name="edit" size={32} color={lightgray} />
                                    </ViewIcon>
                                </React.Fragment>

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
                                        props.instaToken.length == 0 &&
                                        <RectButton
                                            onPress={handleClickInstagram}
                                            style={{
                                                width: 300,
                                                backgroundColor: purple,
                                                flexDirection: 'row',
                                                borderRadius: 50,
                                                overflow: 'hidden',
                                                left: -50,
                                                padding: 10,
                                                paddingLeft: 60,
                                            }}>
                                            <IconFont name="instagram" size={25} color={white} style={{ padding: 5 }} />
                                            <TxtHabilitarInstagram>Habilitar feed do Instagram</TxtHabilitarInstagram>
                                        </RectButton>
                                    }

                                    <TxtTitle size={14}>Stories</TxtTitle>
                                    <Stories
                                        loading={getStories.loading || getInstaStoriesSaved.loading || getInstaStories.loading}
                                        novaImagem={true}
                                        stories={stories}
                                        onPressNewStory={handleNewStoryClick}
                                        onPressStory={item => handleOpenCarousel(item)}
                                        onCloseToEnd={() => handleCloseToEndStories()} />
                                </VwContainerStories>

                                <VwContainerServices>
                                    <View style={{ flexDirection: "row" }}>
                                        <TxtTitle size={14}>Serviços</TxtTitle>
                                        {services.length == 0 &&
                                            <TouchConfigServices onPress={() => {
                                                props.navigation.navigate('Perfil', {
                                                    previewScreen: props.route.name,
                                                    gotoMyServices: true
                                                })
                                            }}>
                                                <TxtConfigServices>Configurar Meus Serviços</TxtConfigServices>
                                            </TouchConfigServices>}
                                    </View>
                                    <CardsServices services={services} loading={getProfessionalServices.loading} emptyMsg="Você não possui serviços configurado..." />
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
                                        onPress={() => handleAvatarClick('photo')}
                                        showEditButton={true}
                                        editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                                        onEditPress={() => handleAvatarClick('photo')}
                                    />
                                }

                                {(images && images.image.uri.length <= 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        icon={{ name: 'image' }}
                                        onPress={() => handleAvatarClick('photo')}
                                        showEditButton={true}
                                        editButton={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                                        onEditPress={() => handleAvatarClick('photo')}
                                    />
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
                        homeOnPress={() => handleFooterPress('CategoriesSearch')}
                        callsOnPress={() => handleFooterPress('CallsList')}
                        chatOnPress={() => handleFooterPress('ChatList')}
                        perfilOnPress={() => handleFooterPress('Perfil')}
                    />
                </React.Fragment>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        isAuth: state.auth.isAuth,
        userType: state.auth.userType,
        token: state.auth.token,
        professionalCtr: state.professional,
        professionalData: state.professional.professional,
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