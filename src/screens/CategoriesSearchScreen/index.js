import React, { useState, useEffect } from 'react';
import { View, Text, Platform, BackHandler, ActivityIndicator } from 'react-native';
import { ContainerCategorias, TextLoading } from './styles';
import { connect } from 'react-redux';

import ActionCreators from '../../store/actionCreators';
import Footer from '../../components/Footer/index';
import Container from '../../components/Container/index';
import Highlights from '../../components/Highlights/index';
import HeaderJob from '../../components/HeaderJobs/index';
import Categories from '../../components/Categories/index';
import List from '../../components/List/index';
import { purple } from '../../components/common/util/colors'; 
import useGet from '../../services/restServices';

function CategoriesSearchScreen(props) {

    const categories = useGet('/categories/index.json', props.token); //Carrega as categorias do sistema
    const subcategories = useGet('', props.token); //Passa o parametro URL como vazio para que não seja feita nenhuma requisição porém gera os Hooks normalmente
    const highlights = useGet('/highlights/highlights.json', props.token); // Lista os Highliths gerais

    useEffect(() => {
        if (BackHandler)
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            if (this.backHandler)
                this.backHandler.remove();
        }
    }, [])

    useEffect(() => {
        if (categories.data && categories.data.categories) {
            props.categoriaSelected(categories.data.categories[0]);
        }
    }, [categories.data]); //Quando houver alteração nas categorias


    useEffect(() => {
        if (props.selectedCategorie !== null && props.selectedCategorie.id > 0) {
            subcategories.refetch(`/subcategories/view/${props.selectedCategorie.id}.json`);
        }
    }, [props.selectedCategorie]); //Quando trocar a categoria selecionada

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth]);
 
    selectSubcategoryRedirect = () => {        
        props.navigation.navigate('Services')
    };

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJob filter={true} />
            <ContainerCategorias>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} />
                <Categories data={categories.data} />
                <View style={{ flex: 2, marginTop: 2 }}>
                    {
                        subcategories.loading ? (
                            <View style={{ alignSelf: 'center' }}>
                                <ActivityIndicator size='large' color={purple} />
                                <TextLoading>Loading...</TextLoading>
                            </View>
                        ) :
                            (
                                props.selectedCategorie != null && <List tipo='subcategory' titulo={'Subcategorias de \'' + props.selectedCategorie.description + "'"} itens={subcategories.data.subcategories} itemOnPress={() => props.navigation.navigate('Services')} />
                            )
                    }
                </View>
            </ContainerCategorias>
            <Footer
                servicesOnPress={() => props.navigation.navigate('Services')}
                perfilOnPress={() => props.userType === 'client' ? props.navigation.navigate('Perfil') : props.navigation.navigate('ProfessionalHome')}
            />
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        selectedCategorie: state.categoria.selected,
        userType: state.auth.userType,
        professional: state.professional.professional,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutSuccess: () => dispatch(ActionCreators.logoutSuccess()),
        categoriaSelected: (categorie) => dispatch(ActionCreators.categoriasSelected(categorie))
    }
};

CategoriesSearchScreen.navigationOptions = {
    header: null
};


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearchScreen);