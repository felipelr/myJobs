import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { View, BackHandler, Animated, Dimensions, StatusBar } from 'react-native'
import { ListItem, Avatar, Slider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Share from 'react-native-share'
import Moment from 'moment'

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

function PerfilScreen(props) {
    const [doubleUser] = useState(props.client.id && props.professional.id)
    const [user, setUser] = useState(props.userType === 'client' ? props.client : props.professional)
    const [selectUserType, setSelectedUserType] = useState(props.userType === 'client' ? 0 : 1)
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [showHeader, setShowHeader] = useState(true)
    const [title, setTitle] = useState('Perfil')
    const [image, setImage] = useState((user.photo && user.photo.length > 0) ? { uri: user.photo + '?v=' + Moment(user.modified).toDate().getTime() } : { uri: '' })
    const [show, setShow] = useState('menu')
    const [listClient] = useState([
        {
            title: 'Dados Cadastrais', //mvp -> alterar info do usuario
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
            title: 'Meus Agendamentos', //mvp
            icon: 'date-range'
        },
        {
            title: 'Avisos', //mvp
            icon: 'notifications-active'
        },
        {
            title: 'Sugerir Profissionais/Empresas', //mvp -> colher dados de contato do indicado
            icon: 'thumb-up'
        },
        {
            title: 'Convidar Amigos', //mvp -> compartilhar app via redes sociais
            icon: 'share'
        },
        {
            title: 'Sorteios',
            icon: 'redeem'
        }
    ])
    const [listProfessional] = useState([
        {
            title: 'Dados Cadastrais', //mvp -> alterar info do usuario
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
            title: 'Avisos', //mvp
            icon: 'notifications-active'
        },
        {
            title: 'Convidar Amigos', //mvp -> compartilhar app via redes sociais
            icon: 'share'
        },
        {
            title: 'Sorteios',
            icon: 'redeem'
        }
    ])

    const pageRef = useRef()

    useEffect(() => {
        pageRef.current = 'menu'
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        console.log('userType', props.userType)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (props.userType === 'client') {
            setUser(props.client)
            setImage((props.client.photo && props.client.photo.length > 0) ? { uri: props.client.photo + '?v=' + Moment(props.client.modified).toDate().getTime() } : { uri: '' })
        }
    }, [props.client.modified])

    useEffect(() => {
        if (props.userType === 'professional') {
            setUser(props.professional)
            setImage((props.professional.photo && props.professional.photo.length > 0) ? { uri: props.professional.photo + '?v=' + Moment(props.professional.modified).toDate().getTime() } : { uri: '' })
        }
    }, [props.professional.modified])

    useEffect(() => {
        if (props.userType === 'client') {
            setUser(props.client)
            setImage((props.client.photo && props.client.photo.length > 0) ? { uri: props.client.photo + '?v=' + Moment(props.client.modified).toDate().getTime() } : { uri: '' })
        }
        else {
            setUser(props.professional)
            setImage((props.professional.photo && props.professional.photo.length > 0) ? { uri: props.professional.photo + '?v=' + Moment(props.professional.modified).toDate().getTime() } : { uri: '' })
        }
    }, [props.userType])

    useEffect(() => {
        switch (show) {
            case 'cadastro':
                setTitle('Dados Cadastrais')
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

    const handleBackPress = async () => {
        handleClickBack()
        return true
    }

    const handleClickMenu = (item) => {
        let doAnimation = false
        switch (item) {
            case 'Dados Cadastrais':
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

    return (
        <React.Fragment>
            <StatusBar backgroundColor={purple} />
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
                                            size={heightPercentageToDP('20%')} />
                                    }

                                </ContainerAvatar>

                                <ScrollViewContainer>
                                    <View>
                                        <ContainerLista>
                                            {
                                                props.userType === 'client' && listClient.map((item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                        title={item.title}
                                                        rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                                        leftIcon={{ name: item.icon }}
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
                                                        rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                                        leftIcon={{ name: item.icon }}
                                                        onPress={() => { handleClickMenu(item.title) }}
                                                        onLongPress={() => { handleClickMenu(item.title) }}
                                                        bottomDivider
                                                    />
                                                ))
                                            }
                                        </ContainerLista>
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
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                chatOnPress={() => props.userType === 'client' ? props.navigation.navigate('ClientListChat') : props.navigation.navigate('ProfessionalListChat')}
            />
        </React.Fragment>
    )
}

PerfilScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state.client.client,
        professional: state.professional.professional,
        userType: state.auth.userType,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientClearErrors: () => dispatch(ActionCreators.clientClearErrors()),
        authCleanErrors: () => dispatch(ActionCreators.authCleanErrors()),
        professionalsCleanErrors: () => dispatch(ActionCreators.professionalsCleanErrors()),
        authSetUserType: (userType) => dispatch(ActionCreators.authSetUserType(userType)),
        professionalSelectedRequest: (professional) => dispatch(ActionCreators.professionalSelected(professional))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)