import React, { useState, useEffect } from 'react'
import { View, Platform, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    Container, ContainerContent, Space, ContainerTitle, Title,
    ContainerLista, ContainerAvatar, styles
} from './styles'
import Background from '../../components/Background/index'
import Footer from '../../components/Footer/index'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { purple } from '../../components/common/util/colors';

export default function PerfilScreen(props) {

    const list = [
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
    ]

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <Container contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <Background />
                <ContainerContent>
                    <View style={{flex:1.5}}>
                        <Space />
                        <ContainerTitle>
                            <Title>
                                Tia da Amazonia
                            </Title>
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
                    </View>
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