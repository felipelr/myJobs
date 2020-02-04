import React from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import { styles, Title, ContainerBody } from './styles'
import { purple, disabled } from '../common/util/colors'

const CategorieItem = (props) => {
    const { categoria } = props

    const handleClickCategoria = () => {
        props.categoriasSelected(categoria);
    }

    return (
        <ContainerBody>
            {categoria && <Title>{categoria.description}</Title>}
 
            {categoria &&
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={{ backgroundColor: categoria ? purple : disabled }}
                    rounded
                    icon={{ name: categoria.icon, type: 'material-icons' }}
                    size='large'
                    onPress={categoria ? handleClickCategoria : null} />
            }
            {!categoria &&
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={{ backgroundColor: categoria ? purple : disabled }}
                    rounded 
                    size='large'
                    onPress={categoria ? handleClickCategoria : null} />
            }
        </ContainerBody>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        categoriasSelected: (categorie) => dispatch(ActionCreators.categoriasSelected(categorie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorieItem);