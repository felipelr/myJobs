import React, { useEffect, useState } from 'react'
import { BackHandler, Animated, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'

import { purple, lightgray, white, gold } from '../../components/common/util/colors'

import {
    styles,
    ScrollViewContainer,
    ViewContainer,
    ViewTabControl,
    TouchTab,
    TxtTab,
    ViewListItem,
} from './styles'

function ChatListScreen(props) {
    const [doubleUser] = useState(props.clientData.id && props.professionalData.id)
    const [slideLeft] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [professionalChats, setProfessionalChats] = useState([])
    const [clientChats, setClientChats] = useState([])
    const [tabSelected, setTabSelected] = useState(doubleUser ? 0 : props.userType === 'client' ? 1 : 0) // 0 -> professional; 1 -> client

    const getChatsClient = useGet(``, props.token)
    const getChatsProfessional = useGet(`/chatMessages/professionalChats.json?professional_id=${props.professionalData.id}`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        if (tabSelected === 1 && clientChats.length === 0) {
            getChatsClient.refetch(`/chatMessages/clientChats.json?client_id=${props.clientData.id}`)
        }

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        console.log(getChatsProfessional.data)
        if (getChatsProfessional.data && getChatsProfessional.data.chatMessages) {
            loadProfessionalsWithBadge(getChatsProfessional.data.chatMessages)
        }
    }, [getChatsProfessional.data])

    useEffect(() => {
        console.log(getChatsClient.data)
        if (getChatsClient.data && getChatsClient.data.chatMessages) {
            loadClientsWithBadge(getChatsClient.data.chatMessages)
        }
    }, [getChatsClient.data])

    useEffect(() => {
        if (props.updateChatBadge) {
            props.chatSetUpdateChatBadge(false)
            loadProfessionalsWithBadge(professionalChats)
            loadClientsWithBadge(clientChats)
        }
    }, [props.updateChatBadge])

    const handleBackPress = async () => {
        if (props.professionalSelected.id) {
            props.professionalSelectedRequest({})
        }
        props.navigation.goBack()
        return true
    }

    const inAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: Dimensions.get('screen').width, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: 0, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()
    }

    const outAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: 0, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()
    }

    const hadleClickTab = (index) => {
        setTabSelected(index)
        if (index === 1 && clientChats.length === 0) {
            getChatsClient.refetch(`/chatMessages/clientChats.json?client_id=${props.clientData.id}`)
        }
        if (index === 1) {
            inAnimation()
        }
        else {
            outAnimation()
        }
    }

    const handleClickItem = (item) => {
        if (tabSelected === 0) {
            props.professionalSelectedRequest({})
            props.clientSelected(item.client)
        }
        else {
            console.log('professional => ', item.professional)
            props.clientSelected({})
            props.professionalSelectedRequest(item.professional)
        }

        props.navigation.navigate('ProfessionalChat')
    }

    const loadProfessionalsWithBadge = (arrayProfessinals) => {
        const results = arrayProfessinals.map(async (item) => {
            let badge = 0;
            try {
                const storageName = `@badgeChat`
                const strBadge = await AsyncStorage.getItem(storageName)
                const arrayBadge = JSON.parse(strBadge)
                if (arrayBadge != null) {
                    const jsonBadge = arrayBadge.find(itemBadge => itemBadge.client_id == item.client_id && itemBadge.professional_id == item.professional_id)
                    if (jsonBadge) {
                        badge = jsonBadge.badge
                    }
                }
            } catch (ex) {
                console.log('loadProfessionalsWithBadge MAP => ', ex)
            }
            return { ...item, badgeValue: badge }
        });

        Promise.all(results).then((arrayCompleted) => setProfessionalChats(arrayCompleted))
    }

    const loadClientsWithBadge = async (arrayClients) => {
        const results = arrayClients.map(async (item) => {
            let badge = 0;
            try {
                const storageName = `@badgeChat`
                const strBadge = await AsyncStorage.getItem(storageName)
                const arrayBadge = JSON.parse(strBadge)
                if (arrayBadge != null) {
                    const jsonBadge = arrayBadge.find(itemBadge => itemBadge.client_id == item.client_id && itemBadge.professional_id == item.professional_id)
                    if (jsonBadge) {
                        badge = jsonBadge.badge
                    }
                }
            } catch (ex) {
                console.log('loadClientsWithBadge MAP => ', ex)
            }
            return { ...item, badgeValue: badge }
        });

        Promise.all(results).then((arrayCompleted) => setClientChats(arrayCompleted))
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title={'Conversas'}
                back={() => props.navigation.goBack()} />

            {doubleUser &&
                <ViewTabControl>
                    <TouchTab
                        activeOpacity={1}
                        onPress={() => hadleClickTab(0)}
                        borderColor={tabSelected === 0 ? gold : purple}
                    >
                        <TxtTab>Meus Clientes</TxtTab>
                    </TouchTab>
                    <TouchTab
                        activeOpacity={1}
                        onPress={() => hadleClickTab(1)}
                        borderColor={tabSelected === 1 ? gold : purple}
                    >
                        <TxtTab>Meus Profissionais</TxtTab>
                    </TouchTab>
                </ViewTabControl>
            }

            {tabSelected === 0 &&
                <ScrollViewContainer>
                    <ViewContainer>
                        {
                            professionalChats.map((item, i) => (
                                <ListItem
                                    key={i}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                    title={
                                        <ViewListItem>
                                            <Text>{item.client.name}</Text>
                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                        </ViewListItem>
                                    }
                                    rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                    leftIcon={
                                        <React.Fragment>
                                            {item.client.photo.length > 0 && <Avatar rounded containerStyle={styles} size={45} source={{ uri: item.client.photo }} />}
                                            {!(item.client.photo.length > 0) && <Avatar rounded containerStyle={styles} size={45} icon={{ name: 'image' }} />}
                                        </React.Fragment>
                                    }
                                    onPress={() => { handleClickItem(item) }}
                                />
                            ))
                        }
                    </ViewContainer>
                </ScrollViewContainer>
            }
            {tabSelected === 1 &&
                <ScrollViewContainer>
                    <ViewContainer>
                        {
                            clientChats.map((item, i) => (
                                <ListItem
                                    key={i}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                    title={
                                        <ViewListItem>
                                            <Text>{item.professional.name}</Text>
                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                        </ViewListItem>
                                    }
                                    rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                    leftIcon={
                                        <React.Fragment>
                                            {item.professional.photo.length > 0 && <Avatar rounded containerStyle={styles} size={45} source={{ uri: item.professional.photo }} />}
                                            {!(item.professional.photo.length > 0) && <Avatar rounded containerStyle={styles} size={45} icon={{ name: 'image' }} />}
                                        </React.Fragment>
                                    }
                                    onPress={() => { handleClickItem(item) }}
                                />
                            ))
                        }
                    </ViewContainer>
                </ScrollViewContainer>
            }

            <Footer
                type={props.userType}
                selected={'chat'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch', {
                    previewScreen: props.route.name,
                })}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                })}
                callsOnPress={() => props.navigation.navigate('CallsList', {
                    previewScreen: props.route.name,
                })}
                perfilOnPress={() => props.navigation.navigate('Perfil', {
                    previewScreen: props.route.name,
                })}
            />
        </React.Fragment>
    )
}

ChatListScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userType: state.auth.userType,
        token: state.auth.token,
        clientData: state.client.client,
        professionalData: state.professional.professional,
        updateChatBadge: state.chat.updateChatBadge,
        professionalSelected: state.professional.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalSelectedRequest: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        clientSelected: (client) => dispatch(ActionCreators.clientSelected(client)),
        chatSetUpdateChatBadge: (updateChatBadge) => dispatch(ActionCreators.chatSetUpdateChatBadge(updateChatBadge)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen)