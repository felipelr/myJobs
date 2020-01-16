import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux';

import { ContainerProfessionals, ContainerList, TextLoading, ButtonContainer, ButtonOrcamento, TextOrcamento } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices';
import { purple} from '../../components/common/util/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

function ProfessionalsScreen(props) {

    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const highlights = useGet(`/highlights/highlightsByService/${props.serviceSelected.id}.json`, props.token);
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
                    <ButtonOrcamento onPress={() => props.navigation.navigate('ServiceHire')}>
                        <TextOrcamento>Solicitar Orçamentos para todos os profissionais</TextOrcamento>
                        <Icon name='chevron-right' size={24} color={purple} />
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