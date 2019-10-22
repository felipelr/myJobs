import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, BackHandler } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Share from 'react-native-share'

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
    const [showHeader, setShowHeader] = useState(true)
    const [title, setTitle] = useState('Perfil')
    const [image, setImage] = useState((props.user.photo && props.user.photo.length > 0) ? { uri: props.user.photo + '?v=' + new Date().getTime() } : { uri: '' })
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

    useEffect(() => {
        if (BackHandler && BackHandler != null)
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            if (this.backHandler && this.backHandler != null)
                this.backHandler.remove()
        }
    }, [])

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
        switch (item) {
            case 'Dados Cadastrais':
                props.clientClearErrors()
                setShow('cadastro')
                break
            case 'Meus Endereços':
                setShow('enderecos')
                break
            case 'Segurança':
                props.authCleanErrors()
                setShow('alterarSenha')
                break
            case 'Sugerir Profissionais/Empresas':
                props.professionalsCleanErrors()
                setShow('sugerirEmpresa')
                break
            case 'Convidar Amigos':
                handleClickShare()
                break
            default:
                setShow('menu')
                break
        }
    }

    const handleClickBack = () => {
        if (show === 'menu') {

        }
        else {
            setShow('menu')
            setImage((props.user.photo && props.user.photo.length > 0) ? { uri: props.user.photo + '?v=' + new Date().getTime() } : { uri: '' })
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
                                        containerStyle={styles.shadow}
                                        source={{ uri: image.uri }}
                                        size={120} />}

                                {image.uri.length <= 0 &&
                                    <Avatar
                                        rounded
                                        containerStyle={styles.shadow}
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

                {(show === 'cadastro' && props.userType === 'client')  && <ClientEntry onUpdate={handleClickBack} />}
                {(show === 'cadastro' && props.userType === 'professional')  && <ProfessionalEntry onUpdate={handleClickBack} />}

                {show === 'alterarSenha' && <ChangePassword onUpdate={handleClickBack} />}

                {show === 'sugerirEmpresa' && <SuggestCompany onUpdate={handleClickBack} />}

                {show === 'enderecos' && <MyAddress onUpdate={handleClickBack} changeVisiblityPerfilHeader={(show) => setShowHeader(show)} />}
            </View>

            <Footer
                homeOnPress={() => props.ownProps.navigation.navigate('CategoriesSearch')}
                servicesOnPress={() => props.ownProps.navigation.navigate('Services')}
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