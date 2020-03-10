import styled from 'styled-components'
import { white, purple, black, lightgray } from '../common/util/colors'

export const ViewContainer = styled.View`
    flex: 1;
    padding: 8px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})`
`

export const TxtTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
    margin-top: 6px;
`

export const TxtDescription = styled.Text`
    font-size: 14px;
    padding-left: 6px;
`
export const ViewContainerButton = styled.View`
    width: 200px;
    align-self: center;
    margin-top: 32px;
    margin-bottom: 16px;
`