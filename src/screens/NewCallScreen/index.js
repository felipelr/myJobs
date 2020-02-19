import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler, Picker } from 'react-native'
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
    const getCategory = useGet(`/categories/getByIdProfessional/${props.professional.id}.json`, props.token)
    const getSubcategories = useGet('', props.token);
    const getServices = useGet('', props.token);

    const [requisitou, setRequisitou] = useState(false)
    const [form, setForm] = useState({
        client_id: 53,
        professional_id: props.professional.id,
        service_id: 0,
        description: "",
        subcategory_id: 0,
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
        if (requisitou) { 
            setRequisitou(false)
            scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true }) 
        }
    }, [requisitou])

    useEffect(() => {
        if (getCategory.data != null && getCategory.data.categories != null && getCategory.data.categories[0].id > 0) {
            getSubcategories.refetch(`/subcategories/getByCategory/${getCategory.data.categories[0].id}.json`);
        }
    }, [getCategory.data]) //Quando trocar a categoria selecionada

    useEffect(() => {
        if (getSubcategories.data != null && getSubcategories.data.subcategories != null) {
            setForm({ ...form, 'subcategory_id': getSubcategories.data.subcategories[0].id })
        }
    }, [getSubcategories.data])


    useEffect(() => {
        if (form.subcategory_id != 0) {
            getServices.refetch(`/services/getBySubcategory/${form.subcategory_id}.json`);
        }
    }, [form.subcategory_id])


    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        setInvalidField('')
    }

    handleClickConfimar = () => {
        setRequisitou(true)
        props.newProfessionalCallRequest(props.token, form)
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
                                    <TextHireService>Abrindo chamado...</TextHireService>
                                    <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                                        <React.Fragment>
                                            <TexService>Profissional</TexService>
                                            <TextName>{props.professional.name}</TextName>
                                            <TexService>Categoria</TexService>
                                            {getCategory.loading || getCategory.data == null || getCategory.data.categories == null ? <TextName>Carregando...</TextName> : <TextName>{getCategory.data.categories[0].description}</TextName>}
                                            <TexService>Subcategoria</TexService>
                                            {getSubcategories.loading || getSubcategories.data == null || getSubcategories.data.subcategories == null ?
                                                <TextName>Carregando...</TextName> :
                                                <PickerJobs
                                                    onValueChange={(item, index) => {
                                                        if (item) {
                                                            setForm({ ...form, subcategory_id: item })
                                                        }
                                                    }}
                                                    selectedValue={form.subcategory_id}
                                                    itemsList={getSubcategories.data.subcategories.map(item => {
                                                        return {
                                                            id: item.id,
                                                            name: item.description
                                                        }
                                                    })}></PickerJobs>
                                            }
                                            <TexService>Serviço</TexService>
                                            {getServices.loading || getServices.data == null || getServices.data.services == null ?
                                                <TextName>Carregando...</TextName> :
                                                <PickerJobs
                                                    onValueChange={(item, index) => {
                                                        if (item) {
                                                            setForm({ ...form, service_id: item })
                                                        }
                                                    }}
                                                    selectedValue={form.service_id}
                                                    itemsList={getServices.data.services.map(item => {
                                                        return {
                                                            id: item.id,
                                                            name: item.title
                                                        }
                                                    })}></PickerJobs>
                                            }
                                            <TexService>Cliente</TexService>
                                            <TextName>{props.clientCtr.name}</TextName>
                                            <TextName>{props.clientCtr.phone}</TextName>
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
                                                <ButtonPurple onPress={handleClickConfimar}>Concluir</ButtonPurple>
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

NewCallScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        client: state.client.client,
        clientCtr: state.client,
        professional: state.professional.professional,
        enderecos: state.client.client.clientsAddresses,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newProfessionalCallRequest: (token, call) => dispatch(ActionCreators.newProfessionalCallRequest(token, call)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCallScreen)