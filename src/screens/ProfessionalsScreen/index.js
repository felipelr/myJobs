import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux';

import { ContainerProfessionals, ContainerList, TextLoading, ButtonContainer, ButtonOrcamento, TextOrcamento, Title } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices';
import { purple, green } from '../../components/common/util/colors'

function ProfessionalsScreen(props) {

    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const highlights = useGet('/highlights/highlights.json', props.token); // Lista os Highliths gerais 
    const profissionais = useGet(`/professionals/getByService/${props.serviceSelected.id}.json`, props.token);

    console.log('profissionais ==> ' + JSON.stringify(profissionais))

    /*useEffect(() => {
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
    }, []) */

    const back = async () => {
        props.navigation.goBack()
    }

    const handleClickLogin = () => {
        console.log('clicou aqui')
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={back} filter={true} />
            <ContainerProfessionals>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} />
                <ButtonContainer> 
                    <ButtonOrcamento>
                        <TextOrcamento>Solicitar Orçamentos para todos os profissionais</TextOrcamento>
                    </ButtonOrcamento>
                </ButtonContainer>
                <ContainerList>
                    {!profissionais || (profissionais && profissionais.loading) ? (
                        <View style={{ alignSelf: 'center' }}>
                            <ActivityIndicator size='large' color={purple} />
                            <TextLoading>Loading...</TextLoading>
                        </View>
                    ) :
                        profissionais && profissionais.data.profissionais && <List tipo='professional' titulo='Profissionais/Empresas' itens={profissionais.data.profissionais} />
                    }
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
        serviceSelected: state.services.selected,
        ownProps: ownProps
    }
};


ProfessionalsScreen.navigationOptions = {
    header: null
}


export default connect(mapStateToProps, null)(ProfessionalsScreen);