import React, { useEffect, useState, useRef } from 'react'
import { BackHandler, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import Call from '../../components/Call/index'

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
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [calls, setCalls] = useState([])
    const [finishedCalls, setFinishedCalls] = useState([])
    const [tabSelected, setTabSelected] = useState(0)
    const [selectedCall, setSelectedCall] = useState({})
    const [showCall, setShowCall] = useState(false)

    const getCalls = useGet(`/calls/professional/${props.professionalData.id}.json`, props.token)
    const getFinishedCalls = useGet('', props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', async () => {
            props.navigation.goBack()
            return true
        })

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (getCalls.data && getCalls.data.calls) {
            setCalls(getCalls.data.calls)
        }
    }, [getCalls.data])

    useEffect(() => {
        if (getFinishedCalls.data && getFinishedCalls.data.calls) {
            setFinishedCalls(getFinishedCalls.data.calls)
        }
    }, [getFinishedCalls.data])

    const inAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
            delay: 0
        }).start()
    }

    const outAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: Dimensions.get('screen').width, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()
    }

    const handleBackPress = () => {
        if (showCall) {
            setShowCall(false)
            setSelectedCall({})
            outAnimation()
        }
        else {
            props.navigation.goBack()
        }
    }

    const hadleClickTab = (tab) => {
        setTabSelected(tab)
        if (tab === 1 && finishedCalls.length === 0) {
            getFinishedCalls.refetch(`/calls/professional/${props.professionalData.id}.json?type=2`)
        }
    }

    const handleClickItem = (item) => {
        setSelectedCall(item)
        setShowCall(true)
        inAnimation()
    }

    const handleCallFinished = (call) => {
        setFinishedCalls([...finishedCalls, call])
        setCalls(calls.filter(item => item.id !== call.id))
        handleBackPress()
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title={'Chamados'}
                back={() => handleBackPress()} />

            <ScrollViewContainer>
                <ViewContainer>
                    {!showCall &&
                        <Animated.View style={slideRight.getLayout()}>
                            <React.Fragment>
                                <ViewTabControl>
                                    <TouchTab
                                        activeOpacity={1}
                                        onPress={() => hadleClickTab(0)}
                                        borderColor={tabSelected === 0 ? gold : purple}
                                    >
                                        <TxtTab>ABERTOS</TxtTab>
                                    </TouchTab>
                                    <TouchTab
                                        activeOpacity={1}
                                        onPress={() => hadleClickTab(1)}
                                        borderColor={tabSelected === 1 ? gold : purple}
                                    >
                                        <TxtTab>FINALIZADOS</TxtTab>
                                    </TouchTab>
                                </ViewTabControl>
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
                            </React.Fragment>
                        </Animated.View>
                    }
                    {showCall &&
                        <Animated.View style={slideLeft.getLayout()}>
                            <React.Fragment>
                                <Call call={selectedCall} onFinished={(call) => handleCallFinished(call)} />
                            </React.Fragment>
                        </Animated.View>
                    }
                </ViewContainer>
            </ScrollViewContainer>

            <Footer
                type={props.userType}
                selected={'calls'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
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