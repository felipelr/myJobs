import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import styles, { ContainerList, ContainerSearch, TextLoading } from './styles'
import HeaderJobs from '../../components/HeaderJobs'
import Footer from '../../components/Footer/index'
import Container from '../../components/Container/index'
import List from '../../components/List/index'
import Categories from '../../components/Categories'

function ServicesScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [search, setSearch] = useState('')
    const [servicos, setServicos] = useState([
        {
            descricao: 'PetShop',
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            descricao: 'Mecânico',
            info: '245 Atendimentos realizados,  0,6km de você',
            imagem: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
            descricao: 'Diarista',
            info: '245 Atendimentos realizados,  0,6km de você',
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
        props.selectedSubcategory ?
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
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
                <ContainerList>
                    <List tipo='service' titulo='Serviços' itens={servicos} itemOnPress={() => props.navigation.navigate('ServiceHome')} />
                </ContainerList>
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
    )
}

ServicesScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedSubcategory: state.subcategory.selected,
        ownProps: ownProps
    }
}

export default connect(mapStateToProps)(ServicesScreen)
