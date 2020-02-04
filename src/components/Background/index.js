import React from 'react'
import { ContainerGray, ContainerPurple, Container } from './styles'

export default function Background(props) {
    return (
        <Container>
            <ContainerPurple />
            <ContainerGray />
        </Container>
    )
}