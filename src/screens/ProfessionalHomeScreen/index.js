import React from 'react'
import { View, Platform, Text, Image } from 'react-native'

import Container from '../../components/Container/index'
import { Capa, ContainerTitle, Title, ContainerRating } from './styles'
import assets from '../../screens/ProfessionalHomeScreen/assets';
import RatingJobs from '../../components/RatingJobs/index'
import { lightgray } from '../../components/common/util/colors'
import HeaderJobs from '../../components/HeaderJobs/index'

export default function ProfessionalHomeScreen(props) {

    const { profissional } = props

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <View style={{ flex: 1 }} behavior={behavior}>
            <HeaderJobs back />
            <View style={{ flex: 1 }}>
                <Capa imagem={assets.capa} />
            </View>
            <View style={{ flex: 0.7, backgroundColor: 'white' }}>
                <ContainerTitle>
                    <ContainerRating>
                        <RatingJobs avaliacao={5} qtdeAvaliacoes={130000} />
                    </ContainerRating>
                    <Title>
                        Tia da Amazonia
                    </Title>
                </ContainerTitle>
            </View>
            <View style={{ flex: 3, backgroundColor: lightgray }}>
                <View style={{ flex: 3.5, backgroundColor: 'blue', marginTop: 2 }}>

                </View>
                <View style={{ flex: 2, backgroundColor: 'green', marginTop: 2 }}>

                </View>
                <View style={{ flex: 1.5, backgroundColor: 'red', marginTop: 2 }}>

                </View>
            </View>
        </View>
    )
}

ProfessionalHomeScreen.navigationOptions = {
    header: null
}