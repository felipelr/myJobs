import React, { useState, useEffect, useRef } from 'react'
import { Platform, BackHandler, ScrollView, View, Alert } from 'react-native'
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'

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
    TxtMaisInfo,
    TouchMaisInfo,
    TxtProfessionalDescrption,
    ViewInfo,
    TextInfo,
    TextAddress,
} from './styles'

import RatingJobs from '../../components/RatingJobs/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import Stories from '../../components/Stories/index'
import CardsServices from '../../components/CardsServices/index'
import ComentariosList from '../../components/ComentariosList'
import Footer from '../../components/Footer/index'
import StoriesCarousel from '../../components/StoriesCarousel'

import { heightPercentageToDP } from '../../components/common/util/dimensions'

function ProfessionalViewScreen(props) {
    const [professionalData, setProfessionalData] = useState(props.professionalSelected)
    const [images, setImages] = useState({
        image: { uri: '' },
        backImage: { uri: '' },
    })
    const [addresses, setAddresses] = useState([])
    const [services, setServices] = useState([])
    const [comments, setComments] = useState([])
    const [stories, setStories] = useState([])
    const [storiesCarouselOpened, setStoriesCarouselOpened] = useState(false)
    const [firstImageCarousel, setFirstImageCarousel] = useState('')
    const [professionalRate, setProfessionalRate] = useState({ avg: 0, count: 0 })
    const [storiesMyJobs, setStoriesMyJobs] = useState([])
    const [storiesInstagram, setStoriesInstagram] = useState([])
    const [storiesPage, setStoriesPage] = useState(1)
    const [storiesComplete, setStoriesComplete] = useState([])
    const [moreInfoVisible, setMoreInfoVisible] = useState(false)
    const [loadingProfessional, setLoadingProfessional] = useState(false)

    const pageRef = useRef()
    const routeRef = useRef()
    const loadingProfessionalRef = useRef()

    const getProfessionalAddresses = useGetMyJobs('', props.token)
    const getProfessionalServices = useGetMyJobs('', props.token)
    const getRatings = useGetMyJobs('', props.token)
    const getRate = useGetMyJobs('', props.token)

    const getStories = useGetMyJobs('', props.token)
    const getInstaStoriesSaved = useGetMyJobs('', props.token)

    //START - USE EFFECTS SECTION
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
            props.professionalSetProfessionalView({})
        }
    }, [])

    useEffect(() => {
        loadingProfessionalRef.current = loadingProfessional
    }, [loadingProfessional])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    useEffect(() => {
        setProfessionalData(props.professionalSelected)
        loadInfoProfessional(props.professionalSelected)
    }, [props.professionalSelected])

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
        const arrayFull = storiesMyJobs.concat(storiesInstagram)
        const arrayOrdered = arrayFull.sort((a, b) => a.created.getTime() > b.created.getTime() ? -1 : a.created.getTime() < b.created.getTime() ? 1 : 0)
        setStoriesComplete(arrayOrdered)
    }, [storiesMyJobs, storiesInstagram])

    useEffect(() => {
        setStoriesPage(1)
        setStories(arrayPaginate(storiesComplete, 5, 1))
    }, [storiesComplete])
    //END - USE EFFECTS SECTION

    //START - FUNCTIONS SECTION
    const loadInfoProfessional = async (item) => {
        setLoadingProfessional(true)
        setStoriesPage(1)
        setStories([])
        setStoriesInstagram([])
        setStoriesMyJobs([])
        loadProfessionalDataImages(item)

        await loadProfessionalServices(item)
        await loadProfessionalRate(item)
        await loadProfessionalStories(item)
        await loadProfessionalInstaStoriesSaved()
        await loadProfessionalAddresses(item)
        setLoadingProfessional(false)
    }

    const loadProfessionalAddresses = async (professional) => {
        if (professional.id) {
            const data = await getProfessionalAddresses.refetch(`/professionalsAddresses/view/${professional.id}.json`)
            if (data && data.professionalsAddresses) {
                setAddresses(data.professionalsAddresses)
            }
            else {
                setAddresses([])
            }
        }
    }

    const loadProfessionalServices = async (professional) => {
        if (professional.id) {
            const data = await getProfessionalServices.refetch(`/professionalServices/services/${professional.id}.json`)
            if (data) {
                if (data.professionalServices) {
                    const array = data.professionalServices.map(item => {
                        return {
                            ...item.service,
                            rating: item.rating,
                            amount_ratings: item.amount_ratings
                        }
                    })
                    setServices(array)
                }
            }
            else {
                setServices([])
            }
        }
    }

    const loadProfessionalRate = async (professional) => {
        if (professional.id) {
            const data = await getRate.refetch(`/ratings/professional/${professional.id}.json`)
            if (data && data.rate) {
                console.log('rate => ', data.rate)
                setProfessionalRate(data.rate)
            }
        }
    }

    const loadProfessionalStories = async (professional) => {
        if (professional.id) {
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

    const loadProfessionalInstaStoriesSaved = async () => {
        if (props.professionalSelected.id) {
            const data = await getInstaStoriesSaved.refetch(`/instagram/view/${props.professionalSelected.id}.json`)
            if (data && data.story && data.story.json) {
                console.log('getInstaStoriesSaved =======================')

                let arrayInsta = data.story.json.map(item => {
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
            else {
                setStoriesInstagram([])
            }
        }
    }

    const loadProfessionalComments = async (professional, service) => {
        if (professional.id && service.id) {
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

        if (loadingProfessionalRef.current) {
            return true
        }

        if (routeRef.current.params && routeRef.current.params.previewScreen) {
            setServices([])
            setComments([])
            setStories([])
            setStoriesInstagram([])
            setStoriesMyJobs([])
            props.professionalSetProfessionalView({})
            props.navigation.navigate(routeRef.current.params.previewScreen, {
                previewScreen: props.route.name,
            })
        }
        return true
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

    const handleCloseToEndStories = () => {
        const newPage = storiesPage + 1
        setStoriesPage(newPage)
        const arrayStories = stories.concat(arrayPaginate(storiesComplete, 5, newPage))
        setStories(arrayStories)
    }

    const handleFooterPress = (view) => {
        if (view === 'ProfessionalHome') {
            if (props.userType === 'client')
                return;
        }

        setServices([])
        setComments([])
        setStories([])
        setStoriesInstagram([])
        setStoriesMyJobs([])
        props.professionalSetProfessionalView({})

        props.navigation.navigate(view, {
            previewScreen: props.route.name
        })
    }

    const toggleOverlay = () => {
        setMoreInfoVisible(!moreInfoVisible)
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
                    <HeaderJobs title='Profissional'
                        professional={professionalData}
                        chat={() => {
                            props.clientSelectedRequest({})
                            props.setProfessionalSelected(professionalData)
                            props.navigation.navigate('ProfessionalChat', {
                                previewScreen: props.route.name,
                            })
                        }} />

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
                            <TouchMaisInfo onPress={toggleOverlay}>
                                <TxtMaisInfo>Mais informações</TxtMaisInfo>
                            </TouchMaisInfo>

                            <VwContainerContent>
                                <VwContainerStories>
                                    <TxtTitle size={14}>Stories</TxtTitle>
                                    <Stories
                                        loading={getStories.loading || getInstaStoriesSaved.loading || loadingProfessional}
                                        novaImagem={false}
                                        stories={stories}
                                        onPressStory={item => handleOpenCarousel(item)}
                                        onCloseToEnd={() => handleCloseToEndStories()} />
                                </VwContainerStories>

                                <VwContainerServices>
                                    <TxtTitle size={14}>Serviços</TxtTitle>
                                    <CardsServices services={services} loading={getProfessionalServices.loading || loadingProfessional} />
                                </VwContainerServices>

                                <ContentComentarios>
                                    <TxtTitle size={14}>Comentários do Serviço: {props.selectedService.title}</TxtTitle>
                                    <ComentariosList comments={comments} loading={getRatings.loading || loadingProfessional} />
                                </ContentComentarios>
                            </VwContainerContent>

                            <ContainerAvatar>
                                {(images && images.image.uri.length > 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        source={{ uri: images.image.uri }}
                                    />
                                }

                                {(images && images.image.uri.length <= 0) &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles}
                                        size={heightPercentageToDP('20%')}
                                        icon={{ name: 'image' }}
                                    />
                                }
                            </ContainerAvatar>

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
                                    {addresses &&
                                        <React.Fragment>
                                            <TextAddress>Endereço</TextAddress>
                                            <TxtProfessionalDescrption>
                                                {addresses.map(address => `${address.street}, ${address.street_number} - ${address.neighborhood} - ${address.city.name}/${address.city.state.initials} \n\n`)}
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
                        professionalProfileOnPress={() => handleFooterPress('ProfessionalHome')}
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
        professionalSelected: state.professional.professionalView,
        selectedService: state.professionalHome.selectedService,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service)),
        professionalSetProfessionalView: (professional) => dispatch(ActionCreators.professionalSetProfessionalView(professional)),
        clientSelectedRequest: (client) => dispatch(ActionCreators.clientSelected(client)),
        storiesSetFinishPresentation: (finish) => dispatch(ActionCreators.storiesSetFinishPresentation(finish)),
        storiesSaveIntragramData: (finish) => dispatch(ActionCreators.storiesSaveIntragramData(finish)),
        authSetInstaTokenLong: (token) => dispatch(ActionCreators.authSetInstaTokenLong(token)),
        storiesSetInstagramData: (stories) => dispatch(ActionCreators.storiesSetInstagramData(stories)),
        authSetInstaUserId: (id) => dispatch(ActionCreators.authSetInstaUserId(id)),
        professionalSetRatingUpdated: (updated) => dispatch(ActionCreators.professionalSetRatingUpdated(updated)),
        professionalUpdateRequest: (professional, token) => dispatch(ActionCreators.professionalUpdateRequest(professional, token)),
        setProfessionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalViewScreen)