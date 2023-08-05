import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../../constants/Layout';
import { useUserContext } from '../../../navigation/Routes';
import { IUserProject } from '../../userRegistration/db/types';

const ProjectsDashScreen = () => {
  const { userResumeAndProjects } = useUserContext();

  const renderItem = useCallback(({ item }: { item: IUserProject }) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={{ fontSize: 14 }}>{item.des}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.textHeader}>Projects List</Text>

        <FlatList data={userResumeAndProjects?.projects} renderItem={renderItem} keyExtractor={item => item.title} />
      </View>
    </SafeAreaView>
  );
};

export default ProjectsDashScreen;

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'column',
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
    color: palette.mainColor,
    fontSize: 16,
  },
});
