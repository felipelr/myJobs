import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    ContainerProfessionals,
    ContainerList,
    ButtonContainer,
    ButtonOrcamento,
    TextOrcamento
} from './styles'

import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import Highlights from '../../components/Highlights/index'
import List from '../../components/List/index'
import useGet from '../../services/restServices'

import { purple } from '../../components/common/util/colors'

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
            <HeaderJobs back={back} title='Profissionais' />
            <ContainerProfessionals>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} navigation={props.navigation}/>
                {props.userType === 'client' &&
                    <ButtonContainer>
                        <ButtonOrcamento onPress={() => props.navigation.navigate('ServiceHire')}>
                            <TextOrcamento>Solicitar Orçamentos para todos os profissionais</TextOrcamento>
                            <Icon name='chevron-right' size={24} color={purple} />
                        </ButtonOrcamento>
                    </ButtonContainer>
                }
                <ContainerList>
                    {!getProfessionals || (getProfessionals && getProfessionals.loading) ? (
                        <List itens={[1, 2, 3]} />
                    ) :
                        getProfessionals && getProfessionals.data.professionals &&
                        <List
                            tipo='professional'
                            titulo='Profissionais/Empresas'
                            itens={getProfessionals.data.professionals}
                            itemOnPress={() => props.navigation.navigate('ProfessionalHomeView')} />
                    }
                </ContainerList>
            </ContainerProfessionals>
            <Footer
                type={props.userType}
                selected={'home'}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome')}
                callsOnPress={() => props.navigation.navigate('CallsList')}
                chatOnPress={() => props.userType === 'client' ? props.navigation.navigate('ClientListChat') : props.navigation.navigate('ProfessionalListChat')}
                perfilOnPress={() => props.navigation.navigate('Perfil')} />
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
        userType: state.auth.userType,
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.service.selected,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalsScreen);