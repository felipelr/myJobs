import { createActions } from 'reduxsauce'

export const {  Types, Creators } = createActions({
    //Actions de Categorias
    categoriasLoadRequest: ['token'],
    categoriasLoadSuccess: ['data'],
    categoriasLoadError: ['error']
})

export default Creators