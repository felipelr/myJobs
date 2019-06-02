import styled from 'styled-components'
import {purple} from '../../components/common/util/colors'

export const Capa = styled.Image.attrs(props => ({
    source: props.imagem
}))`
    width:100%;
    height:100%;
`

export const ContainerTitle = styled.View`
    flex: 1;
    background-color: white;
    border-top-right-radius: 20; 
    border-top-left-radius: 20;
    align-items: center;
    justify-content: flex-end;
    margin:0;
`

export const Title = styled.Text`
    font-size: 18;
    color: ${purple};
    margin-bottom: 5px;
    font-weight: bold;
`

export const ContainerRating = styled.View`
    flex: 1;
    align-self: flex-start;
    margin-top: 10% ;
`

export const Space = styled.View`
    flex:1;
`