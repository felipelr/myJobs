import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'

import { purple, lightgray } from '../../components/common/util/colors'

import {
    styles,
    ScrollViewContainer,
    ViewContainer
} from './styles'

function ChatListScreen(props) {
    const [professionalChats, setProfessionalChats] = useState([])
    const [clientChats, setClientChats] = useState([])
    const [tabSelected, setTabSelected] = useState(0)

    const getChatsClient = useGet(``, props.token)
    const getChatsProfessional = useGet(`/chatMessages/professionalChats.json?professional_id=${props.professionalData.id}`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

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

    const hadleClickTab = (tab) => {
        setTabSelected(tab)
        if (tab === 1 && clientChats.length === 0) {
            getChatsClient.refetch(`/chatMessages/clientChats.json?client_id=${props.clientData.id}`)
        }
    }

    const handleClickItem = (item) => {
        if (tab === 0)
            props.clientSelected(item.client)
        else
            props.professionalSelected(item.professional)

        props.navigation.navigate('ProfessionalChat')
    }

    return (
        <React.Fragment>
            <StatusBar backgroundColor={purple} />
            <HeaderJobs
                title={'Conversas'}
                back={() => props.navigation.goBack()} />
            <ViewTabControl>
                <TouchTab
                    activeOpacity={1}
                    onPress={() => hadleClickTab(0)}
                    borderColor={tabSelected === 0 ? gold : purple}
                >
                    <TxtTab>PROFISSIONAL</TxtTab>
                </TouchTab>
                <TouchTab
                    activeOpacity={1}
                    onPress={() => hadleClickTab(1)}
                    borderColor={tabSelected === 1 ? gold : purple}
                >
                    <TxtTab>CLIENTE</TxtTab>
                </TouchTab>
            </ViewTabControl>
            {tabSelected === 0 && professionalChats.map((item, i) => (
                <ScrollViewContainer>
                    <ViewContainer>
                        {
                            professionalChats.map((item, i) => (
                                <ListItem
                                    key={i}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                    title={item.client.name}
                                    rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                    leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.professional.photo }} />}
                                    onPress={() => { handleClickItem(item) }}
                                />
                            ))
                        }
                    </ViewContainer>
                </ScrollViewContainer>
            ))}
            {tabSelected === 1 && clientChats.map((item, i) => (
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
            ))}

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