import styled from 'styled-components'
import { purple, lightgray } from '../../components/common/util/colors'

export const ScrollViewContainer = styled.ScrollView.attrs({
    showHorizontalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 }
})`
    background-color: ${lightgray};
`

export const TextHireService = styled.Text`
    font-family: 'SF-Pro-Text-Regular';
    font-size: 22px;
    color: ${purple};
    margin-top: 10px;
    margin-left: 16px;
    margin-bottom: 10px;
`

export const ViewCardContainer = styled.View`
    justify-content: center;
    flex: 1;
`

export const ViewContainerConfirmar = styled.View`
    width: 250px;
    align-self: center;
    margin-top: 20px;
`

export const TexService = styled.Text`
    font-family: 'SF-Pro-Text-Regular';
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
    color: ${purple};
`

export const TextName = styled.Text`
    font-family: 'SF-Pro-Text-Regular';
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
`