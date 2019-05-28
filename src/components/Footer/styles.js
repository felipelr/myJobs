import styled from 'styled-components/native'
import { purple } from '../common/util/colors'

export const ContainerFooter = styled.View`
    padding: 8px;
    background-color: ${purple};
    flex-direction: row;
`

export const FooterButton = styled.TouchableOpacity`
    flex: 1;
    align-content: space-around;
    align-items: center;
`

export const ItemRounded = styled.View`
    border-radius: 50px;
    padding: 2px;
    background-color: ${props => `${props.backColor}`};
`

