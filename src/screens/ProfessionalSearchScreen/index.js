import React, { useState, useEffect } from 'react'
import { View, Text, Platform, BackHandler,ActivityIndicator } from 'react-native'
import { ContainerCategorias, TextLoading } from './styles'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import HeaderJob from '../../components/HeaderJobs/index'
import Categories from '../../components/Categories/index'
import List from '../../components/List/index'
import { purple } from '../../components/common/util/colors'

function ProfessionalSearchScreen(props) {
    
    useEffect(() => {
        props.getCategories(props.token) //carrega categorias
        props.getHighlights(props.token) //carrega anunciantes

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            this.backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (props.selectedCategorie !== null && props.selectedCategorie.id > 0) { 
            props.subcategoriesByCategoryRequest(props.selectedCategorie, props.token)
        }
    }, [props.selectedCategorie])

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth])

    handleBackPress = () => {
        props.logout()
        return true
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJob filter={true} />
            <ContainerCategorias>
                <Text>{JSON.stringify(props.highlights)}</Text>
                {/* <Highlights titulo='Destaques do mês' highlights={ props.highlights } /> */}
                <Categories /> 
                <View style={{ flex: 2, marginTop: 2}}>
                    { 
                        props.selectedCategorie != null ? (
                            props.loadingSubcategories ?
                                (
                                    <View style={{alignSelf:'center'}}>
                                        <ActivityIndicator size='large' color={purple} /> 
                                        <TextLoading>Loading...</TextLoading>
                                    </View>
                                ) :
                                ( 
                                    <List tipo='subcategory' titulo={'Subcategorias de \'' + props.selectedCategorie.description + "'"} itens={props.subcategories} itemOnPress={() => props.navigation.navigate('Professionals')} />
                                )
                        ) : (
                                <Text>Selecione uma categoria para visualizar as opções</Text>
                            )
                    }
                </View>
            </ContainerCategorias>
            <Footer
                servicesOnPress={() => props.navigation.navigate('Services')}
                perfilOnPress={() => props.navigation.navigate('Perfil')}
            />
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        data: state.categoria.data,
        selectedCategorie: state.categoria.selected,
        subcategories: state.subcategory.subcategories,
        loadingSubcategories: state.subcategory.loading, 
        highlights: state.highlights.highlights,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: (token) => dispatch(ActionCreators.categoriasLoadRequest(token)),
        getHighlights: (token) => dispatch(ActionCreators.highlightsLoadRequest(token)),
        logout: () => dispatch(ActionCreators.logoutRequest()),
        subcategoriesByCategoryRequest: (token, selectedCategorie) => dispatch(ActionCreators.subcategoriesByCategoryRequest(token, selectedCategorie))
    }
}

ProfessionalSearchScreen.navigationOptions = {
    header: null
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalSearchScreen)
