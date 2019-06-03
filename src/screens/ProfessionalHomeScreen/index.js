import React from 'react'
import { View, Platform, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    Capa, VwContainerTitle, TxtTitle, VwContainerRating,
    VwContainerContent, VwContainerServices, VwContainerStories,
    ContainerAvatar, ContentComentarios
} from './styles'
import assets from '../../screens/ProfessionalHomeScreen/assets';
import RatingJobs from '../../components/RatingJobs/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import Stories from '../../components/Stories/index'
import CardsServices from '../../components/CardsServices/index';
import ComentariosList from '../../components/ComentariosList';
import { lightgray } from '../../components/common/util/colors';
import Footer from '../../components/Footer/index'

export default function ProfessionalHomeScreen(props) {

    const empresa = {
        imagem: 'https://www.agenciadosite.com.br/wp-content/uploads/2017/11/logo-para-petshop-2.jpg',
        nome: 'Finos e Cheirosos'
    }

    const stories = [
        {
            id: 1,
            titulo: 'Banho e Tosa',
            imagem: 'https://www.petz.com.br/blog/wp-content/uploads/2019/02/cao-no-banho.jpg'
        },
        {
            id: 2,
            titulo: 'Vacinas',
            imagem: 'https://www.caes-e-cia.com.br//admin/storage/Imagens/iStock-153066692.jpg'
        },
        {
            id: 3,
            titulo: 'Analise',
            imagem: 'https://www.ictq.com.br/images/varejo_farmaceutico/FARMACEUTICO-VETERINARIO-ICTQ.jpg'
        }
    ]

    const servicos = [
        {
            id: 1,
            titulo: 'Banho e Tosa',
            descricao: 'Serviço completo de higienização das partes intimas e lavagem com shampoo anti-pulgas',
            avaliacao: 5,
            qtdeAvaliacoes: 5644
        },
        {
            id: 2,
            titulo: 'Vacinação',
            descricao: 'Vacinas importadas com a melhor qualidade do mercado aplicada com muito carinho no seu pet',
            avaliacao: 5,
            qtdeAvaliacoes: 1354
        },
        {
            id: 3,
            titulo: 'Consulta Veterinaria',
            descricao: 'Exames de Sangue com aparelhos de ultima geração para seu Pet.',
            avaliacao: 5,
            qtdeAvaliacoes: 2345
        }
    ]

    const comentarios = [
        {
            id: 1,
            avaliacao: 5,
            usuarioImagem: 'https://blog.intercomassets.com/wp-content/uploads/2019/04/15153622/PatrickAndrewsLo.jpg',
            usuarioNome: 'Ricardo',
            comentario: 'Excelente serviço, meu pet amou'
        },
        {
            id: 2,
            avaliacao: 3,
            usuarioImagem: 'https://www.citrix.com/blogs/wp-content/uploads/2017/05/Citrix-Blog-User-Bio-Photo-5.png',
            usuarioNome: 'Juliana',
            comentario: 'O serviço em sí é bom, mas poderiam oferecer diferenciais'
        },
        {
            id: 3,
            avaliacao: 5,
            usuarioImagem: 'https://secure.gravatar.com/avatar/b10f7ddbf9b8be9e3c46c302bb20101d?s=400&d=mm&r=g',
            usuarioNome: 'Kelly',
            comentario: 'Sempre levo os meus Pets lá, adoro o serviço e o cuidado!'
        }
    ]

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <HeaderJobs back />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }} behavior={behavior}>
                    <Capa imagem={assets.capa} />
                    <VwContainerTitle>
                        <VwContainerRating>
                            <RatingJobs avaliacao={5} qtdeAvaliacoes={130000} />
                        </VwContainerRating>
                        <TxtTitle size={20}>
                            {empresa.nome}
                        </TxtTitle>
                    </VwContainerTitle>
                    <VwContainerContent>
                        <VwContainerStories>
                            <TxtTitle size={10}>
                                Stories
                        </TxtTitle>
                            <Stories novaImagem stories={stories} />
                        </VwContainerStories>
                        <VwContainerServices>
                            <TxtTitle size={10}>
                                Serviços
                        </TxtTitle>
                            <CardsServices servicos={servicos} />
                        </VwContainerServices>
                        <ContentComentarios> 
                            <TxtTitle size={10}>
                                Comentários do Serviço: Banho e Tosa
                            </TxtTitle>
                            <ComentariosList comentarios={comentarios} />
                        </ContentComentarios> 
                    </VwContainerContent>
                    <ContainerAvatar>
                        <Avatar
                            rounded
                            containerStyle={{ borderWidth: 0.5, borderColor: lightgray, elevation: 1 }}
                            avatarStyle={styles.shadow}
                            source={{
                                uri: empresa.imagem,
                            }}
                            size={140} />
                    </ContainerAvatar>
                </View>
            </ScrollView>
            <Footer />
        </React.Fragment>
    )
}

ProfessionalHomeScreen.navigationOptions = {
    header: null
}