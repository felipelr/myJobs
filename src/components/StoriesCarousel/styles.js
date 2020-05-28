import styled from 'styled-components'
import { gray, white } from '../common/util/colors'

export const ViewContainer = styled.View`
    flex: 1;
`

export const ViewContainerAbsolute = styled.View`
    padding: 10px;
    width: 100%;
`

export const ViewInfo = styled.View`
    padding: 5px;
    flex: 1;
    flex-direction: row;
`

export const TextInfo = styled.Text`
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    align-self: center;
    padding-left: 10px;
`

export const ImageItem = styled.Image`
    flex: 7.5;
    background-color: ${gray};
    width: 100%;
    height: 100%;
`

export const TextItem = styled.Text`
    flex: 1.5;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    padding: 10px;
`