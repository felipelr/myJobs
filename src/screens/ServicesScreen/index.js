import React, { useState, useEffect } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    BackHandler,
    TouchableOpacity,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import useGet from '../../services/restServices'

import ActionCreators from '../../store/actionCreators'

import styles, { ContainerList, ContainerSearch } from './styles'

import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import List from '../../components/List/index'
import Highlights from '../../components/Highlights/index'

function ServicesScreen(props) {
    const [search, setSearch] = useState('')
    const [servicesSubcategory, setServicesSubcategory] = useState([])
    const services = useGet(`/services/getBySubcategory/${props.selectedSubcategory.id}.json`, props.token)
    const highlights = useGet(`/highlights/highlightsBySubcategory/${props.selectedSubcategory.id}.json`, props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', back)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        if (services.data && services.data.services) {
            if (search.length > 0) {
                var filtrados = services.data.services.filter((obj) => {
                    return obj.title.toUpperCase().includes(search.toUpperCase()) || obj.description.toUpperCase().includes(search.toUpperCase())
                })
                setServicesSubcategory(filtrados)
            } else {
                setServicesSubcategory(services.data.services)
            }
        }
    }, [search, services.data]);

    useEffect(() => {
        if (!props.isAuth) {
            props.navigation.navigate('Login', {
                previewScreen: props.route.name,
            });
        }
    }, [props.isAuth]);

    const back = async () => {
        props.navigation.navigate('CategoriesSearch', {
            previewScreen: props.route.name,
        })
        return true
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={back} title='Serviços' />
            <Highlights titulo={'Destaques do mês'} highlights={highlights} subcategorie={true} navigation={props.navigation} route={props.route} />
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
                {services.loading &&
                    <List itens={[1, 2, 3]} />
                }
                {!services.loading &&
                    <List
                        tipo='service'
                        titulo={("Serviços de '" + props.selectedSubcategory.description + "'")}
                        itens={servicesSubcategory}
                        itemOnPress={() => props.navigation.navigate('Professionals', {
                            previewScreen: props.route.name,
                        })} />
                }
            </ContainerList>
            <Footer
                type={props.userType}
                selected={'home'}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
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
