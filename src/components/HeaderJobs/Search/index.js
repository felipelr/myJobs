import React, { useState } from 'react'  
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { lightgray } from '../../common/util/colors'
import styles from './styles' 

export default Search = () => {

    //Botão que aparece ao digitar algum texto no input
    const ClearButton = () => {
        return (
            <TouchableOpacity onPress={() => setSearch('')}>
                <Icon name='close' size={24} color='white' />
            </TouchableOpacity>
        )
    }

    const [search, setSearch] = useState('')
    return (
        <SearchBar placeholder="Pesquisar "
            placeholderTextColor={lightgray}
            inputContainerStyle={styles.searchInputContainerStyle}
            inputStyle={{ color: 'white', marginTop: 7 }}
            containerStyle={styles.searchContainerStyle}
            onChangeText={(e) => setSearch(e)}
            value={search}
            searchIcon={<Icon name='search' size={24} color='white' />}
            clearIcon={search != '' && <ClearButton />}
        />
    )
}
