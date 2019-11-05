import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import { connect } from 'react-redux';

import { ContainerProfessionals, ContainerList } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices';

function ProfessionalsScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const highlights = useGet('/highlights/highlights.json', props.token); // Lista os Highliths gerais

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
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            this.kbShow.remove()
            this.kbShow.remove()
        }
    }, [])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            
            <Container />
            <HeaderJobs back={true} filter={true} />
            <ContainerProfessionals>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} />
                <ContainerList>
                    <List tipo='professional' titulo='Profissionais/Empresas' itens={profissionais} />
                </ContainerList>
            </ContainerProfessionals>
            <Footer />
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.service.selected,  
        ownProps: ownProps
    }
};
 

ProfessionalsScreen.navigationOptions = {
    header: null
}

 
export default connect(mapStateToProps, null)(ProfessionalsScreen);