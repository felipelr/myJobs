import React from 'react'
import { Picker } from 'react-native'
import { ViewContainer, PickerCustom } from './styles'

export default function PickerJobs({ onValueChange, selectedValue, itemsList, style }) {
    return (

        <ViewContainer>
            <PickerCustom
                selectedValue={selectedValue}
                style={style}
                onValueChange={onValueChange}>
                {
                    itemsList &&
                    itemsList.map((item, index) => {
                        if (item.value)
                            return <Picker.Item key={index} label={item.label} value={item.value} />
                        else if (item.name)
                            return <Picker.Item key={index} label={item.name} value={item.id} />
                        else
                            return <Picker.Item key={index} label={item.description} value={item.id} />
                    })
                }
            </PickerCustom>
        </ViewContainer>
    )
}