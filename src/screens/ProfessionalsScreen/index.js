import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux';

import { ContainerProfessionals, ContainerList, TextLoading } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices';
import { purple } from '../../components/common/util/colors'

function ProfessionalsScreen(props) {

    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const highlights = useGet('/highlights/highlights.json', props.token); // Lista os Highliths gerais 
    const profissionais = useGet(`/professionals/getByService/${props.serviceSelected.id}.json`, props.token);

    console.log('profissionais ==> ' + JSON.stringify(profissionais))

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
                <ContainerList>{
                    !profissionais.data || (profissionais.data && profissionais.data.length === 0) || profissionais.loading ? (
                        <View style={{ alignSelf: 'center' }}>
                            <ActivityIndicator size='large' color={purple} />
                            <TextLoading>Loading...</TextLoading>
                        </View>
                    ) :
                    (profissionais.data && profissionais.data.length > 0) && <List tipo='professional' titulo='Profissionais/Empresas' itens={profissionais.data} />}
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