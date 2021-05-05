import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Icon, Avatar } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";
import { BUTTON_ICON, ICON } from '../../utils/colors';

export default function Room({ navigation }) {
    const list = [
        {
            name: 'Amy Farha',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            subtitle: 'Vice Chairman'
        },
    ]
    const joinRoom = (item) => {
        navigation.navigate('Message', { roomName: item.name })
    }
    return (
        <View>
            {
                list.map((l, i) => (
                    <ListItem key={i} bottomDivider onPress={() => joinRoom(l)}>
                        <Ionicons name='people-circle-outline' size={30} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        <View style={{ flexDirection: "row" }}>
                            
                            <Text style={{fontSize: 12, color: "gray"}}>10/20 </Text> 
                            <Ionicons name='person' size={13} color="gray" style={{marginTop: 1}} />
                        </View>
                    </ListItem>
                ))
            }
        </View>
    )
}
