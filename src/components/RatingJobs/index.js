import React, { useState, useEffect, useRef } from 'react'
import { Rating } from 'react-native-elements'
import { ContainerRating, RatingText } from './styles'
import { white, black } from '../common/util/colors'
import assets from './assets'

export default function RatingJobs({ backPurple, avaliacao, qtdeAvaliacoes, ...props }) {
    const [value, setValue] = useState(0)
    const [text, setText] = useState(0)
    const [color, setColor] = useState(black)

    const unmontRef = useRef()

    useEffect(() => {
        unmontRef.current = false;
        return () => {
            unmontRef.current = true;
        }
    }, [])

    useEffect(() => {
        if (!unmontRef.current) {
            setValue(avaliacao == null ? 0 : parseInt(avaliacao))
        }
    }, [avaliacao])

    useEffect(() => {
        if (!unmontRef.current) {
            setText(qtdeAvaliacoes == 0 ? '' : qtdeAvaliacoes > 999 ? ((qtdeAvaliacoes / 1000) + 'k') : qtdeAvaliacoes)
        }
    }, [qtdeAvaliacoes])

    useEffect(() => {
        if (!unmontRef.current) {
            setColor(backPurple ? white : black)
        }
    }, [backPurple])

    return (
        <ContainerRating>
            {backPurple && <Rating readonly type='custom' imageSize={16} fractions={1} startingValue={value} ratingBackgroundColor={white} ratingImage={assets.star} />}
            {!backPurple && <Rating readonly type='star' imageSize={16} fractions={1} startingValue={value} ratingBackgroundColor={white} />}
            <RatingText color={color}>{text}</RatingText>
        </ContainerRating>
    )
}