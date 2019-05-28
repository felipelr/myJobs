import React from 'react'
import { View, Header } from 'react-native'

import Container from '../../components/Container/index'

export default function ProfessionalSearch(props) {
    return (
        <React.Fragment>
            <Container />
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        </React.Fragment> 
    )
}

ProfessionalSearch.navigationOptions = {
    header: null
}