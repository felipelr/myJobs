import React from 'react' 
import {View} from 'react-native' 

import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index' 

export default function ProfessionalSearch(props) {
    return (
        <React.Fragment>
            <HeaderJobs filter={true}/>
            <Container />
            <View style={{flex:1}}>
            </View>
            <Footer />
        </React.Fragment> 
    )
}

ProfessionalSearch.navigationOptions = {
    header: null
}