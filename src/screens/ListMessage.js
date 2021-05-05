import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Avatar, Input, ListItem, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import socket from '../../socket'
import { BUTTON_ICON } from '../../utils/colors'


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
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
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


export default function ListMessage() {
    useEffect(() => {
        socket.connect()
        console.log('use');
    }, [])
    return (
        <View style={styles.container}>
            <Input inputContainerStyle={styles.inputContainer}
                style={{ fontSize: 12, height: "50%" }}
                placeholder='Search'
                leftIcon={
                    <Icon style={{ marginHorizontal: 10 }}
                        name='search'
                        size={22}
                        color='gray'
                    />
                }
            />
            <View style={{ marginTop: 0 }}>
                <ScrollView>
                    {
                        list.map((l, i) => (
                            <ListItem key={i} bottomDivider onPress={() => { }}>
                                <Avatar source={{ uri: l.avatar_url }} />
                                <ListItem.Content>
                                    <View style={{ flexDirection: "row" }}>
                                        <ListItem.Title>{l.name}</ListItem.Title>

                                    </View>
                                    <View>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                                <View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{ fontSize: 12, color: "gray" }}>5:00 PM</Text>
                                        <Icon name="time" size={12} color={"gray"} style={{marginTop: 2, marginHorizontal: 2}} />
                                    </View>
                                </View>

                            </ListItem>
                        ))
                    }
                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 0,
        maxHeight: "60%",
        maxWidth: "90%",
        alignSelf: "center",
        borderRadius: 10
    },
    inputs: {
        borderBottomColor: 'gray',
        flex: 1,
    },
    container: {
        // flex: 1,
        backgroundColor: "#ffffff",
        paddingVertical: 16,
    }
})