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

function ClientListChatScreen(props) {
    const [chats, setChats] = useState([])

    const getChatsClient = useGet(`/chatMessages/clientChats.json?client_id=${props.clientData.id}`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        console.log(getChatsClient.data)
        if (getChatsClient.data && getChatsClient.data.chatMessages) {
            setChats(getChatsClient.data.chatMessages)
        }
    }, [getChatsClient.data])

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleClickItem = (item) => {
        props.professionalSelected(item.professional)
        props.navigation.navigate('ProfessionalChat')
    }

    return (
        <React.Fragment>
            <StatusBar backgroundColor={purple} />
            <HeaderJobs
                title={'Conversas'}
                back={() => props.navigation.goBack()} />
            <ScrollViewContainer>
                <ViewContainer>
                    {
                        chats.map((item, i) => (
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
            <Footer
                type={props.userType}
                selected={'chat'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                perfilOnPress={() => props.navigation.navigate('Perfil')}
            />
        </React.Fragment>
    )
}

ClientListChatScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userType: state.auth.userType,
        token: state.auth.token,
        clientData: state.client.client,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListChatScreen)