import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { View, BackHandler, Animated, Dimensions, Linking, Alert } from 'react-native'
import { ListItem, Avatar, Slider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Share from 'react-native-share'

import { usePost, useGet } from '../../services/useRequest'

import { instagramAppID, instagramAppSecret, instagramRedirectUrl } from '../../config/config'

import ActionCreators from '../../store/actionCreators'

import { purple, lightgray, mediumgray, black } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    ContainerContent,
    Space,
    ContainerTitle,
    Title,
    ContainerLista,
    ContainerAvatar,
    ViewSlider,
    TxtSlider,
    TouchHabilitarProfessional,
    styles
} from './styles'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import ClientEntry from '../../components/ClientEntry/index'
import ChangePassword from '../../components/ChangePassword/index'
import SuggestCompany from '../../components/SuggestCompany/index'
import MyAddress from '../../components/MyAddress/index'
import ProfessionalEntry from '../../components/ProfessionalEntry/index'
import MyServices from '../../components/MyServices'
import SuggestService from '../../components/SuggestService'

import { heightPercentageToDP } from '../../components/common/util/dimensions'
import { getParameterByName } from '../../components/common/util/functions'
import { saveInstaAcessTokenLong, saveInstaUserID } from '../../components/common/util/localStorage'

function PerfilScreen(props) {
    const [doubleUser, setDoubleUser] = useState(props.client.id && props.professional.id ? true : false)
    const [user, setUser] = useState(props.userType === 'client' ? props.client : props.professional)
    const [selectUserType, setSelectedUserType] = useState(props.userType === 'client' ? 0 : 1)
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [showHeader, setShowHeader] = useState(true)
    const [title, setTitle] = useState('Perfil')
    const [image, setImage] = useState((user.photo && user.photo.length > 0) ? { uri: user.photo } : { uri: '' })
    const [show, setShow] = useState('menu')
    const [listClient, setListClient] = useState([
        {
            title: 'Dados', //mvp -> alterar info do usuario
            icon: 'account-circle'
        },
        {
            title: 'Meus Endereços', //mvp -> alterar endereço
            icon: 'room'
        },
        {
            title: 'Segurança', //mvp -> alteração de senha
            icon: 'lock'
        },
        {
            title: 'Sugerir Profissionais/Empresas', //mvp -> colher dados de contato do indicado
            icon: 'thumb-up'
        },
        {
            title: 'Convidar Amigos', //mvp -> compartilhar app via redes sociais
            icon: 'share'
        }
    ])
    const [listProfessional] = useState([
        {
            title: 'Dados', //mvp -> alterar info do usuario
            icon: 'account-circle'
        },
        {
            title: 'Meus Endereços', //mvp -> alterar endereço
            icon: 'room'
        },
        {
            title: 'Meus Serviços',
            icon: 'build',
        },
        {
            title: 'Sugerir Serviços',
            icon: 'public',
        },
        {
            title: 'Segurança', //mvp -> alteração de senha
            icon: 'lock'
        },
        {
            title: 'Convidar Amigos', //mvp -> compartilhar app via redes sociais
            icon: 'share'
        },
        {
            title: 'Habilitar Instagram',
            icon: 'instagram'
        }
    ])

    const pageRef = useRef()

    const postInstaAcessToken = usePost('', {})
    const getInstaAcessTokenLong = useGet('')

    useEffect(() => {
        pageRef.current = 'menu'
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        Linking.addEventListener('url', handleOpenURL)

        if (!doubleUser && selectUserType === 0 && listClient.length === 5) {
            setListClient([
                ...listClient,
                {
                    title: 'Oferecer serviços no MyJobs',
                    icon: 'handshake-o'
                }
            ])
        }

        return () => {
            backHandler.remove()
            Linking.removeEventListener('url', handleOpenURL)
        }
    }, [])

    useEffect(() => {
        if (props.professional && props.professional.id) {
            if (!doubleUser && selectUserType === 0) {
                setDoubleUser(true)
                setListClient([
                    {
                        title: 'Dados', //mvp -> alterar info do usuario
                        icon: 'account-circle'
                    },
                    {
                        title: 'Meus Endereços', //mvp -> alterar endereço
                        icon: 'room'
                    },
                    {
                        title: 'Segurança', //mvp -> alteração de senha
                        icon: 'lock'
                    },
                    {
                        title: 'Sugerir Profissionais/Empresas', //mvp -> colher dados de contato do indicado
                        icon: 'thumb-up'
                    },
                    {
                        title: 'Convidar Amigos', //mvp -> compartilhar app via redes sociais
                        icon: 'share'
                    }
                ])
            }
        }
    }, [props.professional])

    useEffect(() => {
        if (props.userType === 'client') {
            setUser(props.client)
            setImage((props.client.photo && props.client.photo.length > 0) ? { uri: props.client.photo } : { uri: '' })
        }
    }, [props.client.modified])

    useEffect(() => {
        if (props.userType === 'professional') {
            setUser(props.professional)
            setImage((props.professional.photo && props.professional.photo.length > 0) ? { uri: props.professional.photo } : { uri: '' })
        }
    }, [props.professional.modified])

    useEffect(() => {
        if (props.userType === 'client') {
            setUser(props.client)
            setImage((props.client.photo && props.client.photo.length > 0) ? { uri: props.client.photo } : { uri: '' })
        }
        else {
            setUser(props.professional)
            setImage((props.professional.photo && props.professional.photo.length > 0) ? { uri: props.professional.photo } : { uri: '' })
        }
    }, [props.userType])

    useEffect(() => {
        switch (show) {
            case 'cadastro':
                setTitle('Dados')
                break
            case 'enderecos':
                setTitle('Meus Endereços')
                break
            case 'alterarSenha':
                setTitle('Ateração de Senha')
                break
            case 'sugerirEmpresa':
                setTitle('Sugerir Empresa/Profissional')
                break
            case 'servicos':
                setTitle('Meus Serviços')
                break
            case 'sugerir_servicos':
                setTitle('Sugerir Serviços')
                break
            default:
                setTitle('Perfil')
                break
        }
    }, [show])

    useEffect(() => {
        if (props.route.params.gotoMyServices) {
            handleClickMenu('Meus Serviços')
        }
        else if (props.route.params.gotoMyAddress) {
            handleClickMenu('Meus Endereços')
        }
    }, [props.route.params])

    const handleBackPress = async () => {
        handleClickBack()
        return true
    }

    const handleClickMenu = (item) => {
        let doAnimation = false
        switch (item) {
            case 'Dados':
                props.clientClearErrors()
                setShow('cadastro')
                pageRef.current = 'cadastro'
                doAnimation = true
                break
            case 'Meus Endereços':
                setShow('enderecos')
                pageRef.current = 'enderecos'
                doAnimation = true
                break
            case 'Segurança':
                props.authCleanErrors()
                setShow('alterarSenha')
                pageRef.current = 'alterarSenha'
                doAnimation = true
                break
            case 'Sugerir Profissionais/Empresas':
                props.professionalsCleanErrors()
                setShow('sugerirEmpresa')
                pageRef.current = 'sugerirEmpresa'
                doAnimation = true
                break
            case 'Convidar Amigos':
                handleClickShare()
                break
            case 'Meus Serviços':
                setShow('servicos')
                pageRef.current = 'servicos'
                doAnimation = true
                break
            case 'Sugerir Serviços':
                setShow('sugerir_servicos')
                pageRef.current = 'sugerir_servicos'
                doAnimation = true
                break
            case 'Habilitar Instagram':
                handleClickInstagram()
                break
            case 'Oferecer serviços no MyJobs':
                handleClickOferecerServicos()
                break
            default:
                setShow('menu')
                pageRef.current = 'menu'
                break
        }

        if (doAnimation) {
            Animated.spring(slideLeft, {
                toValue: { x: 0, y: 0 },
                delay: 0
            }).start()

            Animated.spring(slideRight, {
                toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
                delay: 0
            }).start()
        }
    }

    const handleClickOferecerServicos = () => {
        Alert.alert(
            "Olá",
            "Confirma o desejo de oferece seus serviços no MyJobs?",
            [
                {
                    text: "NÃO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "SIM", onPress: () => {
                        const newProfessional = {
                            user_id: props.client.user_id,
                            name: props.client.name,
                            description: '',
                            phone: props.client.phone,
                            document: props.client.document,
                            date_birth: props.client.date_birth.substring(0, 10),
                            photo: props.client.photo,
                            backImage: '',
                        }
                        props.professionalAddRequest(props.token, newProfessional)
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const handleClickBack = () => {
        if (showHeader) {
            handleBackToMenu()
        }
    }

    const handleBackToMenu = () => {
        if (pageRef.current === 'menu') {
            props.navigation.goBack()
        }
        else {
            setShow('menu')
            pageRef.current = 'menu'

            Animated.spring(slideLeft, {
                toValue: { x: Dimensions.get('screen').width, y: 0 },
                delay: 0
            }).start()

            Animated.spring(slideRight, {
                toValue: { x: 0, y: 0 },
                delay: 0
            }).start()
        }
    }

    const handleClickShare = () => {
        const shareOptions = {
            title: 'Compartilhe o MyJobs',
            message: 'MyJobs faça parte desta comunidade. ',
            url: 'https://play.google.com/store/apps/details?id=it.mobile.food',
        }
        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err) })
    }

    const hadleUserTypePress = () => {
        if (selectUserType == 0) {
            setSelectedUserType(1)
            props.authSetUserType('professional')
            props.professionalSelectedRequest({})
        }
        else {
            setSelectedUserType(0)
            props.authSetUserType('client')
        }
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
                                            saveInstaAcessTokenLong(instaLongToken).then(saved => {
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

    return (
        <React.Fragment>
            {
                showHeader && (
                    <HeaderJobs
                        title={title}
                        back={handleClickBack} />
                )
            }

            <View style={{ flex: 1 }}>
                <Animated.View style={{ ...slideRight.getLayout(), position: 'absolute', width: '100%', height: '100%' }}>
                    {show === 'menu' && (
                        <React.Fragment>
                            <ContainerContent>
                                <Space />
                                <ContainerTitle>
                                    {doubleUser &&
                                        <ViewSlider
                                            activeOpacity={1}
                                            onPress={() => hadleUserTypePress()}>
                                            <TxtSlider color={selectUserType === 0 ? purple : black}>Cliente</TxtSlider>
                                            <Slider
                                                value={selectUserType}
                                                disabled={true}
                                                maximumTrackTintColor={mediumgray}
                                                minimumTrackTintColor={mediumgray}
                                                thumbTintColor={purple}
                                                thumbTouchSize={{ width: 60, height: 60 }}
                                                trackStyle={{ height: 12, borderRadius: 10 }}
                                                style={{ width: 40 }}
                                            />
                                            <TxtSlider color={selectUserType === 1 ? purple : black}>Profissional</TxtSlider>
                                        </ViewSlider>
                                    }
                                    <Title>{user.name}</Title>
                                </ContainerTitle>
                                <ContainerAvatar>
                                    {image.uri.length > 0 &&
                                        <Avatar
                                            rounded
                                            containerStyle={styles}
                                            source={{ uri: image.uri }}
                                            size={heightPercentageToDP('20%')} />
                                    }

                                    {image.uri.length <= 0 &&
                                        <Avatar
                                            rounded
                                            containerStyle={styles}
                                            size={heightPercentageToDP('20%')}
                                            icon={{ name: 'image' }} />
                                    }

                                </ContainerAvatar>

                                <ScrollViewContainer>
                                    <View>
                                        <ContainerLista>
                                            {
                                                props.userType === 'client' && listClient.map((item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, margin: 0 }}
                                                        title={item.title}
                                                        rightIcon={<Icon name="chevron-right" size={25} color={purple} />}
                                                        leftIcon={item.icon === 'handshake-o' ? <IconFont name={item.icon} size={25} color={purple} /> : <Icon name={item.icon} size={25} color={purple} />}
                                                        onPress={() => { handleClickMenu(item.title) }}
                                                        onLongPress={() => { handleClickMenu(item.title) }}
                                                        bottomDivider
                                                    />
                                                ))
                                            }
                                            {
                                                props.userType === 'professional' && listProfessional.map((item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                        title={item.title}
                                                        rightIcon={<Icon name="chevron-right" size={25} color={purple} />}
                                                        leftIcon={item.icon === 'instagram' ? <IconFont name={item.icon} size={25} color={purple} /> : <Icon name={item.icon} size={25} color={purple} />}
                                                        onPress={() => { handleClickMenu(item.title) }}
                                                        onLongPress={() => { handleClickMenu(item.title) }}
                                                    />
                                                ))
                                            }
                                        </ContainerLista>
                                        <View style={{ backgroundColor: '#FFFFFF', height: '100%' }} />
                                    </View>
                                </ScrollViewContainer>

                            </ContainerContent>
                        </React.Fragment>
                    )}
                </Animated.View>

                <Animated.View style={slideLeft.getLayout()}>
                    {(show === 'cadastro' && props.userType === 'client') && <ClientEntry onUpdate={handleClickBack} />}
                    {(show === 'cadastro' && props.userType === 'professional') && <ProfessionalEntry onUpdate={handleClickBack} />}

                    {show === 'servicos' && <MyServices onUpdate={handleClickBack} changeVisiblityPerfilHeader={(show) => setShowHeader(show)} />}
                    {show === 'sugerir_servicos' && <SuggestService onUpdate={handleBackToMenu} changeVisiblityPerfilHeader={(show) => setShowHeader(show)} />}

                    {show === 'alterarSenha' && <ChangePassword onUpdate={handleClickBack} />}

                    {show === 'sugerirEmpresa' && <SuggestCompany onUpdate={handleClickBack} />}

                    {show === 'enderecos' && <MyAddress onUpdate={handleClickBack} changeVisiblityPerfilHeader={(show) => setShowHeader(show)} />}
                </Animated.View>
            </View>

            <Footer
                type={props.userType}
                selected={'perfil'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch', {
                    previewScreen: props.route.name,
                })}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                })}
                callsOnPress={() => props.navigation.navigate('CallsList', {
                    previewScreen: props.route.name,
                })}
                chatOnPress={() => props.userType === 'client' ? props.navigation.navigate('ClientListChat', {
                    previewScreen: props.route.name,
                }) : props.navigation.navigate('ProfessionalListChat', {
                    previewScreen: props.route.name,
                })}
            />
        </React.Fragment>
    )
}

PerfilScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        client: state.client.client,
        professional: state.professional.professional,
        userType: state.auth.userType,
        user: state.auth.user,
        token: state.auth.token,
        loading: state.professional.loading,
        error: state.professional.error,
        errorMessage: state.professional.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientClearErrors: () => dispatch(ActionCreators.clientClearErrors()),
        authCleanErrors: () => dispatch(ActionCreators.authCleanErrors()),
        professionalsCleanErrors: () => dispatch(ActionCreators.professionalsCleanErrors()),
        authSetUserType: (userType) => dispatch(ActionCreators.authSetUserType(userType)),
        professionalSelectedRequest: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        authSetInstaTokenLong: (token) => dispatch(ActionCreators.authSetInstaTokenLong(token)),
        authSetInstaUserId: (id) => dispatch(ActionCreators.authSetInstaUserId(id)),
        professionalAddRequest: (token, professional) => dispatch(ActionCreators.professionalAddRequest(token, professional)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)