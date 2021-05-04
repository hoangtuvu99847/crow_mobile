import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import Room from '../screens/Room';
import Status from '../screens/Status';

const NavDrawer = createDrawerNavigator()
export default function Drawer() {
    return (
        <NavigationContainer>
            <NavDrawer.Navigator initialRouteName="Home">
                <NavDrawer.Screen name="Home" component={Room} />
                <NavDrawer.Screen name="Notifications" component={Status} />
            </NavDrawer.Navigator>
        </NavigationContainer>
    )
}
