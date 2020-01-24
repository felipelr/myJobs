import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ActionCreators from '../../store/actionCreators'


import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'

import {
    styles,
    ScrollViewContainer,
    ViewContainer
} from './styles'

function ProfessionalListChatScreen(props) {

    const [clientList] = useState([])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleClickItem = (client) => {

    }

    return (
        <React.Fragment>
            <HeaderJobs
                title={'Chat'}
                back={() => props.navigation.goBack()} />
            <ScrollViewContainer>
                <ViewContainer>
                    {
                        clientList.map((item, i) => (
                            <ListItem
                                key={i}
                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                title={item.title}
                                rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                                leftIcon={<Avatar rounded containerStyle={styles} size={120} />}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientUpdateSuccess: (dados) => dispatch(ActionCreators.clientUpdateSuccess(dados)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalListChatScreen)