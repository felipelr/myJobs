import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { View, BackHandler, Animated, Dimensions } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Share from 'react-native-share'
import Moment from 'moment'

import ActionCreators from '../../store/actionCreators'

import { purple, lightgray } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    ContainerContent,
    Space,
    ContainerTitle,
    Title,
    ContainerLista,
    ContainerAvatar,
    styles
} from './styles'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import ClientEntry from '../../components/ClientEntry/index'
import ChangePassword from '../../components/ChangePassword/index'
import SuggestCompany from '../../components/SuggestCompany/index'
import MyAddress from '../../components/MyAddress/index'
import ProfessionalEntry from '../../components/ProfessionalEntry/index'

function PerfilScreen(props) {
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [showHeader, setShowHeader] = useState(true)
    const [title, setTitle] = useState('Perfil')
    const [image, setImage] = useState((props.user.photo && props.user.photo.length > 0) ? { uri: props.user.photo + '?v=' + Moment(props.user.modified).toDate().getTime() } : { uri: '' })
    const [show, setShow] = useState('menu')
    const [list, setList] = useState([
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

    const pageRef = useRef()

    useEffect(() => {
        pageRef.current = 'menu'
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        setImage((props.user.photo && props.user.photo.length > 0) ? { uri: props.user.photo + '?v=' + Moment(props.user.modified).toDate().getTime() } : { uri: '' })
    }, [props.user.modified])

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
                                    <Title>{props.user.name}</Title>
                                </ContainerTitle>
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

                                <ScrollViewContainer>
                                    <View>
                                        <ContainerLista>
                                            {
                                                list.map((item, i) => (
                                                    <ListItem
                                                        key={i}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                        title={item.title}
                                                        rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                                        leftIcon={{ name: item.icon }}
                                                        onPress={() => { handleClickMenu(item.title) }}
                                                        onLongPress={() => { handleClickMenu(item.title) }}
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

                    {show === 'alterarSenha' && <ChangePassword onUpdate={handleClickBack} />}

                    {show === 'sugerirEmpresa' && <SuggestCompany onUpdate={handleClickBack} />}

                    {show === 'enderecos' && <MyAddress onUpdate={handleClickBack} changeVisiblityPerfilHeader={(show) => setShowHeader(show)} />}
                </Animated.View>
            </View>

            <Footer
                selected={'perfil'}
                homeOnPress={() => props.userType === 'client' ? props.ownProps.navigation.navigate('CategoriesSearch') : props.ownProps.navigation.navigate('ProfessionalHome')}
                servicesOnPress={() => { }}
                perfilOnPress={() => { }} />
        </React.Fragment>
    )
}

PerfilScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.userType === 'client' ? state.client.client : state.professional.professional,
        userType: state.auth.userType,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientClearErrors: () => dispatch(ActionCreators.clientClearErrors()),
        authCleanErrors: () => dispatch(ActionCreators.authCleanErrors()),
        professionalsCleanErrors: () => dispatch(ActionCreators.professionalsCleanErrors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)