import React, { useEffect} from 'react'
import { KeyboardAvoidingView, Platform, ActivityIndicator, View, BackHandler } from 'react-native'
import { connect } from 'react-redux';

import {
    ContainerProfessionals,
    ContainerList,
    TextLoading,
    ButtonContainer,
    ButtonOrcamento,
    TextOrcamento
} from './styles'

import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices';
import { purple } from '../../components/common/util/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

function ProfessionalsScreen(props) {
    const highlights = useGet(`/highlights/highlightsByService/${props.serviceSelected.id}.json`, props.token);
    const getProfessionals = useGet(`/professionals/getByService/${props.serviceSelected.id}.json`, props.token);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', back)

        return () => {
            backHandler.remove()
        }
    }, [])

    const back = async () => {
        props.navigation.goBack()
        return true
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
                    {!getProfessionals || (getProfessionals && getProfessionals.loading) ? (
                        <View style={{ alignSelf: 'center' }}>
                            <ActivityIndicator size='large' color={purple} />
                            <TextLoading>Loading...</TextLoading>
                        </View>
                    ) :
                        getProfessionals && getProfessionals.data.professionals &&
                        <List
                            tipo='professional'
                            titulo='Profissionais/Empresas'
                            itens={getProfessionals.data.professionals} 
                            itemOnPress={() => props.navigation.navigate('ProfessionalChat')} />
                    }
                </ContainerList>
            </ContainerProfessionals>
            <Footer                       
                perfilOnPress={() => props.navigation.navigate('Perfil')}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch')}
                chatOnPress={() => props.navigation.navigate('ClientListChat')} />
        </KeyboardAvoidingView>
    )
}

ProfessionalsScreen.navigationOptions = {
    header: null
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

const mapDispatchToProps = dispatch => { 
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalsScreen);