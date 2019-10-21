import React from 'react'
import { Picker } from 'react-native'
import { ViewContainer, PickerCustom } from './styles'

export default function PickerJobs({ onValueChange, selectedValue, itemsList, style }) {
    return (
        <ViewContainer style={style}>
            <PickerCustom
                selectedValue={selectedValue}
                onValueChange={onValueChange}>
                {
                    itemsList &&
                    itemsList.map((item, index) => {
                        if (item.value)
                            return <Picker.Item key={index} label={item.label} value={item.value} />
                        else
                            return <Picker.Item key={index} label={item.name} value={item.id} />
                    })
                }
            </PickerCustom>
        </ViewContainer>
    )
}