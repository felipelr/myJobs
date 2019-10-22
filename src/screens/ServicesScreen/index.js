import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity, View, ActivityIndicator, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import styles, { ContainerList, ContainerSearch, TextLoading } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import List from '../../components/List/index'
import Highlights from '../../components/Highlights/index'
import { purple } from '../../components/common/util/colors'
import useGet from '../../services/restServices';
import ActionCreators from '../../store/actionCreators'

function ServicesScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [servicesSubcategory, setServicesSubcategory] = useState([]);
    const services = useGet(`/services/getBySubcategory/${props.selectedSubcategory.id}.json`, props.token);
    const highlights = useGet(`/highlights/highlightsBySubcategory/${props.selectedSubcategory.id}.json`, props.token);
    

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

    useEffect(() => {
        if (services.data && services.data.services) {
            if (search.length > 0) {
                var filtrados = services.data.services.filter((obj) =>  {
                    return obj.title.toUpperCase().includes(search.toUpperCase()) || obj.description.toUpperCase().includes(search.toUpperCase());
                })
                setServicesSubcategory(filtrados);
            } else {
                setServicesSubcategory(services.data.services);
            }
        }
    }, [search, services.data]);

    useEffect(() => {
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login');
        }
    }, [props.isAuth]);

    back = () => {
        props.ownProps.navigation.navigate('ProfessionalSearch');
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={back} title='Buscar Serviço' chat />
            <Highlights titulo={'Destaques do mês'} highlights={highlights} subcategorie={true}/>
            <ContainerSearch>
                <SearchBar placeholder="Oque você está procurando?"
                    placeholderTextColor='white'
                    inputContainerStyle={styles.searchInputContainerStyle}
                    inputStyle={{ color: 'white', marginTop: 7 }}
                    containerStyle={styles.searchContainerStyle}
                    onChangeText={(e) => setSearch(e)}
                    value={search}
                    searchIcon={<Icon name='search' size={24} color='white' />}
                    clearIcon={search != '' &&
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Icon name='close' size={24} color='white' />
                        </TouchableOpacity>}
                />
            </ContainerSearch>
            <ContainerList>
                {!services.loading && <List tipo='service' titulo={("Serviços de '" + props.selectedSubcategory.description + "'")} itens={servicesSubcategory} itemOnPress={() => props.navigation.navigate('ProfessionalHome')} />}
            </ContainerList>
            {services.loading &&
                <View style={{ alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color={purple} />
                    <TextLoading>Loading...</TextLoading>
                </View>
            }
            <Footer
                homeOnPress={() => props.ownProps.navigation.navigate('ProfessionalSearch')}
                servicesOnPress={() => { }}
                perfilOnPress={() => props.ownProps.navigation.navigate('Perfil')} />
        </KeyboardAvoidingView>
    )
}

ServicesScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        selectedSubcategory: state.subcategory.selected,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectSubcategory: (subcategory) => dispatch(ActionCreators.subcategoriesSelected(subcategory))
    }
}
 

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen)
