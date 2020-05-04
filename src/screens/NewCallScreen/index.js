import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler } from 'react-native'
import { connect } from 'react-redux'

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
import useGet from '../../services/restServices';
import PickerJobs from '../../components/PickerJobs'

function NewCallScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [invalidField, setInvalidField] = useState('')
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [services, setServices] = useState([])
    const [requisitou, setRequisitou] = useState(false)
    const [form, setForm] = useState({
        client_id: props.client.id,
        professional_id: props.professional.id,
        service_id: 0,
        description: "",
        subcategory_id: 0,
    })

    const getCategory = useGet(`/categories/getByIdProfessional/${props.professional.id}.json`, props.token)
    const getSubcategories = useGet('', props.token);
    const getServices = useGet('', props.token);

    const scrollViewRef = useRef()

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', async () => {
            props.navigation.goBack()
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
        if (requisitou && !props.professionalCtr.loading) {
            if (props.professionalCtr.error) {
                setRequisitou(false)
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            }
            else {
                //finalizar com sucesso
                props.navigation.goBack()
            }
        }
    }, [props.professionalCtr.loading])

    useEffect(() => {
        if (getCategory.data && getCategory.data.categories && getCategory.data.categories[0].id > 0) {
            setCategories(getCategory.data.categories)
            getSubcategories.refetch(`/subcategories/getByCategory/${getCategory.data.categories[0].id}.json?professional_id=${props.professional.id}`);
        }
    }, [getCategory.data]) //Quando trocar a categoria selecionada

    useEffect(() => {
        if (getSubcategories.data) {
            if (getSubcategories.data.subcategories) {
                setSubcategories(getSubcategories.data.subcategories.map(item => {
                    return {
                        id: item.id,
                        name: item.description
                    }
                }))
                setForm({ ...form, 'subcategory_id': getSubcategories.data.subcategories[0].id })
            }
            else {
                setSubcategories([])
                setForm({ ...form, 'subcategory_id': 0 })
            }
        }
    }, [getSubcategories.data])

    useEffect(() => {
        if (getServices.data) {
            if (getServices.data.services) {
                setServices(getServices.data.services.map(item => {
                    return {
                        id: item.id,
                        name: item.title
                    }
                }))
                setForm({ ...form, 'service_id': getServices.data.services[0].id })
            }
            else {
                setServices([])
                setForm({ ...form, 'service_id': 0 })
            }
        }
    }, [getServices.data])

    useEffect(() => {
        if (form.subcategory_id != 0) {
            getServices.refetch(`/services/getBySubcategory/${form.subcategory_id}.json?professional_id=${props.professional.id}`);
        }
    }, [form.subcategory_id])


    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        setInvalidField('')
    }

    const handleClickConfimar = () => {
        setRequisitou(true)
        props.newProfessionalCallRequest(props.token, form)
    }


    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <ScrollViewContainer ref={(c) => scrollViewRef.current = c}>
                    <View style={{ flex: 1 }}>
                        <ViewCardContainer>
                            {props.professionalCtr.loading && <Loading size='large' color={purple} height='330' error={props.professionalCtr.error} />}

                            {props.professionalCtr.error && <TextError>{props.professionalCtr.errorMessage}</TextError>}

                            {!props.professionalCtr.loading && (
                                <React.Fragment>
                                    <TextHireService>Abrindo chamado...</TextHireService>
                                    <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                                        <React.Fragment>
                                            <TexService>Profissional</TexService>
                                            <TextName>{props.professional.name}</TextName>
                                            <TexService>Categoria</TexService>
                                            <TextName>{categories.length > 0 ? getCategory.data.categories[0].description : ''}</TextName>
                                            <TexService>Subcategoria</TexService>
                                            <PickerJobs
                                                onValueChange={(item, index) => {
                                                    if (item) {
                                                        setForm({ ...form, subcategory_id: item })
                                                    }
                                                }}
                                                selectedValue={form.subcategory_id}
                                                itemsList={subcategories} />
                                            <TexService>Serviço</TexService>
                                            <PickerJobs
                                                onValueChange={(item, index) => {
                                                    if (item) {
                                                        setForm({ ...form, service_id: item })
                                                    }
                                                }}
                                                selectedValue={form.service_id}
                                                itemsList={services} />
                                            <TexService>Cliente</TexService>
                                            <TextName>{props.client.name}</TextName>
                                            <TextName>{props.client.phone}</TextName>
                                            <TexService>Descrição</TexService>
                                            <TextInputJobs
                                                name='description'
                                                placeholder='Descreva brevemente o procedimento a ser executado'
                                                value={form.description}
                                                onChangeText={handleOnChange}
                                                invalidValue={invalidField === 'description'}
                                                multiline={true}
                                                numberOfLines={2} />

                                            <ViewContainerConfirmar>
                                                <ButtonPurple onPress={() => handleClickConfimar()}>Concluir</ButtonPurple>
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
                type={props.userType}
                selected={'home'}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                chatOnPress={() => props.userType === 'client' ? props.navigation.navigate('ClientListChat') : props.navigation.navigate('ProfessionalListChat')}
                perfilOnPress={() => props.navigation.navigate('Perfil')} />
        </React.Fragment>
    )
}

NewCallScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        client: state.client.selected,
        professional: state.professional.professional,
        professionalCtr: state.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newProfessionalCallRequest: (token, call) => dispatch(ActionCreators.newProfessionalCallRequest(token, call)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCallScreen)