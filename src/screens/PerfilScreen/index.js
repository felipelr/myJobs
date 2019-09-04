import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../../components/common/util/colors'

import {
    ScrollViewContainer, ContainerContent, Space, ContainerTitle, Title,
    ContainerLista, ContainerAvatar, styles
} from './styles'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import ClientEntry from '../../components/ClientEntry/index'

function PerfilScreen(props) {
    const [show, setShow] = useState('menu')
    const [list, setList] = useState([
        {
            title: 'Dados Cadastrais',
            icon: 'account-circle'
        },
        {
            title: 'Segurança',
            icon: 'lock'
        },
        {
            title: 'Meus Agendamentos',
            icon: 'date-range'
        },
        {
            title: 'Avisos',
            icon: 'notifications-active'
        },
        {
            title: 'Sugerir Profissionais/Empresas',
            icon: 'thumb-up'
        },
        {
            title: 'Convidar Amigos',
            icon: 'share'
        },
        {
            title: 'Sorteios',
            icon: 'redeem'
        }
    ])

    useEffect(() => {
        return () => {

        }
    }, [])

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
                                <Title>{props.client.client.name}</Title>
                            </ContainerTitle>
                            <ContainerAvatar>
                                <Avatar
                                    rounded
                                    avatarStyle={styles.shadow}
                                    source={{
                                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                    }}
                                    size={140} />
                            </ContainerAvatar>
                            <ContainerLista>
                                {
                                    list.map((item, i) => (
                                        <TouchableOpacity key={item.title} onPress={() => { handleClickMenu(item.title) }}>
                                            <ListItem
                                                key={i}
                                                containerStyle={{ marginBottom: 1 }}
                                                title={item.title}
                                                rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                                leftIcon={{ name: item.icon }}
                                            />
                                        </TouchableOpacity>
                                    ))
                                }
                            </ContainerLista>
                        </ContainerContent>
                    )}

                    {show === 'cadastro' && <ClientEntry onUpdate={handleClickBack}/>}
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
        client: state.client,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)