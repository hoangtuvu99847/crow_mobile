import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation } from '@react-navigation/native';
import Room from '../screens/Room';
import Status from '../screens/Status';
import Icon from 'react-native-vector-icons/Ionicons';
import Message from '../screens/Message';
import { BUTTON_ICON } from '../../utils/colors';
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from 'react-native-elements/dist/buttons/Button';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from '../screens/Search';
import ListMessage from '../screens/ListMessage';


// OPRIONS OF EACH SCREEN  

const RoomScreenCustomizeOptions = (route, navigation) => {
    const handleClickMenu = () => { navigation.openDrawer() }
    const handleClickSearch = () => { navigation.navigate('Search') }
    return {
        headerLeft: () => (
            <TouchableOpacity style={{ marginTop: 5, marginHorizontal: 10 }} onPress={() => handleClickMenu()}>
                <Icon name='menu' size={20} style={{ marginHorizontal: 6 }} />
            </TouchableOpacity>
        ),
        headerTitle: () => (
            <View>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>{getHeaderTitle(route)}</Text>
            </View>
        ),
        headerRight: () => (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleClickSearch()} style={{ marginTop: 7 }}>
                    <Icon name='search' size={20} />
                </TouchableOpacity>
                <Avatar
                    rounded
                    onPress={() => { }}
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                    containerStyle={{ marginHorizontal: 16 }}
                />
            </View >
        )
    }
}

const SearchScreenCustomizeOptions = (route, navigation) => {
    return {
        headerTitle: () => (
            <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>Search</Text>
            </View>
        ),

    }
}
const MessageScreenCustomizeOptions = (route, navigation) => {
    const { roomName } = route.params
    return {
        headerTitle: () => (
            <View style={{ marginHorizontal: 0 }}>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>{roomName}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Icon name="ellipse" size={12} color={'green'}><Text>50/50 users</Text></Icon> */}
                    <Icon name="ellipse" style={{ marginTop: 2, marginRight: 4 }} size={12} color={'green'}></Icon><Text style={{ fontSize: 12 }}>1 people</Text>
                </View>
            </View>
        ),
        headerRight: () => (
            <View style={{ flexDirection: "row", marginHorizontal: 6 }}>
                <Button onPress={() => handleClickSearch()} icon={
                    <Icon name='search' size={20} />
                }>
                </Button>
            </View>
        )
    }
}


// ====================================================

function getHeaderTitle(route) {
    const routerName = getFocusedRouteNameFromRoute(route) ?? "Crow Message"
    switch (routerName) {
        case "Room":
            return "Room"
        case "Messages":
            return "Messages"
        default:
            return "Messages"
    }

}


const Tab = createBottomTabNavigator()
function TabNavigation({ navigation, route }) {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name == "Room") {
                    return <Icon name="people-circle-outline" size={size} color={color} />
                } else if (route.name == "Status") {
                    return <Icon name="ios-information-circle" size={size} color={color} />
                } else if (route.name == "Messages") {
                    return <Icon name="chatbubbles-outline" size={size} color={color} />
                }
            }

        })} tabBarOptions={{
            activeTintColor: BUTTON_ICON.ACTIVE,
            inactiveTintColor: BUTTON_ICON.INACTIVE,
        }}>
            {/* <Tab.Screen name="Message" component={Message} /> */}
            <Tab.Screen name="Messages" component={ListMessage} />
            <Tab.Screen name="Room" component={Room} options={{}} />
            <Tab.Screen name="Status" component={Status} />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator()


function Chat({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Crow' component={TabNavigation} options={({ route }) => RoomScreenCustomizeOptions(route, navigation)}></Stack.Screen>
            <Stack.Screen name="Search" component={Search} options={({ route }) => SearchScreenCustomizeOptions(navigation)}></Stack.Screen>
            <Stack.Screen name="Message" component={Message} options={({ route }) => MessageScreenCustomizeOptions(route, navigation)}></Stack.Screen>
        </Stack.Navigator>
    )
}

// INIT STACK NAVIGATION MODULE SOCIAL HERE!!!!
function Social() {
    return (
        <Stack.Navigator>
            <Stack.Screen ></Stack.Screen>
        </Stack.Navigator>
    )
}

function SearchScree() {
    return (
        <Stack.Screen name="Search" component={Search}></Stack.Screen>
    )
}


const NavDrawer = createDrawerNavigator()
export default function RootNavigation() {
    return (
        <NavigationContainer>
            <NavDrawer.Navigator initialRouteName="Chat">
                <NavDrawer.Screen name="Home" component={Social}></NavDrawer.Screen>
                <NavDrawer.Screen name="Chat" component={Chat}></NavDrawer.Screen>
            </NavDrawer.Navigator>
        </NavigationContainer>
    )
}