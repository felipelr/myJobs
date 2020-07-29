import styled from 'styled-components'
import { white, lightpurple } from '../../components/common/util/colors'

export const ViewChatDate = styled.View`
    width: 100%;
    padding: 2px;
    justify-content: space-evenly;
    align-items: center;
`

export const TextChatDate = styled.Text`
    border-radius: 2px;
    padding-top: 3px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 3px;
    background-color: ${lightpurple};
    color: ${white};
    font-size: 12px;
    text-align: center;
    elevation: 1;
`