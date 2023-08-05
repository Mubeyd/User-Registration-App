import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { palette } from '../constants/Layout';
import { useUserContext } from '../navigation/Routes';

const CustomDrawer = (props: any) => {
  const { userPersonalInfo, logout } = useUserContext();

  const onLogout = useCallback(async () => {
    logout();
  }, [logout]);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: palette.mainColor }}>
        <View style={{ padding: 20 }}>
          <Image
            source={
              userPersonalInfo?.avatarUrl
                ? {
                    uri: userPersonalInfo?.avatarUrl || 'https://www.w3schools.com/howto/img_avatar.png',
                  }
                : require('../assets/images/user-profile.jpg')
            }
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {userPersonalInfo?.fullName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 name="phone" size={14} color="#fff" />
            <Text
              style={{
                color: '#fff',
                marginLeft: 5,
              }}>
              {userPersonalInfo?.phone}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
