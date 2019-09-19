import React from 'react'
import { Header } from 'react-native-elements'

import styles from './styles'
import Title from './Title/index'
import Back from './Back/index'
import Search from './Search/index'
import Filter from './Filter/index'
import Chat from './Chat/index'
import Confirm from './Confirm/index'

export default function HeaderJobs(props) {

    const { title, filter, back, chat, imagem, confirm } = props

    return (
        <Header
            containerStyle={styles.headerContainerStyle}
            centerComponent={title != null ? <Title imagem={props.imagem} title={props.title} /> : <Search />}
            rightComponent={filter ? <Filter /> : chat ? <Chat /> : confirm ? <Confirm onPress={confirm} /> : null}
            leftComponent={back && <Back  />}
        >
        </Header>
    )
} 
