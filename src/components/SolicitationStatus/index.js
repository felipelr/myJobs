import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CardJobs from '../CardJobs/index'
import { SolicitationStatusContainer, CardStatusContainer, CardStatusText } from './styles'
import { orange, purple, green, white } from '../common/util/colors'

export default function SolicitationStatus(props) {
    const { solicitacoes } = props
    return (
        <SolicitationStatusContainer>
            <CardJobs backColor={white} width='105' height='130' paddingCard='2' borderRadius='10' borderWidth='2' borderColor={orange}>
                <CardStatusContainer>
                    <Icon name='alarm' size={40} color={orange} />
                    <CardStatusText textColor={orange}>{solicitacoes.abertas}</CardStatusText>
                    <CardStatusText textColor={orange}>Abertas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={white} width='105' height='130' paddingCard='2' borderRadius='10' borderWidth='2' borderColor={purple}>
                <CardStatusContainer>
                    <Icon name='hourglass-empty' size={40} color={purple} />
                    <CardStatusText textColor={purple}>{solicitacoes.andamento}</CardStatusText>
                    <CardStatusText textColor={purple}>Andamento</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
            <CardJobs backColor={white} width='105' height='130' paddingCard='2' borderRadius='10' borderWidth='2' borderColor={green}>
                <CardStatusContainer>
                    <Icon name='check' size={40} color={green} />
                    <CardStatusText textColor={green}>{solicitacoes.finalizadas}</CardStatusText>
                    <CardStatusText textColor={green}>Finalizadas</CardStatusText>
                </CardStatusContainer>
            </CardJobs>
        </SolicitationStatusContainer>
    )
}