import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Icon, Avatar } from 'react-native-elements'

export default function Room({navigation}) {
    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ]
    const joinRoom = (item) => {
        console.log(item)
        navigation.navigate('Message')
    }
    return (
        <View>
            {
                list.map((l, i) => (
                    <ListItem key={i} bottomDivider onPress={() => joinRoom(l)}>
                        <Avatar source={{ uri: l.avatar_url }} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}
