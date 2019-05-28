import React, { useState } from 'react'
import { Header, SearchBar, colors } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { purple, lightgray, lightpurple } from '../common/util/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HeaderJobs(props) {


    function Search() {

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
                inputContainerStyle={{
                    backgroundColor: lightpurple,
                    borderRadius: 25
                }}
                inputStyle={{
                    color: 'white'
                }}
                containerStyle={{
                    backgroundColor: purple,
                    width: '100%',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                onChangeText={(e) => setSearch(e)}
                value={search}
                searchIcon={<Icon name='search' size={24} color='white' />}
                clearIcon={search != '' && <ClearButton />}
            />

        )
    }

    return (
        <Header
            containerStyle={{
                backgroundColor: purple,
                justifyContent: 'space-between',
                paddingTop: 0
            }}
            centerComponent={<Search />}
        >
        </Header>


    )
}