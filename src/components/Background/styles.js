import styled from 'styled-components/native'
import { purple, lightgray } from '../common/util/colors'


export const Container = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
`

export const ContainerPurple = styled.View`
    background-color: ${purple};
    flex: 1;
`

export const ContainerGray = styled.View`
    background-color: ${lightgray};
    flex: 1.8;
`