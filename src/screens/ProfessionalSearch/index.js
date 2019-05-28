import React from 'react'
import { View } from 'react-native'

import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'

export default function ProfessionalSearch(props) {
    return (
        <React.Fragment>
            <HeaderJobs />
            <Container />
        </React.Fragment> 
    )
}

ProfessionalSearch.navigationOptions = {
    header: null
}