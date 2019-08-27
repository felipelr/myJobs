import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Platform } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ActionCreators from '../../store/actionCreators'

import {
    Container, ContainerContent, Space, ContainerTitle, Title,
    ContainerLista, ContainerAvatar, styles
} from './styles'
import Background from '../../components/Background/index'
import Footer from '../../components/Footer/index'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { purple } from '../../components/common/util/colors'

function PerfilScreen(props) {
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
        //console.log(props.auth.client)

        return () => {

        }
    }, [])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <Container contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <Background />
                <ContainerContent>
                    <Space />
                    <ContainerTitle>
                        <Title>{props.auth.client.name}</Title>
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
                                <TouchableOpacity key={item.title}>
                                    <ListItem
                                        key={i}
                                        containerStyle={{ marginBottom: 0.5 }}
                                        title={item.title}
                                        rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                        leftIcon={{ name: item.icon }}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ContainerLista>
                </ContainerContent>
                <Footer />
            </View>
        </Container>
    )
}

PerfilScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen)