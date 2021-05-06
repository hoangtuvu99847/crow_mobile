import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ListItem, Icon, Avatar, LinearProgress } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";
import { requestGetListRoom } from '../../utils/api';
import { BUTTON_ICON, ICON } from '../../utils/colors';

export default function Room({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [rooms, setRoom] = useState([])

    useEffect(() => {
        getListRoom()
    }, [])


    const getListRoom = async () => {
        setIsLoading(true)
        try {
            const response = await requestGetListRoom();
            setRoom(response.data)
        } catch (error) {
            console.log("ERROR: getListRoom", error);
        } finally {
            setIsLoading(false)
        }
    }
    const joinRoom = (item) => {
        navigation.navigate('Message', { roomName: item.name })
    }

    // RENDER TEMPLATE 
    const renderLoading = () => {
        return (
            <View>
                <LinearProgress color="primary" style={{ maxHeight: "70%" }} />
            </View>
        )
    }
    const renderContent = () => {
        return (
            <View>
                {
                    rooms.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => joinRoom(l)}>
                            <Ionicons name='people-circle-outline' size={30} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                            </ListItem.Content>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, color: "gray" }}>10/20 </Text>
                                <Ionicons name='person' size={13} color="gray" style={{ marginTop: 1 }} />
                            </View>
                        </ListItem>
                    ))
                }
            </View>
        )
    }


    return isLoading ? renderLoading() : renderContent()

}
