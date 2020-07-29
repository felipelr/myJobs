import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { white, lightpurple, black } from '../../components/common/util/colors'
const { height, width } = Dimensions.get('window')

export const ScrollViewContainerMessages = styled.ScrollView.attrs({
    horizontal: false,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2, flexGrow: 1 },
    keyboardShouldPersistTaps: 'always'
})`
    flex: 1;
`