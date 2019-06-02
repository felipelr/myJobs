import styled from 'styled-components'
import { purple, lightgray } from '../../components/common/util/colors'

export const ScrollViewContainer = styled.ScrollView.attrs({
    horizontal: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 }
})`
    flex: 1;
    background-color: ${lightgray};
`

export const TextHireService = styled.Text`
    font-family: 'SF-Pro-Text-Regular';
    font-size: 22px;
    color: ${purple};
    margin-top: 10px;
    margin-left: 8px;
    margin-bottom: 10px;
`

export const ViewCardContainer = styled.View`
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
`

export const ViewCardContent = styled.View`
    justify-content: space-evenly;
    flex: 1;
`

export const ViewContainerConfirmar = styled.View`
    width: 200px;
    align-self: center;
    margin-top: 20px;
`