import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Alert, Animated, Dimensions, Platform, KeyboardAvoidingView } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'
import useGet from '../../services/restServices'

import {
    ViewContainer,
    ScrollViewContainer,
    ContainerLista,
} from './styles'

import { lightgray, purple } from '../common/util/colors'

import HeaderJobs from '../../components/HeaderJobs/index'
import TextInputJobs from '../../components/TextInputJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'
import ButtonPurple from '../ButtonPurple'

const MyAddress = (props) => {
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [alterar, setAlterar] = useState(false)
    const [newRequest, setNewRequest] = useState(false)
    const [titleHeader, setTitleHeader] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedState, setSelectedState] = useState(25)
    const [invalidField, setInvalidField] = useState('')
    const [form, setForm] = useState(props.userType === 'client' ?
        {
            client_id: props.client.id,
            city_id: 0,
            street: '',
            street_number: '',
            neighborhood: ''
        }
        :
        {
            professional_id: props.professional.id,
            city_id: 0,
            street: '',
            street_number: '',
            neighborhood: ''
        })

    const streetNumberRef = useRef()
    const neighborhoodRef = useRef()

    const getStates = useGet(`/states/index.json`, props.token)
    const getCities = useGet(`/cities/index/${selectedState}.json`, props.token)

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (getCities)
            getCities.refetch(`/cities/index/${selectedState}.json`)
    }, [selectedState])

    useEffect(() => {
        if (newRequest && !props.isUpdating) {
            if (props.errorUpdating)
                setNewRequest(false)
            else {
                gotoAddressList()
            }
        }
    }, [props.isUpdating])

    const handleNewAddressClick = () => {
        setAlterar(false)
        if (props.userType === 'client') {
            setForm({
                client_id: props.client.id,
                city_id: 0,
                street: '',
                street_number: '',
                neighborhood: ''
            })
        }
        else {
            setForm({
                professional_id: props.professional.id,
                city_id: 0,
                street: '',
                street_number: '',
                neighborhood: ''
            })
        }
        setSelectedState(25)
        setTitleHeader('Novo Endereço')
        setShowForm(true)
        props.ownProps.changeVisiblityPerfilHeader(false)
        inAnimation()
    }

    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    const validateField = (name, text) => {
        switch (name) {
            case 'street':
            case 'street_number':
            case 'neighborhood':
                if (text < 1)
                    return false
                break
            default:
                break
        }
        return true
    }

    const gotoAddressList = () => {
        setShowForm(false)
        props.ownProps.changeVisiblityPerfilHeader(true)
        outAnimation()
    }

    const handleClickConfimar = () => {
        if (invalidField === '' && form.city_id !== 0) {
            setNewRequest(true)
            if (props.userType === 'client') {
                if (alterar)
                    props.editClientAddress(props.token, form)
                else
                    props.addNewClientAddress(props.token, form)
            }
            else {
                if (alterar)
                    props.editProfessionalAddress(props.token, form)
                else
                    props.addNewProfessionalAddress(props.token, form)
            }
        }
    }

    const handleAddressClick = (addressId) => {
        if (props.userType === 'client') {
            const clientAddress = props.client.clientsAddresses.filter((item) => item.id === addressId)
            if (clientAddress) {
                setAlterar(true)
                setForm(clientAddress[0])
                setTitleHeader('Alterar Endereço')
                setSelectedState(clientAddress[0].city.state.id)
                setShowForm(true)
                props.ownProps.changeVisiblityPerfilHeader(false)
                inAnimation()
            }
        }
        else {
            const professionalAddress = props.professional.professionalsAddresses.filter((item) => item.id === addressId)
            if (professionalAddress) {
                setAlterar(true)
                setForm(professionalAddress[0])
                setTitleHeader('Alterar Endereço')
                setSelectedState(professionalAddress[0].city.state.id)
                setShowForm(true)
                props.ownProps.changeVisiblityPerfilHeader(false)
                inAnimation()
            }
        }
    }

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

    const handleDeleteClick = (id) => {
        Alert.alert(
            'Atenção',
            'Confirma a exclusão deste endereço?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        setNewRequest(true)
                        if (props.userType === 'client')
                            props.deleteClientAddress(props.token, id)
                        else
                            props.deleteProfessionalAddress(props.token, id)
                    }
                }
            ],
            {
                cancelable: false
            }
        )
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            {
                showForm && (
                    <HeaderJobs
                        title={titleHeader}
                        back={gotoAddressList}
                    />
                )
            }
            <ViewContainer>
                <ScrollViewContainer keyboardShouldPersistTaps='always'>
                    <View>
                        {props.isUpdating && <Loading size='large' color={purple} height='330' error={props.errorUpdating} />}

                        {(!props.isUpdating && !showForm) && (
                            <Animated.View style={slideRight.getLayout()}>
                                <ContainerLista>
                                    {
                                        (props.userType === 'client' && props.client.clientsAddresses) && props.client.clientsAddresses.map((address) => (
                                            <ListItem
                                                key={address.id}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                title={address.street + ', ' + address.street_number}
                                                rightIcon={<Icon name="chevron-right" size={30} color={purple} />}
                                                leftElement={
                                                    <TouchableOpacity onPress={() => handleDeleteClick(address.id)}>
                                                        <Icon name="delete" size={30} color={purple} />
                                                    </TouchableOpacity>
                                                }
                                                onPress={() => handleAddressClick(address.id)}
                                            />
                                        ))
                                    }
                                    {
                                        (props.userType !== 'client' && props.professional.professionalsAddresses) && props.professional.professionalsAddresses.map((address) => (
                                            <ListItem
                                                key={address.id}
                                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                title={address.street + ', ' + address.street_number}
                                                rightIcon={<Icon name="chevron-right" size={30} color={purple} />}
                                                leftElement={
                                                    <TouchableOpacity onPress={() => handleDeleteClick(address.id)}>
                                                        <Icon name="delete" size={30} color={purple} />
                                                    </TouchableOpacity>
                                                }
                                                onPress={() => handleAddressClick(address.id)}
                                            />
                                        ))
                                    }
                                    <ListItem
                                        key={0}
                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                        title={'Novo Endereço'}
                                        rightIcon={<Icon name="add" size={30} color={purple} />}
                                        onPress={() => handleNewAddressClick()}
                                    />
                                </ContainerLista>
                            </Animated.View>
                        )}

                        {(!props.isUpdating && showForm) && (
                            <Animated.View style={slideLeft.getLayout()}>
                                <KeyboardAvoidingView behavior={behavior}>
                                    <ContainerLista>
                                        {props.errorUpdating && <TextError>{props.errorMessage}</TextError>}

                                        <TextInputJobs
                                            value={form.street}
                                            name='street'
                                            onChangeText={handleOnChange}
                                            placeholder='Rua, Av, etc'
                                            invalidValue={invalidField === 'street'}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => streetNumberRef.current.focus()} />

                                        <TextInputJobs
                                            ref={input => streetNumberRef.current = input}
                                            value={form.street_number}
                                            name='street_number'
                                            onChangeText={handleOnChange}
                                            placeholder='Número'
                                            keyboardType='phone-pad'
                                            invalidValue={invalidField === 'street_number'}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => neighborhoodRef.current.focus()} />

                                        <TextInputJobs
                                            ref={input => neighborhoodRef.current = input}
                                            value={form.neighborhood}
                                            name='neighborhood'
                                            onChangeText={handleOnChange}
                                            placeholder='Bairro'
                                            invalidValue={invalidField === 'neighborhood'}
                                            returnKeyType="next" />

                                        <PickerJobs
                                            selectedValue={selectedState}
                                            onValueChange={(state, itemIndex) => {
                                                if (state) {
                                                    setSelectedState(state)
                                                }
                                            }}
                                            itemsList={getStates.data.states ? getStates.data.states : []} />

                                        <PickerJobs
                                            selectedValue={form.city_id}
                                            onValueChange={(city, itemIndex) => {
                                                if (city) {
                                                    setForm({
                                                        ...form,
                                                        city_id: city
                                                    })
                                                }
                                            }}
                                            itemsList={getCities.data.cities ? [{ id: 0, name: 'SELECIONE' }, ...getCities.data.cities] : [{ id: 0, name: 'SELECIONE' }]} />

                                        <View style={{ width: 170, alignSelf: 'center' }}>
                                            <ButtonPurple onPress={handleClickConfimar} icon="check">Confirmar</ButtonPurple>
                                        </View>
                                    </ContainerLista>
                                </KeyboardAvoidingView>
                            </Animated.View>
                        )}

                    </View>
                </ScrollViewContainer>
            </ViewContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        client: state.client.client,
        professional: state.professional.professional,
        isUpdating: state.auth.userType === 'client' ? state.client.isUpdating : state.professional.isUpdating,
        errorUpdating: state.auth.userType === 'client' ? state.client.errorUpdating : state.professional.errorUpdating,
        errorMessage: state.auth.userType === 'client' ? state.client.errorMessage : state.professional.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewClientAddress: (token, clientAddress) => dispatch(ActionCreators.addNewClientAddress(token, clientAddress)),
        editClientAddress: (token, clientAddress) => dispatch(ActionCreators.editClientAddress(token, clientAddress)),
        deleteClientAddress: (token, id) => dispatch(ActionCreators.deleteClientAddress(token, id)),
        addNewProfessionalAddress: (token, professionalAddress) => dispatch(ActionCreators.addNewProfessionalAddress(token, professionalAddress)),
        editProfessionalAddress: (token, professionalAddress) => dispatch(ActionCreators.editProfessionalAddress(token, professionalAddress)),
        deleteProfessionalAddress: (token, id) => dispatch(ActionCreators.deleteProfessionalAddress(token, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress)