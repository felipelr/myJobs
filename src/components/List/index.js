import React from 'react'
import { TitleList, ContainerList } from './styles'
import ListItem from '../ListItem/index'
import ListItemProfessional from '../ListItem/ListItemProfessional/index'
import ListItemService from '../ListItem/LisItemService'
import ListSubcategory from '../ListItem/ListSubcategory'

export default function List(props) {
    const { titulo } = props
    const { itens } = props
    const { tipo } = props
    return (
        <React.Fragment>
            <TitleList>{titulo}</TitleList>
            <ContainerList>
                {
                    itens &&
                    itens.map((item, index) => {
                        if (tipo === 'professional') {
                            return <ListItemProfessional key={index} profissional={item} itemOnPress={props.itemOnPress}/>
                        }
                        else if (tipo === 'service') {
                            return <ListItemService key={index} servico={item} itemOnPress={props.itemOnPress}/>
                        }
                        else if (tipo === 'subcategory'){
                            return <ListSubcategory key={index} subcategory={item} itemOnPress={props.itemOnPress}/>
                        }
                        return <ListItem key={index} />
                    })
                }
            </ContainerList>
        </React.Fragment>
    )
}