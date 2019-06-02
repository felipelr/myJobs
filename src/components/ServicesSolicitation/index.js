import React from 'react'
import { ServicesSolicitationContainer, ServicesSolicitationText } from './styles'
import SolicitationStatus from '../SolicitationStatus/index'

export default function ServicesSolicitation(props) {
    const { solicitacoes } = props
    return (
        <ServicesSolicitationContainer>
            <ServicesSolicitationText>Solicitações de Profissionais</ServicesSolicitationText>
            <SolicitationStatus solicitacoes={solicitacoes} />
        </ServicesSolicitationContainer>
    )
}