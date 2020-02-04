import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { lightgray } from '../../common/util/colors'
import styles from './styles'

export default Search = (props) => {
    const [search, setSearch] = useState('')

    const handleTextChange = (text) => {
        setSearch(text)
        props.onChangeText(text)
    }

    return (
        <SearchBar placeholder="Pesquisar "
            placeholderTextColor={lightgray}
            inputContainerStyle={styles.searchInputContainerStyle}
            inputStyle={{ color: 'white', marginTop: 7 }}
            containerStyle={styles.searchContainerStyle}
            onChangeText={(text) => handleTextChange(text)}
            value={search}
            searchIcon={<Icon name='search' size={24} color='white' />}
            clearIcon={<Icon name='close' size={24} color='white' onPress={() => handleTextChange('')} />}
        />
    )
}
