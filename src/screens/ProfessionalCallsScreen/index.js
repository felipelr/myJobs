import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'

import { purple, lightgray, gold } from '../../components/common/util/colors'

import {
    styles,
    ScrollViewContainer,
    ViewContainer,
    ViewTabControl,
    TouchTab,
    TxtTab,
} from './styles'

function ProfessionalCallsScreen(props) {
    const [calls, setCalls] = useState([])
    const [finishedCalls, setFinishedCalls] = useState([])
    const [tabSelected, setTabSelected] = useState(0)

    const getCalls = useGet(`/calls/professional/${props.professionalData.id}.json?`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (getCalls.data && getCalls.data.calls) {
            setCalls(getCalls.data.calls)
        }
    }, [getCalls.data])

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleClickItem = (item) => {
        //props.clientSelected(item.client)
        //props.navigation.navigate('ProfessionalChat')
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title={'Chamados'}
                back={() => props.navigation.goBack()} />

            <ViewTabControl>
                <TouchTab
                    activeOpacity={1}
                    onPress={() => setTabSelected(0)}
                    borderColor={tabSelected === 0 ? gold : purple}
                >
                    <TxtTab>ABERTOS</TxtTab>
                </TouchTab>
                <TouchTab
                    activeOpacity={1}
                    onPress={() => setTabSelected(1)}
                    borderColor={tabSelected === 1 ? gold : purple}
                >
                    <TxtTab>FINALIZADOS</TxtTab>
                </TouchTab>
            </ViewTabControl>
            <ScrollViewContainer>
                <ViewContainer>
                    {tabSelected === 0 && calls.map((item, i) => (
                        <ListItem
                            key={i}
                            containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                            title={item.client.name}
                            rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                            leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.client.photo }} />}
                            onPress={() => { handleClickItem(item) }}
                        />
                    ))}
                    {tabSelected === 1 && finishedCalls.map((item, i) => (
                        <ListItem
                            key={i}
                            containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                            title={item.client.name}
                            rightIcon={<Icon name="chevron-right" size={20} color={purple} />}
                            leftIcon={<Avatar rounded containerStyle={styles} size={45} source={{ uri: item.client.photo }} />}
                            onPress={() => { handleClickItem(item) }}
                        />
                    ))}
                </ViewContainer>
            </ScrollViewContainer>
            <Footer
                type={props.userType}
                selected={'favorite'}
                homeOnPress={() => props.navigation.navigate('ProfessionalHome')}
                perfilOnPress={() => props.navigation.navigate('Perfil')}
                chatOnPress={() => props.navigation.navigate('ProfessionalListChat')}
            />
        </React.Fragment>
    )
}

ProfessionalCallsScreen.navigationOptions = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalCallsScreen)