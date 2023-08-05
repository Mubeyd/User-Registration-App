import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import { palette } from '../../../constants/Layout';
import { useUserContext } from '../../../navigation/Routes';

export default function DashboardHomeScreen({ navigation }) {
  const { userPersonalInfo, userWorkAndEducation } = useUserContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.itemView}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold', color: '#212121' }}>
            {userPersonalInfo?.fullName}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={
                userPersonalInfo?.avatarUrl
                  ? {
                      uri: userPersonalInfo?.avatarUrl || 'https://www.w3schools.com/howto/img_avatar.png',
                    }
                  : require('../../../assets/images/user-profile.jpg')
              }
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.textHeader}>Personal Info</Text>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>Country</Text>
          <Text style={{ fontSize: 14 }}>{userPersonalInfo?.country}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>City</Text>
          <Text style={{ fontSize: 14 }}>{userPersonalInfo?.state}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>ID Number</Text>
          <Text style={{ fontSize: 14 }}>{userPersonalInfo?.idNo}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>Phone Number</Text>
          <Text style={{ fontSize: 14 }}>{userPersonalInfo?.phone}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>Gender</Text>
          <Text style={{ fontSize: 14 }}>{userPersonalInfo?.gender}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>Birth Date</Text>
          <Text style={{ fontSize: 14 }}>
            {moment(userPersonalInfo?.birthDate ?? new Date()).format('DD / MM / yyyy')}
          </Text>
        </View>

        <Text style={styles.textHeader}>Education</Text>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>School Name</Text>
          <Text style={{ fontSize: 14 }}>{userWorkAndEducation?.schoolName}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={styles.textTitle}>Graduation date</Text>
          <Text style={{ fontSize: 14 }}>
            {moment(userWorkAndEducation?.graduationDate ?? new Date()).format('DD / MM / yyyy')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textHeader: {
    color: palette.secondaryColor,
    fontSize: 20,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});
