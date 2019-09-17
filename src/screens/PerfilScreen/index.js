import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { urlMyJobs } from '../../config/config'

import { purple } from '../../components/common/util/colors'

import {
    ScrollViewContainer, ContainerContent, Space, ContainerTitle, Title,
    ContainerLista, ContainerAvatar, styles
} from './styles'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import ClientEntry from '../../components/ClientEntry/index'

function PerfilScreen(props) {
    const [image, setImage] = useState(props.client.image_path ? { uri: urlMyJobs + props.client.image_path } : { uri: '' })
    const [show, setShow] = useState('menu')
    const [list, setList] = useState([
        {
            title: 'Dados Cadastrais', //mvp -> alterar info do usuario
            icon: 'account-circle'
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

    handleClickMenu = (item) => {
        switch (item) {
            case 'Dados Cadastrais':
                setShow('cadastro')
                break;
            default:
                setShow('menu')
                break;
        }
    }

    handleClickBack = () => {
        setShow('menu')
    }

    return (
        <React.Fragment>
            <HeaderJobs title='Perfil'
                back={handleClickBack} />
            <ScrollViewContainer>
                <View style={{ flex: 1 }}>
                    {show === 'menu' && (
                        <ContainerContent>
                            <Space />
                            <ContainerTitle>
                                <Title>{props.client.name}</Title>
                            </ContainerTitle>
                            <ContainerAvatar>
                                <Avatar
                                    rounded
                                    containerStyle={styles.shadow}
                                    source={{ uri: image.uri }}
                                    size={120} />
                            </ContainerAvatar>
                            <ContainerLista>
                                {
                                    list.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            containerStyle={{ marginBottom: 1 }}
                                            title={item.title}
                                            rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                            leftIcon={{ name: item.icon }}
                                            onPress={() => { handleClickMenu(item.title) }}
                                        />
                                    ))
                                }
                            </ContainerLista>
                        </ContainerContent>
                    )}

                    {show === 'cadastro' && <ClientEntry onUpdate={handleClickBack} />}
                </View>
            </ScrollViewContainer>

            <Footer />
        </React.Fragment>
    )
}

PerfilScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state.client.client,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)