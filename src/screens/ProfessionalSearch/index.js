import React from 'react' 
 
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'

const assets = {
    facebook: require('../../assets/facebook.png'),
    googlemais: require('../../assets/googlemais.png') 
}

export default function ProfessionalSearch(props) {
    return (
        <React.Fragment>
            <HeaderJobs filter={true}/>
            <Container />
        </React.Fragment> 
    )
}

ProfessionalSearch.navigationOptions = {
    header: null
}