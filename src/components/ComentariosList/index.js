import React from 'react'; 
import PropTypes from 'prop-types'

import { SvwContainerComentarios} from './styles'
import Comentario from '../../components/Comentario/index'

const ComentariosList = (props) => { 

    const {comentarios} = props

    return (
        <SvwContainerComentarios>
             {
                 comentarios.map((item) => (
                    <Comentario 
                        key={item.id}
                        avaliacao={item.avaliacao}  
                        usuarioImagem={item.usuarioImagem}
                        usuarioNome={item.usuarioNome} 
                        comentario={item.comentario}  />
                 ))
             }
        </SvwContainerComentarios>
    )
}

ComentariosList.propTypes = {
    comentarios: PropTypes.array.isRequired
}

export default ComentariosList;


