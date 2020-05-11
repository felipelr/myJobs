import React, { useState, useEffect } from 'react'
import { Rating } from 'react-native-elements'
import { ContainerRating, RatingText } from './styles'
import { white, black } from '../common/util/colors'
import assets from './assets'

export default function RatingJobs({ backPurple, avaliacao, qtdeAvaliacoes, ...props }) {
    const [qtdeAvaliacoesAbbr, setQtdeAbbr] = useState(0)

    useEffect(() => {
        setQtdeAbbr(abbrNum(qtdeAvaliacoes, 2))
    }, [])

    const abbrNum = (number, decPlaces) => {
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

    return (
        <ContainerRating>
            {backPurple && <Rating readonly type='custom' imageSize={16} fractions={1} startingValue={avaliacao == null ? 0 : parseInt(avaliacao)} ratingBackgroundColor={white} ratingImage={assets.star} />}
            {!backPurple && <Rating readonly type='star' imageSize={16} fractions={1} startingValue={avaliacao == null ? 0 : parseInt(avaliacao)} ratingBackgroundColor={white} />}
            <RatingText color={backPurple ? white : black}>{qtdeAvaliacoesAbbr == 0 ? '' : qtdeAvaliacoesAbbr}</RatingText>
        </ContainerRating>
    )
}