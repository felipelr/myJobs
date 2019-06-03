import React from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'

import { VwContainerComentario, TxtTitle,VwContentComentario } from './styles'
import { black } from '../../components/common/util/colors'
import RatingJobs from '../../components/RatingJobs'

const Comentario = (props) => {

    const { comentario, usuarioImagem, avaliacao, qtdeAvaliacoes } = props

    return (
        <VwContainerComentario>
            <View style={{ flex: 1 }}>
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    rounded
                    source={{
                        uri: usuarioImagem,
                    }}
                    size={60} />
            </View>
            <View style={{ flex: 2 }}>
                <TxtTitle size={9} color={black}>
                    "{comentario}"
                </TxtTitle>
                <VwContentComentario> 
                    <RatingJobs avaliacao={avaliacao} />
                </VwContentComentario>
            </View>
        </VwContainerComentario>
    )
}

Comentario.propTypes = {
    comentario: PropTypes.string.isRequired,
    usuarioImagem: PropTypes.string.isRequired,
    avaliacao: PropTypes.number.isRequired,
    usuarioNome: PropTypes.string.isRequired
}

export default Comentario;


