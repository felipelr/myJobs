import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"

import { ViewContainer, ViewItem, ViewItemLast, ImageItem } from './styles'

function GaleryMyJobs({ onItemPress }, ...props) {
    const [imagesFolder, setImagesFolder] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [endCursor, setEndCursor] = useState('')

    useEffect(() => {
        loadGaleryPhotos()
    }, [])

    const loadGaleryPhotos = () => {
        if (hasNextPage) {
            CameraRoll.getPhotos({
                first: 15,
                after: endCursor,
                assetType: 'Photos',
            })
                .then(r => {
                    const photos = r.edges.map(item => item.node.image)
                    if (imagesFolder.length > 0)
                        setImagesFolder([...imagesFolder, ...photos])
                    else
                        setImagesFolder(photos)
                    setHasNextPage(r.page_info.has_next_page)
                    setEndCursor(r.page_info.end_cursor)
                })
                .catch((err) => {
                    console.error(err)
                    setImagesFolder([])
                })
        }
    }

    return (
        <ViewContainer>
            <FlatList
                numColumns={3}
                data={imagesFolder}
                keyExtractor={image => image.filename}
                renderItem={({ index, item }) => (
                    <React.Fragment>
                        {(index + 1) % 3 !== 0 &&
                            <ViewItem onPress={() => onItemPress(item)}>
                                <ImageItem
                                    source={{ uri: item.uri }}
                                    resizeMode="cover"
                                />
                            </ViewItem>}
                        {(index + 1) % 3 === 0 &&
                            <ViewItemLast onPress={() => onItemPress(item)}>
                                <ImageItem
                                    source={{ uri: item.uri }}
                                    resizeMode="cover"
                                />
                            </ViewItemLast>}
                    </React.Fragment>
                )}
                onEndReached={(info) => loadGaleryPhotos()}
            />
        </ViewContainer>
    )
}

export default GaleryMyJobs