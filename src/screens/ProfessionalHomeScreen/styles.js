import styled from 'styled-components'
import {purple, lightgray, white} from '../../components/common/util/colors'
import actualDimensions from '../../components/common/util/dimensions'

export const Capa = styled.Image.attrs(props => ({
    source: props.imagem
}))`
    width:100%;
    height:130; 
`

export const VwContainerTitle = styled.View`
    height:20%;
    background-color: white;
    border-radius: 10;
    align-items: center;
    justify-content: flex-end;
    margin:0;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-bottom: 5px;
    font-weight: bold;
`

export const VwContainerRating = styled.View`
    flex: 1;
    align-self: flex-start;
    margin-top: 10% ;
` 

export const VwContainerContent = styled.View`
    flex: 3;
    background-color: ${lightgray};
`

export const VwContainerServices = styled.View`
    height: 120;
    background-color: ${white};
    margin-top: 2;
`

export const VwContainerStories = styled.View`
    height: 200;
    background-color: ${white};
    margin-top: 2; 
` 

export const VwContainerRatingComentario = styled.View`
    height:200;
    justify-content:flex-end;
    margin-left:5;
` 

export const ContainerAvatar = styled.View`
    flex: 1;
    position: absolute; 
    right: 0;  
    left: 0;
    align-items: center;
    top: ${((actualDimensions.height - 692) * 0.23 + 40)};
`

export const ContentComentarios = styled.View`
    flex: 1.5;
    background-color: ${white};
    margin-top: 2;
    justify-content: flex-end; 
`