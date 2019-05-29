import React from 'react'
import { Rating } from 'react-native-elements'
import { ContainerRating, RatingText } from './styles'
import { white, black } from '../common/util/colors'
import assets from './assets'

export default function RatingJobs(props) {
    function abbrNum(number, decPlaces) {
        decPlaces = Math.pow(10, decPlaces);
        const abbrev = ["k", "m", "b", "t"];
        for (let i = abbrev.length - 1; i >= 0; i--) {
            let size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if ((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }
        return number;
    }

    const { backPurple } = props
    const { avaliacao } = props
    const { qtdeAvaliacoes } = props
    const qtdeAvaliacoesAbbr = abbrNum(qtdeAvaliacoes, 2)
    return (
        <ContainerRating>
            {backPurple && <Rating readonly type='custom' imageSize={10} fractions={1} ratingImage={assets.star} startingValue={avaliacao} />}
            {!backPurple && <Rating readonly type='custom' imageSize={10} fractions={1} startingValue={avaliacao} ratingBackgroundColor='#F5F5F5'/>}
            <RatingText color={backPurple ? white : black}>{qtdeAvaliacoesAbbr}</RatingText>
        </ContainerRating>
    )
}