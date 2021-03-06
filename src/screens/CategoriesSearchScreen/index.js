import React, { useState, useEffect } from 'react';
import { View, Platform, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions } from '@react-navigation/native';

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
    const getFavorities = useGet('', props.token); // Lista os Favoritos

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        props.categoriaSelected(null)

        if (props.fcmToken) {
            props.chatUpdateUserFcmToken(props.token, props.user.sub, props.fcmToken)
        }

        loadFavorities();

        return () => {
            backHandler.remove()
        }
    }, [])

    const loadFavorities = async () => {
        const response = await getFavorities.refetch(`/favoriteProfessionals/user/${props.user.sub}.json`)
        if (response.favorities) {
            props.favoriteSetFavorities(response.favorities)
        }
    }

    useEffect(() => {
        if (getCategories.data && getCategories.data.categories) {
            setCategories(getCategories.data.categories)
            //props.categoriaSelected(getCategories.data.categories[0])
        }
    }, [getCategories.data]) //Quando houver alteração nas categorias

    useEffect(() => {
        if (getSubcategories.data && getSubcategories.data.subcategories) {
            console.log('subcategories', getSubcategories.data.subcategories)
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
            props.ownProps.navigation.navigate('Login', {
                previewScreen: props.route.name,
            })
        }
    }, [props.isAuth]);

    const handleBackPress = async () => {
        if (props.userType == 'client') {
            props.navigation.dispatch(
                StackActions.replace('Splash', {
                    previewScreen: props.route.name,
                    closeApp: true
                })
            );
        }
        else {
            let canGoBack = true

            try {
                if (props.route.params && props.route.params.previewScreen === 'Splash')
                    canGoBack = false
            } catch (ex) {
                console.log(ex)
            }

            if (canGoBack) {
                if (props.route.params.previewScreen === 'Services') {
                    props.navigation.navigate('ProfessionalHome', {
                        previewScreen: props.route.name,
                        viewProfile: false,
                    })
                }
                else if (props.route.params.previewScreen) {
                    props.navigation.navigate(props.route.params.previewScreen, {
                        previewScreen: props.route.name,
                        viewProfile: false,
                    })
                }
            }
        }
        return true
    }

    const handleFilterChangeText = (text) => {
        setFilterText(text)
        if (props.selectedCategorie !== null && props.selectedCategorie.id !== 0) {
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
        else if (text.length > 2) {
            //filtrar subcategorias e todas as categorias
            getSubcategories.refetch(`/subcategories/getAll.json?search=${text}`);
        }
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJob filter={true} onChangeText={handleFilterChangeText} />
            <ContainerCategorias>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} navigation={props.navigation} route={props.route} />
                <Categories itens={categories} />
                <View style={{ flex: 2, marginTop: 2 }}>
                    {
                        getSubcategories.loading && <List itens={[1, 2, 3]} />
                    }
                    {
                        (!getSubcategories.loading && (filterText.length > 0 || (props.selectedCategorie != null && props.selectedCategorie.id != 0))) &&
                        <List
                            tipo='subcategory'
                            titulo={'Subcategorias de \'' + (props.selectedCategorie != null ? props.selectedCategorie.description : 'Todas') + "'"}
                            itens={subCategories}
                            itemOnPress={() => props.navigation.navigate('Services', {
                                previewScreen: props.route.name,
                            })} />
                    }
                    {
                        (!getSubcategories.loading && !(filterText.length > 0 || (props.selectedCategorie != null && props.selectedCategorie.id != 0))) &&
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
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                    viewProfile: false
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
        favoriteSetFavorities: (favorities) => dispatch(ActionCreators.favoriteSetFavorities(favorities)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearchScreen);