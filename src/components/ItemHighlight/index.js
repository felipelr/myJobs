import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { ContainerItem, BodyItem, TitleItem, DescriptionItem, ContentInfo, Services,ServicesAmount } from './styles'
import { white, purple } from '../common/util/colors' 

export default function ItemHighlight(props) {
    const { profissional } = props
    return (
        <ContainerItem>
            <BodyItem>
                <Avatar
                    containerStyle={{ alignSelf: 'center', borderColor: purple}}
                    rounded
                    size={55}
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }} />
                <ContentInfo>
                    <TitleItem>{profissional.name}</TitleItem>
                    <DescriptionItem>{profissional.description}</DescriptionItem>
                </ContentInfo>
                <Icon name="chevron-right" size={30} color={white} style={{ alignSelf: 'center' }} />
            </BodyItem>
           {/*  <RatingJobs avaliacao={profissional.avaliacao} qtdeAvaliacoes={profissional.qtdeAvaliacoes} backPurple={true}/> */}
           <Services>
                  Oferece <ServicesAmount>{profissional.qtdeServicos}</ServicesAmount> serviços  
           </Services> 
        </ContainerItem>
    )
}