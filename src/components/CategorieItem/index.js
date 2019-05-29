import React from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'

import { styles, Title, ContainerBody } from './styles'

const CategorieItem = (props) => {
    const { categoria } = props

    return (
        <ContainerBody>
            <Title>{categoria.descricao}</Title>
            <TouchableOpacity>
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    rounded
                    icon={{ name: categoria.icon, type: 'material-icons' }}
                    size={80} />
            </TouchableOpacity>
        </ContainerBody>
    )
}

export default CategorieItem;