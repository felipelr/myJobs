import styled from 'styled-components/native'
import { white, purple } from '../common/util/colors'

export const ContainerFooter = styled.View`
    padding: 10px;
    background-color: ${purple};
    flex-direction: row;
`

export const FooterButton = styled.TouchableOpacity`
    flex: 1;
    align-content: space-around;
    align-items: center;
`

export const ItemRounded = styled.View`
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50px;
    background-color: ${props => `${props.backColor}`};
`

