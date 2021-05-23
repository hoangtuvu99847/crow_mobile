import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { ListItem, Icon, Avatar, LinearProgress, Text } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BUTTON_ICON, ICON} from '../../utils/colors';
import RoomService from '../services/room.service';

export default function Room({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getListRoom().then(r => {});
  }, []);

  const getListRoom = () => {
    setIsLoading(true);
    return RoomService.list()
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => console.log('ERROR: getListRoom :: -> ', error))
      .finally(() => setIsLoading(false));
  };
  const joinRoom = item => {
    return navigation.navigate('Message', {roomName: item.name});
  };

  const renderLoading = () => {
    return (
      <View>
        <LinearProgress color="primary" style={{maxHeight: '70%'}} />
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View>
        {rooms.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => joinRoom(l)}>
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
            </ListItem.Content>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>10/20 </Text>
              <Ionicons
                name="person"
                size={13}
                color="gray"
                style={{marginTop: 1}}
              />
            </View>
          </ListItem>
        ))}
      </View>
    );
  };

  return isLoading ? renderLoading() : renderContent();
}
