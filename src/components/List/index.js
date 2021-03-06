import React from 'react'
import { Avatar } from 'react-native-elements'
import ListItem from '../ListItem/index'
import ListItemProfessional from '../ListItem/ListItemProfessional/index'
import ListItemService from '../ListItem/LisItemService'
import ListSubcategory from '../ListItem/ListSubcategory'

import { TitleList, ContainerList, ViewTitleEmpty, ViewSubTitleEmpty } from './styles'

import { purple } from '../common/util/colors'

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
                            return <ListItemProfessional key={index} profissional={item} itemOnPress={props.itemOnPress} />
                        }
                        else if (tipo === 'service') {
                            return <ListItemService key={index} servico={item} itemOnPress={props.itemOnPress} />
                        }
                        else if (tipo === 'subcategory') {
                            return <ListSubcategory key={index} subcategory={item} itemOnPress={props.itemOnPress} />
                        }
                        return <ListItem
                            key={index}
                            leftContent={
                                <Avatar
                                    size={55}
                                    title={''}
                                    titleStyle={{ color: purple }}
                                />
                            }
                            centerContent={
                                <React.Fragment key={index}>
                                    <ViewTitleEmpty />
                                    <ViewSubTitleEmpty />
                                    <ViewSubTitleEmpty />
                                </React.Fragment>
                            }
                        />
                    })
                }
            </ContainerList>
        </React.Fragment>
    )
}