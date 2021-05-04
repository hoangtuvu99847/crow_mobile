import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Header } from "react-native-elements";
import { BUTTON_ICON, COLORS, ICON, TEXT } from '../../utils/colors';
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function MyHeader() {
    const navigation = useNavigation()
    const [isOpenSearch, setOpenSearch] = useState(false)


    const handleClickSearchAction = () => {
        setOpenSearch(!isOpenSearch)
        console.log('CLICK SEARCH: ', isOpenSearch)

    }
    const open = () => {
        navigation.openDrawer()
    }
    return (
        <View>
            <Header
                placement="left"
                backgroundColor={COLORS.BACKGROUND}
                leftComponent={{ icon: 'menu', color: TEXT.PRIMARY }}
                centerComponent={{ text: 'Chats', style: { color: TEXT.PRIMARY, fontWeight: 'bold', fontSize: 16 } }}
                rightComponent={{ icon: 'search', color: isOpenSearch ? BUTTON_ICON.ACTIVE : ICON.PRIMARY, onPress: () => handleClickSearchAction() }}
            />

        </View>

    )
}
