import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
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

function ProfessionalListChatScreen(props) {
    const [chats, setChats] = useState([])

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
            setChats(getChatsProfessional.data.chatMessages)
        }
    }, [getChatsProfessional.data])

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleClickItem = (item) => {
        props.clientSelected(item.client)
        props.navigation.navigate('ProfessionalChat')
    }

    return (
        <React.Fragment>
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
                                title={item.client.name}
                                rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.client.photo }} />}
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

ProfessionalListChatScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userType: state.auth.userType,
        token: state.auth.token,
        professionalData: state.professional.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientSelected: (client) => dispatch(ActionCreators.clientSelected(client)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalListChatScreen)