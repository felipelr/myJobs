import React from 'react'
import { Header } from 'react-native-elements' 
 
import styles from './styles'
import Title from './Title/index'
import Back from './Back/index'
import Search from './Search/index'
import Filter from './Filter/index'
import Chat from './Chat/index'

export default function HeaderJobs(props) {

    const { title, filter, back, chat, imagem } = props
    
    return (
        <Header
            containerStyle={styles.headerContainerStyle}
            centerComponent={title != null ? <Title imagem={props.imagem} title={props.title}/> : <Search />}
            rightComponent={filter ? <Filter /> : chat ? <Chat /> : null}
            leftComponent={back && <Back />} 
        >
        </Header>
    )
} 
