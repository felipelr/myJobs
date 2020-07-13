import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RectButton } from 'react-native-gesture-handler'

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

import { purple, white } from '../../components/common/util/colors'

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
        props.navigation.navigate('Services', {
            previewScreen: props.route.name,
        })
        return true
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={back} title='Profissionais' />
            <ContainerProfessionals>
                <Highlights titulo={'Destaques do mês'} highlights={highlights} navigation={props.navigation} route={props.route} />
                {props.userType === 'client' &&
                    <ButtonContainer>
                        <RectButton
                            onPress={() => props.navigation.navigate('ServiceHire', {
                                previewScreen: props.route.name,
                            })}
                            style={{
                                backgroundColor: white,
                                flexDirection: 'row',
                                borderRadius: 40,
                                overflow: 'hidden',
                                padding: 10,
                                paddingRight: 100,
                                right: -90,
                                margin: 8,
                            }}>
                            <TextOrcamento>Solicitar Orçamentos para todos os profissionais</TextOrcamento>
                            <Icon name='chevron-right' size={24} color={purple} />
                        </RectButton>
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
                            itemOnPress={() => props.navigation.navigate('ProfessionalView', {
                                previewScreen: props.route.name,
                                viewProfile: true,
                            })} />
                    }
                </ContainerList>
            </ContainerProfessionals>
            <Footer
                type={props.userType}
                selected={'home'}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                    viewProfile: false,
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
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        userType: state.auth.userType,
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.service.selected,
        professional: state.professional.professional,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalsScreen);