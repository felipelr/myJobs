import React from 'react'
import { Picker } from 'react-native'
import { ViewContainer, PickerCustom } from './styles'

export default function PickerJobs(props) {
    const { onValueChange } = props
    const { selectedValue } = props
    const { itemsList } = props
    return (
        <ViewContainer>
            <PickerCustom
                selectedValue={selectedValue}
                onValueChange={onValueChange}>
                {
                    itemsList &&
                    itemsList.map((item, index) => {
                        return <Picker.Item key={index} label={item.label} value={item.value} />
                    })
                }
            </PickerCustom>
        </ViewContainer>
    )
}