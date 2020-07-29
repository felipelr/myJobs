import React, { useEffect, useState, useRef } from 'react'
import { BackHandler, Animated, Dimensions, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Avatar, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import Call from '../../components/Call/index'

import { purple, lightgray, white, gold, black, red } from '../../components/common/util/colors'

import {
    styles,
    ScrollViewContainer,
    ViewTabControl,
    TouchTab,
    TxtTab,
    TouchTabStatus,
    TxtTabStatus,
    ScrollViewHorizontal,
    ViewCallDate,
    TxtCallService,
    TxtCallDate,
    ViewListItem,
} from './styles'

function CallsListScreen(props) {
    const [doubleUser] = useState(props.clientData.id && props.professionalData.id)
    const [slideLeft] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [slideStatusLeft] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [slideStatusRight] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [calls, setCalls] = useState([])
    const [finishedCalls, setFinishedCalls] = useState([])
    const [callsClient, setCallsClient] = useState([])
    const [finishedCallsClient, setFinishedCallsClient] = useState([])
    const [tabSelected, setTabSelected] = useState(doubleUser ? 0 : props.userType === 'client' ? 1 : 0) // 0 -> professional; 1 -> client
    const [selectedCall, setSelectedCall] = useState({})
    const [showCall, setShowCall] = useState(false)
    const [statusSelected, setStatusSelected] = useState(0) // 0 -> abertos; 1 -> finalizados
    const [listStatus] = useState([
        {
            id: 0, name: 'Abertos'
        },
        {
            id: 1, name: 'Finalizados'
        }
    ])
    const [callChat, setCallChat] = useState(0)
    const [badgeClient, setBadgeClient] = useState(0)
    const [badgeProfessional, setBadgeProfessional] = useState(0)
    const [badgeClientAbertos, setBadgeClientAbertos] = useState(0)
    const [badgeClientFechados, setBadgeClientFechados] = useState(0)
    const [badgeProfessionalAbertos, setBadgeProfessionalAbertos] = useState(0)
    const [badgeProfessionalFechados, setBadgeProfessionalFechados] = useState(0)

    const routeRef = useRef()

    const getCalls = useGet(`/calls/professional/${props.professionalData.id}.json`, props.token)
    const getFinishedCalls = useGet('', props.token)
    const getCallsClient = useGet('', props.token)
    const getFinishedCallsClient = useGet('', props.token)
    const getCallById = useGet('', props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', async () => {
            if (routeRef.current
                && routeRef.current.params
                && routeRef.current.params.previewScreen === 'ProfessionalChat') {
                if (props.userType === 'client') {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'CategoriesSearch',
                            },
                        ],
                    })
                }
                else {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'ProfessionalHome',
                            },
                        ],
                    })
                }
            }
            else {
                props.navigation.goBack()
            }
            return true
        })

        if (tabSelected === 1 && callsClient.length === 0) {
            getCallsClient.refetch(`/calls/client/${props.clientData.id}.json`)
        }

        if (props.route.params && props.route.params.callId) {
            setCallChat(props.route.params.callId)
        }

        loadCallBadges()

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (callChat && callChat > 0) {
            getCallByIdFunc()
        }
    }, [callChat])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    useEffect(() => {
        if (getCalls.data && getCalls.data.calls) {
            loadCallsWithBadge(getCalls.data.calls, 'calls')
        }
    }, [getCalls.data])

    useEffect(() => {
        if (getFinishedCalls.data && getFinishedCalls.data.calls) {
            loadCallsWithBadge(getFinishedCalls.data.calls, 'finished_calls')
            //verificar se não há calls presentes em finalizados na lista de abertos
            const difference = calls.filter(x => !getFinishedCalls.data.calls.some(y => y.id === x.id));
            loadCallsWithBadge(difference, 'calls')
        }
    }, [getFinishedCalls.data])

    useEffect(() => {
        if (getCallsClient.data && getCallsClient.data.calls) {
            loadCallsWithBadge(getCallsClient.data.calls, 'client_calls')
        }
    }, [getCallsClient.data])

    useEffect(() => {
        if (getFinishedCallsClient.data && getFinishedCallsClient.data.calls) {
            loadCallsWithBadge(getFinishedCallsClient.data.calls, 'finished_client_calls')
            //verificar se não há calls presentes em finalizados na lista de abertos
            const difference = callsClient.filter(x => !getFinishedCallsClient.data.calls.some(y => y.id === x.id));
            loadCallsWithBadge(difference, 'client_calls')
        }
    }, [getFinishedCallsClient.data])

    useEffect(() => {
        if (props.updateCallBadge) {
            props.clientSetUpdateCallBadge(false)
            loadAllLists()
        }
    }, [props.updateCallBadge])

    const loadAllLists = async () => {
        if (doubleUser) {
            await getCalls.refetch(`/calls/professional/${props.professionalData.id}.json`)
            await getCallsClient.refetch(`/calls/client/${props.clientData.id}.json`)
            await getFinishedCalls.refetch(`/calls/professional/${props.professionalData.id}.json?type=2`)
            await getFinishedCallsClient.refetch(`/calls/client/${props.clientData.id}.json?type=2`)
        }
        else if (props.userType === 'client') {
            await getCallsClient.refetch(`/calls/client/${props.clientData.id}.json`)
            await getFinishedCallsClient.refetch(`/calls/client/${props.clientData.id}.json?type=2`)
        }
        else {
            await getCalls.refetch(`/calls/professional/${props.professionalData.id}.json`)
            await getFinishedCalls.refetch(`/calls/professional/${props.professionalData.id}.json?type=2`)
        }
        loadCallBadges()
    }

    const getCallByIdFunc = async () => {
        try {
            const response = await getCallById.refetch(`/calls/view/${callChat}.json`)
            if (response.call) {
                handleClickItem(response.call)
            }
        }
        catch (ex) {
            console.log('ERROR => ', ex.message)
        }
    }

    const loadCallsWithBadge = (arrayCalls, type) => {
        const results = arrayCalls.map(async (item) => {
            let badge = 0;
            try {
                const storageName = `@badgeCall`
                const strBadge = await AsyncStorage.getItem(storageName)
                const arrayBadge = JSON.parse(strBadge)
                if (arrayBadge != null) {
                    console.log('badge ', arrayBadge)
                    const jsonBadge = arrayBadge.find(itemBadge => {
                        console.log('itemBadge', itemBadge)
                        console.log('item', item)
                        return itemBadge.call_id == item.id
                    })
                    if (jsonBadge) {
                        console.log('jsonBadge ', jsonBadge)
                        badge = jsonBadge.badge
                    }
                }
            } catch (ex) {
                console.log('loadCallsWithBadge MAP => ', ex)
            }
            return { ...item, badgeValue: badge }
        });

        Promise.all(results).then((arrayCompleted) => {
            const arrayWhithBadge = arrayCompleted.filter(item => item.badgeValue > 0);
            if (type === 'calls') {
                setCalls(arrayCompleted)
                setBadgeProfessionalAbertos(arrayWhithBadge.length)
            }
            else if (type === 'finished_calls') {
                setFinishedCalls(arrayCompleted)
                setBadgeProfessionalFechados(arrayWhithBadge.length)
            }
            else if (type === 'client_calls') {
                setCallsClient(arrayCompleted)
                setBadgeClientAbertos(arrayWhithBadge.length)
            }
            else if (type === 'finished_client_calls') {
                setFinishedCallsClient(arrayCompleted)
                setBadgeClientFechados(arrayWhithBadge.length)
            }
        })
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

    const inAnimationStatus = () => {
        Animated.spring(slideStatusLeft, {
            toValue: { x: Dimensions.get('screen').width, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()

        Animated.spring(slideStatusRight, {
            toValue: { x: 0, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()
    }

    const outAnimationStatus = () => {
        Animated.spring(slideStatusLeft, {
            toValue: { x: 0, y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()

        Animated.spring(slideStatusRight, {
            toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
            delay: 0,
            tension: 40,
            friction: 10,
        }).start()
    }

    const handleBackPress = () => {
        if (showCall) {
            setShowCall(false)
            setSelectedCall({})
        }
        else {
            props.navigation.goBack()
        }
    }

    const handleClickTab = (index) => {
        setTabSelected(index)
        setStatusSelected(0)
        outAnimationStatus()
        if (index === 1 && callsClient.length === 0) {
            getCallsClient.refetch(`/calls/client/${props.clientData.id}.json`)
        }
        if (index === 1) {
            inAnimation()
        }
        else {
            outAnimation()
        }
    }

    const handleClickItemStatus = (index) => {
        setStatusSelected(index)
        if (tabSelected === 0) {
            if (index === 1 && finishedCalls.length === 0) {
                getFinishedCalls.refetch(`/calls/professional/${props.professionalData.id}.json?type=2`)
            }
        }
        else {
            if (index === 1 && finishedCallsClient.length === 0) {
                getFinishedCallsClient.refetch(`/calls/client/${props.clientData.id}.json?type=2`)
            }
        }

        if (index === 1) {
            inAnimationStatus()
        }
        else {
            outAnimationStatus()
        }
    }

    const handleClickItem = (item) => {
        props.professionalsCleanErrors()
        props.clientClearErrors()
        setSelectedCall(item)
        setShowCall(true)
    }

    const handleCallFinished = (call) => {
        if (tabSelected === 0) {
            loadCallsWithBadge(calls.filter(item => item.id !== call.id), 'calls')
            getFinishedCalls.refetch(`/calls/professional/${props.professionalData.id}.json?type=2`)
        }
        else {
            loadCallsWithBadge(callsClient.filter(item => item.id !== call.id), 'client_calls')
            getFinishedCallsClient.refetch(`/calls/client/${props.clientData.id}.json?type=2`)
        }

        handleBackPress()
    }

    const loadCallBadges = async () => {
        let tempClient = 0;
        let tempProfessional = 0;
        try {
            const storageName = `@badgeCall`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadge = JSON.parse(strBadge)
            if (arrayBadge != null) {
                if (props.professionalData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.professional_id == props.professionalData.id && itemBadge.badge > 0)
                    if (arrayFiltered && arrayFiltered.length > 0) {
                        tempClient = arrayFiltered[0].badge
                    }
                }
                if (props.clientData.id) {
                    const arrayFiltered = arrayBadge.filter(itemBadge => itemBadge.client_id == props.clientData.id && itemBadge.badge > 0)
                    if (arrayFiltered && arrayFiltered.length > 0) {
                        tempProfessional = arrayFiltered[0].badge
                    }
                }
            }
        } catch (ex) {
            console.log('loadChatBadges => ', ex)
        }
        setBadgeClient(tempClient)
        setBadgeProfessional(tempProfessional)
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title={'Chamados'}
                back={() => handleBackPress()} />

            {!showCall &&
                <View style={{ flex: 1 }}>
                    {doubleUser &&
                        <ViewTabControl>
                            <TouchTab
                                activeOpacity={1}
                                onPress={() => handleClickTab(0)}
                                borderColor={tabSelected === 0 ? gold : purple}
                            >
                                <React.Fragment>
                                    <TxtTab>Meus Clientes</TxtTab>
                                    {badgeClient > 0 && <Badge value={badgeClient} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                                </React.Fragment>
                            </TouchTab>
                            <TouchTab
                                activeOpacity={1}
                                onPress={() => handleClickTab(1)}
                                borderColor={tabSelected === 1 ? gold : purple}
                            >
                                <React.Fragment>
                                    <TxtTab>Meus Profissionais</TxtTab>
                                    {badgeProfessional > 0 && <Badge value={badgeProfessional} status="success" containerStyle={{ position: 'absolute', top: -4, right: 8 }} />}
                                </React.Fragment>
                            </TouchTab>
                        </ViewTabControl>
                    }

                    {tabSelected === 0 &&
                        <Animated.View style={{ ...slideLeft.getLayout(), flex: 1 }}>
                            <View>
                                <ScrollViewHorizontal>
                                    {listStatus.map((item, i) => (
                                        <TouchTabStatus key={i} onPress={() => handleClickItemStatus(i)} backgroundColor={i === statusSelected ? black : lightgray}>
                                            <React.Fragment>
                                                <TxtTabStatus color={i === statusSelected ? white : black}>{item.name}</TxtTabStatus>
                                                {(i === 0 && badgeProfessionalAbertos > 0) && <Badge value={badgeProfessionalAbertos} status="success" containerStyle={{ position: 'absolute', top: 4, right: 8 }} />}
                                                {(i === 1 && badgeProfessionalFechados > 0) && <Badge value={badgeProfessionalFechados} status="success" containerStyle={{ position: 'absolute', top: 4, right: 8 }} />}
                                            </React.Fragment>
                                        </TouchTabStatus>
                                    ))}
                                </ScrollViewHorizontal>
                                <ScrollViewContainer>
                                    <Animated.View style={slideStatusLeft.getLayout()}>
                                        {statusSelected === 0 && calls.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                                title={
                                                    <React.Fragment>
                                                        <ViewCallDate>
                                                            <TxtCallService>{item.service.title}</TxtCallService>
                                                            <TxtCallDate>{Moment(item.created).format('DD/MM/YYYY')}</TxtCallDate>
                                                        </ViewCallDate>
                                                        <ViewListItem>
                                                            <Text style={{ fontWeight: item.badgeValue ? "bold" : "normal" }}>{item.client.name}</Text>
                                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                                        </ViewListItem>
                                                    </React.Fragment>
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
                                        ))}
                                    </Animated.View>
                                    <Animated.View style={slideStatusRight.getLayout()}>
                                        {statusSelected === 1 && finishedCalls.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                                title={
                                                    <React.Fragment>
                                                        <ViewCallDate>
                                                            <TxtCallService>{item.service.title}</TxtCallService>
                                                            <TxtCallDate>{Moment(item.created).format('DD/MM/YYYY')}</TxtCallDate>
                                                        </ViewCallDate>
                                                        <ViewListItem>
                                                            <Text style={{ fontWeight: item.badgeValue ? "bold" : "normal" }}>{item.client.name}</Text>
                                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                                        </ViewListItem>
                                                    </React.Fragment>
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
                                        ))}
                                    </Animated.View>
                                </ScrollViewContainer>
                            </View>
                        </Animated.View>
                    }
                    {tabSelected === 1 &&
                        <Animated.View style={{ ...slideRight.getLayout(), flex: 1 }}>
                            <View>
                                <ScrollViewHorizontal>
                                    {listStatus.map((item, i) => (
                                        <TouchTabStatus key={i} onPress={() => handleClickItemStatus(i)} backgroundColor={i === statusSelected ? black : lightgray}>
                                            <React.Fragment>
                                                <TxtTabStatus color={i === statusSelected ? white : black}>{item.name}</TxtTabStatus>
                                                {(i === 0 && badgeClientAbertos > 0) && <Badge value={badgeClientAbertos} status="success" containerStyle={{ position: 'absolute', top: 4, right: 8 }} />}
                                                {(i === 1 && badgeClientFechados > 0) && <Badge value={badgeClientFechados} status="success" containerStyle={{ position: 'absolute', top: 4, right: 8 }} />}
                                            </React.Fragment>
                                        </TouchTabStatus>
                                    ))}
                                </ScrollViewHorizontal>
                                <ScrollViewContainer>
                                    <Animated.View style={slideStatusLeft.getLayout()}>
                                        {statusSelected === 0 && callsClient.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                                title={
                                                    <React.Fragment>
                                                        <ViewCallDate>
                                                            <TxtCallService>{item.service.title}</TxtCallService>
                                                            <TxtCallDate>{Moment(item.created).format('DD/MM/YYYY')}</TxtCallDate>
                                                        </ViewCallDate>
                                                        <ViewListItem>
                                                            <Text style={{ fontWeight: item.badgeValue ? "bold" : "normal" }}>{item.professional.name}</Text>
                                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                                        </ViewListItem>
                                                    </React.Fragment>
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
                                        ))}
                                    </Animated.View>
                                    <Animated.View style={slideStatusRight.getLayout()}>
                                        {statusSelected === 1 && finishedCallsClient.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray, padding: 10 }}
                                                title={
                                                    <React.Fragment>
                                                        <ViewCallDate>
                                                            <TxtCallService>{item.service.title}</TxtCallService>
                                                            <TxtCallDate>{Moment(item.created).format('DD/MM/YYYY')}</TxtCallDate>
                                                        </ViewCallDate>
                                                        <ViewListItem>
                                                            <Text style={{ fontWeight: item.badgeValue ? "bold" : "normal" }}>{item.professional.name}</Text>
                                                            {item.badgeValue > 0 && <Badge value={item.badgeValue} status="success" />}
                                                        </ViewListItem>
                                                    </React.Fragment>
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
                                        ))}
                                    </Animated.View>
                                </ScrollViewContainer>
                            </View>
                        </Animated.View>
                    }
                </View>
            }
            {showCall &&
                <Call call={selectedCall} onFinished={(rating) => handleCallFinished(rating)} />
            }

            <Footer
                type={props.userType}
                selected={'calls'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch', {
                    previewScreen: props.route.name,
                })}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                })}
                perfilOnPress={() => props.navigation.navigate('Perfil', {
                    previewScreen: props.route.name,
                })}
                chatOnPress={() => props.navigation.navigate('ChatList', {
                    previewScreen: props.route.name,
                })}
                favoriteOnPress={() => props.navigation.navigate('Favorite', {
                    previewScreen: props.route.name,
                })}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userType: state.auth.userType,
        token: state.auth.token,
        professionalData: state.professional.professional,
        clientData: state.client.client,
        updateCallBadge: state.client.updateCallBadge,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalsCleanErrors: () => dispatch(ActionCreators.professionalsCleanErrors()),
        clientClearErrors: () => dispatch(ActionCreators.clientClearErrors()),
        clientSetUpdateCallBadge: (updateChatBadge) => dispatch(ActionCreators.clientSetUpdateCallBadge(updateChatBadge)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallsListScreen)