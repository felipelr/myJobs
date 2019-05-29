import React from 'react'
import { ContainerListItem, LeftContainerItem, CenterContainerItem, RightContainerItem } from './styles'

export default function ListItem(props) {
    const { leftContent } = props
    const { centerContent } = props
    const { rightContent } = props
    return (
        <ContainerListItem>
            <LeftContainerItem>{leftContent ? leftContent : null}</LeftContainerItem>
            <CenterContainerItem>{centerContent ? centerContent : null}</CenterContainerItem>
            <RightContainerItem>{rightContent ? rightContent : null}</RightContainerItem>
        </ContainerListItem>
    )
}