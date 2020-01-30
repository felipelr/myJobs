import React from 'react'

import { ContainerContent, ContainerItems } from './styles'
import CategorieItem from '../CategorieItem/index'

const ArrayVazio = () => {
    let rows = []
    for (let i = 0; i < 10; i++) {
        rows.push(i)
    }
    return rows.map((item) => <CategorieItem key={item} />)
}

const Categories = (props) => {  
    let { categories } = props.data 
    return (
        categories != null ?
            <ContainerContent>
                <ContainerItems>
                    {
                        categories.map((item) => (
                            <CategorieItem key={item.id} categoria={item} />
                        ))
                    }
                </ContainerItems>
            </ContainerContent>
            :
            <ContainerContent>
                <ContainerItems>
                    <ArrayVazio />
                </ContainerItems>
            </ContainerContent>
    )
}



export default Categories



