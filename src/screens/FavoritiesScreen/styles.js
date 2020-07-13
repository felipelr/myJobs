import styled from 'styled-components'
import { white, black, lightgray } from '../../components/common/util/colors'

export const ScrollViewContainer = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
})``

export const ContainerLista = styled.View`
    background-color: ${white};
    flex: 1;
`
export const TitleProfessional = styled.Text`
    color: ${black};
    padding-left: 5px;
    font-size: 14px;
    font-family: 'SF-Pro-Text-regular';
    flex: 1;
`

export const InfoProfessional = styled.Text`
    color: ${black};
    font-size: 10px;
    font-family: 'SF-Pro-Text-Regular';
    padding-left: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    flex: 1;
`