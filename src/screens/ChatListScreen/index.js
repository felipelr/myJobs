import React, { useEffect, useState, useRef } from 'react'
import { BackHandler, Animated, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'

import { purple, lightgray, white } from '../../components/common/util/colors'

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

    const refBadgeArray = useRef()

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
            setProfessionalChats(getChatsProfessional.data.chatMessages)
        }
    }, [getChatsProfessional.data])

    useEffect(() => {
        console.log(getChatsClient.data)
        if (getChatsClient.data && getChatsClient.data.chatMessages) {
            setClientChats(getChatsClient.data.chatMessages)
        }
    }, [getChatsClient.data])

    const handleBackPress = async () => {
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
            props.professionalSelected({})
            props.clientSelected(item.client)
        }
        else {
            props.clientSelected({})
            props.professionalSelected(item.professional)
        }

        cleanBadge()

        props.navigation.navigate('ProfessionalChat')
    }

    const cleanBadge = async () => {
        try {
            const storageName = `@badge_c_${item.client_id}_p_${item.professional_id}`
            await AsyncStorage.setItem(storageName, "0");
        } catch (e) {
            return ''
        }
    }

    const loadBadge = async (item) => {
        try {
            const storageName = `@badge_c_${item.client_id}_p_${item.professional_id}`
            const strBadge = await AsyncStorage.getItem(storageName)
            let badge = 0;
            console.log('strBadge', strBadge, 'storageName =>', storageName)
            if (strBadge != null) {
                badge = parseInt(strBadge);
            }
            refBadgeArray.current.push({
                client_id: item.client_id,
                professional_id: item.professional_id,
                badge: badge
            })
            console.log('loadBadge', refBadgeArray.current)
        } catch (e) {
            return ''
        }
    }

    const renderBadge = (item, array) => {
        const arrayBadge = array.filter(element => item.client_id == element.client_id && item.professional_id == element.professional_id)
            .map((element, index) => <Badge key={index} value={element.badge} status="success" />)
        return arrayBadge;
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
                        borderColor={tabSelected === 0 ? purple : white}
                    >
                        <TxtTab>PROFISSIONAL</TxtTab>
                    </TouchTab>
                    <TouchTab
                        activeOpacity={1}
                        onPress={() => hadleClickTab(1)}
                        borderColor={tabSelected === 1 ? purple : white}
                    >
                        <TxtTab>CLIENTE</TxtTab>
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
                                        </ViewListItem>
                                    }
                                    rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                    leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.client.photo }} />}
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
                                    title={item.professional.name}
                                    rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                    leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.professional.photo }} />}
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
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                perfilOnPress={() => props.navigation.navigate('Perfil')}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        clientSelected: (client) => dispatch(ActionCreators.clientSelected(client)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen)