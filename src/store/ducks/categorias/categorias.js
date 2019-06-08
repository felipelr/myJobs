import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
    getCategorias: []
})

const INITIAL_STATE = [];

const get = (state = INITIAL_STATE) => (
    state
)

export default createReducer(INITIAL_STATE, {
    [Types.GET_CATEGORIAS]: get
})