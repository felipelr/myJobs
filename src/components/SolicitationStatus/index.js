import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CardJobs from '../CardJobs/index'
import { SolicitationStatusContainer, CardStatusContainer, CardStatusText } from './styles'
import { orange, purple, green } from '../common/util/colors'

export default function SolicitationStatus(props) {
    const { solicitacoes } = props
    return (
        <SolicitationStatusContainer>
            <CardJobs backColor={orange} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='alarm' size={40} color={orange} />
                    <CardStatusText textColor={orange}>{solicitacoes.abertas}</CardStatusText>
                    <CardStatusText textColor={orange}>Abertas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={purple} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='hourglass-empty' size={40} color={purple} />
                    <CardStatusText textColor={purple}>{solicitacoes.andamento}</CardStatusText>
                    <CardStatusText textColor={purple}>Andamento</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={green} width='105' height='130' paddingCard='2' borderRadius='5'>
                <CardStatusContainer>
                    <Icon name='check' size={40} color={green} />
                    <CardStatusText textColor={green}>{solicitacoes.finalizadas}</CardStatusText>
                    <CardStatusText textColor={green}>Finalizadas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
        </SolicitationStatusContainer>
    )
}