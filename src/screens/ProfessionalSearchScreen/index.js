import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import { ContainerCategorias } from './styles'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import HeaderJob from '../../components/HeaderJobs/index'
import Categories from '../../components/Categories/index'
import List from '../../components/List/index'

function ProfessionalSearchScreen(props) {
    const [categoria, setCategoria] = useState({ descricao: 'PetShop' })
    const [profissionais, setProfissionais] = useState([
        {
            nome: 'Finos e Cheirosos',
            descricao: 'Banho e Tosa de animais de pequeno e médio porte.',
            avaliacao: 3,
            qtdeAvaliacoes: 143000,
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            nome: 'CatDog',
            descricao: 'Vacinação e cuidados médicos.',
            avaliacao: 3.5,
            qtdeAvaliacoes: 76000,
            info: '87 Atendimentos realizados,  0,82km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        }
    ])

    useEffect(() => {
        console.log('Teste sistema = ' + JSON.stringify(props.data))
        props.getCategories()
    }, [props.data]);

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJob filter={true} />
            <ContainerCategorias>
                <Highlights titulo='Destaques do mês' destaques={{ categoria, profissionais }} />
                <Categories />
                <View style={{ flex: 2, marginTop: 2, backgroundColor: 'white' }}>
                    <List tipo='professional' titulo='Profissionais/Empresas' itens={profissionais} itemOnPress={() => props.navigation.navigate('Professionals')} />
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
        data: state.categoria.data,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: (token) => dispatch(ActionCreators.categoriasLoadRequest(token))
    }
}
 
ProfessionalSearchScreen.navigationOptions = {
    header: null
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalSearchScreen)
