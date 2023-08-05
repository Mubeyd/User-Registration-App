import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import { PaperProvider } from 'react-native-paper';
import { palette } from '../../../constants/Layout';
import { IUserProject } from '../db/types';

export default function ResumeAndProjects() {
  const { navigate, goBack } = useNavigation() as any;

  const [result, setResult] = useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null>();

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
  };

  const [projects, setProjects] = useState<IUserProject[]>([]);

  const addProject = useCallback(() => {
    const newProject: IUserProject = { title: '', des: '' };
    setProjects([...projects, newProject]);
  }, [projects]);

  const removeSkill = useCallback(
    (index: number) => {
      const updatedSkills = [...projects];
      updatedSkills.splice(index, 1);
      setProjects(updatedSkills);
    },
    [projects],
  );

  const handleProjectChange = useCallback(
    (value: any, field: 'title' | 'des', index: number) => {
      const updatedSkills = [...projects];
      updatedSkills[index][field] = value;
      setProjects(updatedSkills);
    },
    [projects],
  );

  const onGetCVPdf = useCallback(() => {
    DocumentPicker.pick({
      type: types.pdf,
    })
      .then(setResult)
      .catch(handleError);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IUserProject; index: number }) => (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
          marginVertical: 4,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <TextInput
          placeholder="Project Title"
          onChangeText={text => handleProjectChange(text, 'title', index)}
          style={styles.renderItemTextTitle}
          value={item.title}
          placeholderTextColor={'#bbb'}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginVertical: 4 }}>
          <TextInput
            placeholder="Project Description"
            onChangeText={text => handleProjectChange(text, 'des', index)}
            style={styles.renderItemTextDes}
            value={item.des}
            placeholderTextColor={'#bbb'}
          />

          <TouchableOpacity onPress={() => removeSkill(index)}>
            <AntDesign name="delete" size={20} color="red" style={{ marginLeft: 5, marginHorizontal: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [handleProjectChange, removeSkill],
  );

  const keyExtractor = useCallback((item: IUserProject, index: number) => index.toString(), []);

  const onConfirm = useCallback(async () => {
    await AsyncStorage.setItem(
      'userResumeAndProjects',
      JSON.stringify({
        resume: result,
        projects,
      }),
    );

    navigate('LoginScreen');
  }, [navigate, projects, result]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={styles.containerScrollView}>
          <Text style={styles.headerText}>Resume and Projects</Text>

          <Text style={styles.titleText}>Upload you CV:</Text>

          <View style={styles.containerPdf}>
            <Text selectable>Result: {result && result[0]?.name}</Text>
            <Button title="pick your CV as pdf" onPress={onGetCVPdf} />
          </View>

          <View>
            <Text style={styles.titleText}>Projects</Text>

            <FlatList data={projects} keyExtractor={keyExtractor} renderItem={renderItem} />

            <TouchableOpacity onPress={addProject} style={styles.addButton}>
              <AntDesign name="plus" size={20} color="white" style={{}} />
              <Text style={styles.addButtonLabel}>Add Project</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.button, { backgroundColor: palette.mainColor }]}
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onConfirm} style={styles.button} activeOpacity={0.5}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    width: 120,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerPdf: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  containerScrollView: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  headerText: {
    alignSelf: 'center',
    borderBottomColor: palette.secondaryColor,
    borderBottomWidth: 2,
    color: palette.secondaryColor,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    maxWidth: '70%',
    paddingBottom: 10,
    textAlign: 'center',
  },
  renderItemTextDes: {
    backgroundColor: '#f5f8fa',
    borderRadius: 5,
    color: '#000',
    marginHorizontal: 8,
    minHeight: 40,
    paddingVertical: 0,
    width: '80%',
  },
  renderItemTextTitle: {
    backgroundColor: '#f5f8fa',
    borderRadius: 5,
    color: '#000',
    marginHorizontal: 8,
    minHeight: 40,
    paddingVertical: 0,
    width: '60%',
  },
  titleText: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
});
