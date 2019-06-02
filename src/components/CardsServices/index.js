import React from 'react'
import { VwContainerServices } from './styles'

import CardService from '../../components/CardService/index'

export default function CardsServices(props) {
    const { servicos } = props
    return (
        <VwContainerServices>
            {
                servicos.map((servico) => (
                    <CardService select={servico.id == 1 ? true : false} key={servico.id} avaliacao={servico.avaliacao} qtdeAvaliacoes={servico.qtdeAvaliacoes} titulo={servico.titulo} descricao={servico.descricao} />
                ))
            }
        </VwContainerServices>
    )
}