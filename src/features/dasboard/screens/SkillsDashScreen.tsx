import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../../constants/Layout';
import { IUserSkill } from '../../../features/userRegistration/db/types';
import { useUserContext } from '../../../navigation/Routes';

const SkillsDashScreen = () => {
  const { userWorkAndEducation } = useUserContext();

  const renderItem = useCallback(({ item }: { item: IUserSkill }) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.textTitle}>{item.skillName}</Text>
        <Text style={{ fontSize: 14 }}>{item.skillLevel}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.textHeader}>Skills List</Text>

        <FlatList data={userWorkAndEducation?.skills} renderItem={renderItem} keyExtractor={item => item.skillName} />
      </View>
    </SafeAreaView>
  );
};

export default SkillsDashScreen;

const styles = StyleSheet.create({
  itemView: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    minHeight: 50,
    padding: 10,
  },
  textHeader: {
    color: palette.secondaryColor,
    fontSize: 20,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 16,
  },
});
