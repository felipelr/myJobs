import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler, Picker } from 'react-native'
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
        client_id: props.client.id,
        professional_id: props.professional.id,
        service_id: 0,
        description: "",
        subcategory_id:0,
        subcategory_description:""
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

    useEffect(() => {  
        if (getCategory.data != null && getCategory.data.categories != null && getCategory.data.categories[0].id > 0) {
            getSubcategories.refetch(`/subcategories/getByCategory/${getCategory.data.categories[0].id}.json`);
        }
    }, [getCategory.data]) //Quando trocar a categoria selecionada


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
                                    <TextHireService>Abrindo chamado...</TextHireService>
                                    <CardJobs backColor='white' width='90' height='250' paddingCard='20'>
                                        <React.Fragment>
                                            <TexService>Profissional</TexService>
                                            <TextName>{props.professional.name}</TextName>
                                            <TexService>Categoria</TexService>
                                            {getCategory.loading || getCategory.data == null || getCategory.data.categories == null ? <TextName>Carregando...</TextName> : <TextName>{getCategory.data.categories[0].description}</TextName>}
                                            <TexService>Subcategoria</TexService>
                                            {getSubcategories.loading || getSubcategories.data == null || getSubcategories.data.subcategories ==null ? 
                                                <TextName>Carregando...</TextName> :
                                                <PickerJobs onValueChange={handleOnChange} selectedValue={form.subcategory_description} itemsList={getSubcategories.data.subcategories}></PickerJobs>
                                            }
                                            <TextName>{JSON.stringify(getSubcategories)}</TextName>
                                            <TexService>Serviço</TexService>
                                            <TextName>Nenhum</TextName>
                                            <TexService>Cliente</TexService>
                                            <TextName>{props.client.name}</TextName>
                                            <TextName>{props.client.phone}</TextName>
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