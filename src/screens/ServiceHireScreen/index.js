import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    TextHireService,
    ViewCardContainer,
    ViewContainerConfirmar,
    TextName,
    TexService,
} from './styles'

import Footer from '../../components/Footer/index'
import CardJobs from '../../components/CardJobs/index'
import TextInputJobs from '../../components/TextInputJobs/index'
import Loading from '../../components/Loading/index'
import TextError from '../../components/TextError/index'
import ButtonPurple from '../../components/ButtonPurple/index'

function ServiceHireScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [invalidField, setInvalidField] = useState('')
    const [requisitou, setRequisitou] = useState(false)
    const [form, setForm] = useState({
        client_id: props.client.id,
        service_id: 18,
        client_address_id: (props.enderecos && props.enderecos.length > 0) ? props.enderecos[0].id : 0,
        quantity: "",
        description: "",
    })

    const scrollViewContainer = useRef(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', async () => {
            props.navigation.navigate('CategoriesSearch')
            return true
        })
        const kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        const knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            backHandler.remove()
            kbShow.remove()
            knHide.remove()
        }
    }, [])

    useEffect(() => {
        if (requisitou && !props.clientCtr.isUpdating) {
            if (props.clientCtr.errorUpdating) {
                setRequisitou(false)
                scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                props.navigation.navigate('CategoriesSearch')
            }
        }
    }, [props.clientCtr.isUpdating])

    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    validateField = (field, value) => {
        switch (field) {
            case 'quantity':
                if (value <= 0)
                    return false
                break
            default:
                break
        }
        return true
    }

    handleClickConfimar = () => {
        if (invalidField === '') {
            setRequisitou(true)
            props.clientNewServiceOrderRequest(props.token, form)
        }
    }

    handleAddressOnPress = (id) => {
        setForm({
            ...form,
            client_address_id: id
        })
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <ScrollViewContainer ref={scrollViewContainer}>
                    <View style={{ flex: 1 }}>
                        <ViewCardContainer>
                            {props.clientCtr.isUpdating && <Loading size='large' color={purple} height='330' error={props.clientCtr.errorUpdating} />}

                            {props.clientCtr.errorUpdating && <TextError>{props.clientCtr.errorMessage}</TextError>}

                            {!props.clientCtr.isUpdating && (
                                <React.Fragment>
                                    <TextHireService>Falta pouco...</TextHireService>
                                    <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                                        <React.Fragment>
                                            <TexService>Serviço</TexService>
                                            <TextName>Violão</TextName>
                                            <TexService>Cliente</TexService>
                                            <TextName>{props.client.name}</TextName>
                                            <TextName>{props.client.phone}</TextName>
                                            <TexService>Endereço</TexService>
                                            {(props.enderecos && props.enderecos.length > 0) && props.enderecos.map((item) =>
                                                <CheckBox
                                                    key={item.id}
                                                    title={item.street + ', ' + item.street_number}
                                                    checkedColor='purple'
                                                    checked={item.id === form.client_address_id}
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon='circle-o'
                                                    onPress={() => handleAddressOnPress(item.id)}
                                                />)}

                                            <TextInputJobs
                                                style={{ marginTop: 15 }}
                                                name='quantity'
                                                placeholder='Quantidade de orçamentos'
                                                value={form.quantity}
                                                onChangeText={handleOnChange}
                                                invalidValue={invalidField === 'quantity'}
                                                keyboardType='phone-pad' />

                                            <TextInputJobs
                                                name='description'
                                                placeholder='Descreva brevemente o serviço desejado.'
                                                value={form.description}
                                                onChangeText={handleOnChange}
                                                invalidValue={invalidField === 'description'}
                                                multiline={true}
                                                numberOfLines={2} />

                                            <ViewContainerConfirmar>
                                                <ButtonPurple onPress={handleClickConfimar}>Confirmar Orçamentos</ButtonPurple>
                                            </ViewContainerConfirmar>
                                        </React.Fragment>
                                    </CardJobs>
                                </React.Fragment>
                            )}
                        </ViewCardContainer>
                    </View>
                </ScrollViewContainer>
            </KeyboardAvoidingView>
            <Footer
                perfilOnPress={() => props.navigation.navigate('Perfil')}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')} />
        </React.Fragment>
    )
}

ServiceHireScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        client: state.client.client,
        clientCtr: state.client,
        enderecos: state.client.client.clientsAddresses,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientNewServiceOrderRequest: (token, serviceOrder) => dispatch(ActionCreators.clientNewServiceOrderRequest(token, serviceOrder)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceHireScreen)