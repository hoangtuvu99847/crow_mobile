import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Room from '../screens/Room';
import Status from '../screens/Status';
import Icon from 'react-native-vector-icons/Ionicons';
import Message from '../screens/Message';
import { BUTTON_ICON } from '../../utils/colors';
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from 'react-native-elements/dist/buttons/Button';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from '../screens/Search';


// OPRIONS OF EACH SCREEN  

const ChatScreenCustomizeOptions = (navigation) => {
    const handleClickMenu = () => { navigation.openDrawer() }
    const handleClickSearch = () => { navigation.navigate('Search') }
    return {
        headerLeft: () => (
            <Button icon={
                <Icon name='menu' size={20} onPress={() => handleClickMenu()} style={{ marginHorizontal: 6 }} />
            }>
            </Button>
        ),
        // headerTitle: () => (
        //     <View style={{ marginHorizontal: 0 }}>
        //         <Text style={{ fontWeight: "600", fontSize: 18 }}>KT Vũ</Text>
        //         <View>
        //             <Icon name="radio-button-on-outline" size={12} color={'green'}><Text>Active</Text></Icon>
        //         </View>
        //     </View>
        // ),
        headerRight: () => (
            <View style={{ flexDirection: "row" }}>
                <Button onPress={() => handleClickSearch()} icon={
                    <Icon name='search' size={20} />
                }>
                </Button>
                <Avatar
                    rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                    containerStyle={{ marginHorizontal: 16 }}
                />
            </View>
        )
    }
}

const SearchScreenCustomizeOptions = (navigation) => {
    return {

    }
}



// ====================================================


const Tab = createBottomTabNavigator()
function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name == "Room") {
                    return <Icon name="people-circle-outline" size={size} color={color} />
                } else if (route.name == "Status") {
                    return <Icon name="ios-information-circle" size={size} color={color} />
                } else if (route.name == "Message") {
                    return <Icon name="chatbubbles-outline" size={size} color={color} />

                }
            },

        })} tabBarOptions={{
            activeTintColor: BUTTON_ICON.ACTIVE,
            inactiveTintColor: BUTTON_ICON.INACTIVE,
        }}>
            {/* <Tab.Screen name="Message" component={Message} /> */}
            <Tab.Screen name="Room" component={Room} />
            <Tab.Screen name="Status" component={Status} />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator()


function Chat({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Chats' component={TabNavigation} options={ChatScreenCustomizeOptions(navigation)}></Stack.Screen>
            <Stack.Screen name="Search" component={Search} options={SearchScreenCustomizeOptions(navigation)}></Stack.Screen>
            <Stack.Screen name="Message" component={Message} options={SearchScreenCustomizeOptions(navigation)}></Stack.Screen>
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