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
import ActionCreators from '../../store/actionCreators'
import { purple } from '../../components/common/util/colors'

function ServicesScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        props.getServicesSubcategoryRequest(props.selectedSubcategory, props.token)

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
        if (!props.isAuth) {
            props.ownProps.navigation.navigate('Login')
        }
    }, [props.isAuth])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            {console.log(JSON.stringify(props.services))}
            <Container />
            <HeaderJobs back title='Buscar Serviço' chat />
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
            {!props.loading &&
                <ContainerList>
                    <List tipo='service' titulo='Serviços' itens={props.services} itemOnPress={() => props.navigation.navigate('ServiceHome')} />
                </ContainerList>
<<<<<<< HEAD
            }
            {props.loading &&
                <View style={{ alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color={purple} />
                    <TextLoading>Loading...</TextLoading>
                </View>
            }
            <Footer />
        </KeyboardAvoidingView>

=======
                <Footer
                    homeOnPress={() => props.ownProps.navigation.navigate('ProfessionalSearch')}
                    servicesOnPress={() => { }}
                    perfilOnPress={() => props.ownProps.navigation.navigate('Perfil')} />
            </KeyboardAvoidingView>
            :
            <View style={{ alignSelf: 'center' }}>
                <ActivityIndicator size='large' color={purple} />
                <TextLoading>Loading...</TextLoading>
            </View>
>>>>>>> f3c28504f32ccf22fb8085eb29dca0952c872452
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
        services: state.subcategory.services,
        loading: state.subcategory.loading,
        ownProps: ownProps
    }
}

<<<<<<< HEAD
const mapDispatchToProps = dispatch => {
    return {
        getServicesSubcategoryRequest: (selectedSubcategory, token) => dispatch(ActionCreators.getServicesSubcategoryRequest(selectedSubcategory, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen)
=======
export default connect(mapStateToProps)(ServicesScreen)
>>>>>>> f3c28504f32ccf22fb8085eb29dca0952c872452
