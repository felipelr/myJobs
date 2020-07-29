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
import { urlMyJobs } from '../../config/config'

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
    const [selectedCategorie, setSelectedCategorie] = useState(0)

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
                const array = services.filter(item => item.id == form.service_id)
                const strService = array[0].name
                const msg = `Chamado aberto para o serviço '${strService}'`
                props.professionalNewCallRegistered({
                    data: {
                        message: msg,
                        link: `myjobs.com.br/newcall/professional/${props.professional.id}`
                    }
                })
                props.navigation.goBack()
            }
        }
    }, [props.professionalCtr.loading])

    useEffect(() => {
        if (getCategory.data
            && getCategory.data.categories
            && getCategory.data.categories.length > 0) {
            setCategories(getCategory.data.categories)
            setSelectedCategorie(getCategory.data.categories[0].id)
        }
    }, [getCategory.data]) //Quando trocar a categoria selecionada

    useEffect(() => {
        console.log('getSubcategories.data', JSON.stringify(getSubcategories.data))
        if (getSubcategories.data) {
            if (getSubcategories.data.subcategories && getSubcategories.data.subcategories.length > 0) {
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

    useEffect(() => {
        if (selectedCategorie != 0) {
            console.log(`/subcategories/getByCategory/${selectedCategorie}.json?professional_id=${props.professional.id}`)
            getSubcategories.refetch(`/subcategories/getByCategory/${selectedCategorie}.json?professional_id=${props.professional.id}`);
        }
    }, [selectedCategorie])

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

    const validateField = (field, value) => {
        switch (field) {
            case 'description':
                if (value.length <= 0)
                    return false
                break
            default:
                break
        }
        return true
    }

    const handleClickConfimar = () => {
        if (invalidField === '') {
            if (form.description.length > 0) {
                setRequisitou(true)
                props.newProfessionalCallRequest(props.token, form)
            }
            else {
                setInvalidField('description')
            }
        }
    }


    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <ScrollViewContainer ref={(c) => scrollViewRef.current = c} keyboardShouldPersistTaps='always'>
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
                                            <PickerJobs
                                                onValueChange={(item, index) => {
                                                    if (item) {
                                                        setSelectedCategorie(item)
                                                    }
                                                }}
                                                selectedValue={selectedCategorie}
                                                itemsList={categories} />
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
                                                returnKeyType="done" />

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
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                })}
                callsOnPress={() => props.navigation.navigate('CallsList', {
                    previewScreen: props.route.name,
                })}
                chatOnPress={() => props.navigation.navigate('ChatList', {
                    previewScreen: props.route.name,
                })}
                perfilOnPress={() => props.navigation.navigate('Perfil', {
                    previewScreen: props.route.name,
                })}
                favoriteOnPress={() => props.navigation.navigate('Favorite', {
                    previewScreen: props.route.name,
                })}
            />
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
        professionalNewCallRegistered: (mensagem) => dispatch(ActionCreators.professionalNewCallRegistered(mensagem)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCallScreen)