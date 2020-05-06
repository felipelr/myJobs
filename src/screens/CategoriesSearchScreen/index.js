import React, { useState, useEffect } from 'react';
import { View, Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ActionCreators from '../../store/actionCreators';
import Footer from '../../components/Footer/index';
import Container from '../../components/Container/index';
import Highlights from '../../components/Highlights/index';
import HeaderJob from '../../components/HeaderJobs/index';
import Categories from '../../components/Categories/index';
import List from '../../components/List/index';

import useGet from '../../services/restServices';

import { mediumgray } from '../../components/common/util/colors';

import {
    ContainerCategorias,
    ViewInfoCategoria,
    TextInfoCategoria,
} from './styles';

function CategoriesSearchScreen(props) {
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [filterText, setFilterText] = useState('')

    const getCategories = useGet('/categories/all.json', props.token); //Carrega as categorias do sistema
    const getSubcategories = useGet('', props.token); //Passa o parametro URL como vazio para que não seja feita nenhuma requisição porém gera os Hooks normalmente
    const highlights = useGet('/highlights/all.json', props.token); // Lista os Highliths gerais

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        props.categoriaSelected(null)

        if (props.fcmToken) {
            props.chatUpdateUserFcmToken(props.token, props.user.sub, props.fcmToken)
        }

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (getCategories.data && getCategories.data.categories) {
            setCategories(getCategories.data.categories)
            //props.categoriaSelected(getCategories.data.categories[0])
        }
    }, [getCategories.data]) //Quando houver alteração nas categorias

    useEffect(() => {
        if (getSubcategories.data && getSubcategories.data.subcategories) {
            if (filterText.length) {
                const filteredSubCategories = getSubcategories.data.subcategories.filter((item) => item.description.toUpperCase().includes(filterText.toUpperCase()))
                setSubCategories(filteredSubCategories)
            }
            else {
                setSubCategories(getSubcategories.data.subcategories)
            }
        }
    }, [getSubcategories.data]) //Quando houver alteração nas subcategorias

    useEffect(() => {
        if (props.selectedCategorie !== null && props.selectedCategorie.id > 0) {
            getSubcategories.refetch(`/subcategories/getByCategory/${props.selectedCategorie.id}.json`);
        }
    }, [props.selectedCategorie]) //Quando trocar a categoria selecionada

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth]);

    const selectSubcategoryRedirect = () => {
        props.navigation.navigate('Services')
    };

    const handleBackPress = async () => {
        if (props.userType == 'client')
            props.logoutRequest()
        else {
            let canGoBack = true

            try {
                if (props.navigation.state.params.previewScreen === 'Splash')
                    canGoBack = false
            } catch (ex) {
                console.log(ex)
            }

            if (canGoBack)
                props.navigation.goBack()
        }
        return true
    }

    const handleFilterChangeText = (text) => {
        setFilterText(text)
        if (text.length) {
            if (getSubcategories.data.subcategories) {
                const filteredSubCategories = getSubcategories.data.subcategories.filter((item) => item.description.toUpperCase().includes(text.toUpperCase()))
                setSubCategories(filteredSubCategories)
            }
        }
        else {
            if (getSubcategories.data.subcategories)
                setSubCategories(getSubcategories.data.subcategories)
        }
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJob filter={true} onChangeText={handleFilterChangeText} />
            <ContainerCategorias>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} navigation={props.navigation} />
                <Categories itens={categories} />
                <View style={{ flex: 2, marginTop: 2 }}>
                    {
                        getSubcategories.loading && <List itens={[1, 2, 3]} />
                    }
                    {
                        (!getSubcategories.loading && props.selectedCategorie != null && props.selectedCategorie.id != 0) &&
                        <List
                            tipo='subcategory'
                            titulo={'Subcategorias de \'' + props.selectedCategorie.description + "'"}
                            itens={subCategories}
                            itemOnPress={() => props.navigation.navigate('Services')} />
                    }
                    {
                        (!getSubcategories.loading && !(props.selectedCategorie != null && props.selectedCategorie.id != 0)) &&
                        <ViewInfoCategoria>
                            <Icon name='info' size={72} color={mediumgray} />
                            <TextInfoCategoria>Selecione uma categoria acima para visualizar mais detalhes dos serviços</TextInfoCategoria>
                        </ViewInfoCategoria>
                    }
                </View>
            </ContainerCategorias>
            <Footer
                type={props.userType}
                selected={'home'}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                chatOnPress={() => props.userType === 'client' ? props.navigation.navigate('ClientListChat') : props.navigation.navigate('ProfessionalListChat')}
                perfilOnPress={() => props.navigation.navigate('Perfil')}
            />
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        user: state.auth.user,
        fcmToken: state.chat.fcmToken,
        selectedCategorie: state.categoria.selected,
        userType: state.auth.userType,
        professional: state.professional.professional,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(ActionCreators.logoutRequest()),
        categoriaSelected: (categorie) => dispatch(ActionCreators.categoriasSelected(categorie)),
        chatUpdateUserFcmToken: (token, userId, fcmToken) => dispatch(ActionCreators.chatUpdateUserFcmToken(token, userId, fcmToken)),
    }
};

CategoriesSearchScreen.navigationOptions = {
    header: null
};


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearchScreen);