import React, { useState } from 'react'; 
import {Text} from 'react-native'
 
import { ContainerContent, ContainerItems } from './styles'
import CategorieItem from '../CategorieItem/index'

const Categories = () => {

    const [categoria, setCategoria] = useState([
        {
            id:1,
            descricao: 'PetShop',
            icon: 'pets'
        },
        {
            id:2,
            descricao: 'Saúde',
            icon: 'favorite'
        },
        {
            id:3,
            descricao: 'Beleza',
            icon: 'face'
        },
        {
            id:4,
            descricao: 'Autos',
            icon: 'directions-car'
        },
        {
            id:5,
            descricao: 'Fitness',
            icon: 'fitness-center'
        } ,
        {
            id:6,
            descricao: 'Transportes',
            icon: 'airport-shuttle'
        } ,
        {
            id:7,
            descricao: 'Imóveis',
            icon: 'location-city'
        } 
    ])

    return (
        <ContainerContent>
            <ContainerItems>
                {
                    categoria.map((item) => (
                        <CategorieItem key={item.id} categoria={item} />
                    ))
                }       
            </ContainerItems>
        </ContainerContent>
    )
}

export default Categories;


