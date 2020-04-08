import React from 'react'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import { styles, Title, ContainerBody } from './styles'
import { purple, disabled } from '../common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

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
                    size={heightPercentageToDP('11%')}
                    onPress={categoria ? handleClickCategoria : null} />
            }
            {!categoria &&
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={{ backgroundColor: categoria ? purple : disabled }}
                    rounded 
                    size={heightPercentageToDP('11%')}
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