import React from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import { styles, Title, ContainerBody } from './styles'

const CategorieItem = (props) => {
    const { categoria } = props

    const handleClickCategoria = () => {
        props.categoriasSelected(categoria);
    }

    return (
        <ContainerBody>
            <Title>{categoria.description}</Title>
            <TouchableOpacity onPress={handleClickCategoria}>
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
 
const mapStateToProps = (state, ownProps) => {
    return {
        selected: state.categoria.selected,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        categoriasSelected: (categorie) => dispatch(ActionCreators.categoriasSelected(categorie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorieItem);