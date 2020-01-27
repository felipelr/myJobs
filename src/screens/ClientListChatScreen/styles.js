import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, white } from '../../components/common/util/colors'

export const styles = StyleSheet.create({
    elevation: 2
})

export const ScrollViewContainer = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``

export const ViewContainer = styled.View`
    background-color: ${white};
    flex: 1;
`