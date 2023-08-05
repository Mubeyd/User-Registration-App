import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import InputField from '../../../components/InputField';
import ItemsSelect from '../../../components/ItemsSelect';
import { palette } from '../../../constants/Layout';
import { IUserSkill, IUserWorkAndEducation } from '../db/types';
import { userWorkAndEducationValidationSchema } from '../helpers/validation';

const educationLevels = [
  { label: 'High School', value: 'High School' },
  { label: 'Associate Degree', value: 'Associate Degree' },
  { label: 'Bachelor Degree', value: 'Bachelor Degree' },
  { label: 'Master Degree', value: 'Master Degree' },
  { label: 'Doctorate Degree', value: 'Doctorate Degree' },
];

const skillLevels = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
];

export default function UserCareerAndEducation() {
  const { navigate, goBack } = useNavigation() as any;

  const [openEducationLevelSelect, setOpenEducationLevelSelect] = useState(false);

  const [isDatePickerVisibleBirth, setDatePickerVisibilityBirth] = useState(false);

  const formik = useFormik<IUserWorkAndEducation>({
    initialValues: {
      employmentStatus: 'Employed',
      professionTitle: '',
      educationLevel: '',
      schoolName: '',
      studyDepartment: '',
      graduationDate: null,
      skills: [],
    },
    validationSchema: userWorkAndEducationValidationSchema,
    async onSubmit(values) {
      try {
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('userWorkAndEducation', jsonValue);
      } catch (e) {
        // saving error
      }

      navigate('ResumeAndProjects');
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const [skills, setSkills] = useState<IUserSkill[]>(formik.values.skills);

  const addSkill = useCallback(() => {
    const newSkill: IUserSkill = { skillName: '', skillLevel: '1' };
    setSkills([...skills, newSkill]);
  }, [skills]);

  const removeSkill = useCallback(
    (index: number) => {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    },
    [skills],
  );

  const handleSkillChange = useCallback(
    (value: any, field: 'skillLevel' | 'skillName', index: number) => {
      if (field === 'skillLevel') {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value.value;
        setSkills(updatedSkills);
      }

      if (field === 'skillName') {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
      }
    },
    [skills],
  );

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  const setOpenEducationLevelSelectCb = useCallback(() => {
    setOpenEducationLevelSelect(!openEducationLevelSelect);
  }, [openEducationLevelSelect]);

  const showDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(true);
  }, []);

  const hideDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(false);
  }, []);

  const handleConfirmBirth = useCallback(
    (date: any) => {
      formik.setFieldValue('graduationDate', date);
      hideDatePickerBirth();
    },
    [formik, hideDatePickerBirth],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IUserSkill; index: number }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginVertical: 4 }}>
        <TextInput
          placeholder="Skill Title"
          onChangeText={text => handleSkillChange(text, 'skillName', index)}
          style={{
            paddingVertical: 0,
            backgroundColor: '#f5f8fa',
            minHeight: 40,
            borderRadius: 5,
            marginHorizontal: 8,
            width: '50%',
            color: '#000',
          }}
          value={item.skillName}
          placeholderTextColor={'#bbb'}
        />

        <View style={{ width: 120 }}>
          <ItemsSelect
            selectedOptions={{ text: item.skillLevel, value: item.skillLevel }}
            data={skillLevels}
            uniqKey="value"
            onSelect={value => handleSkillChange(value, 'skillLevel', index)}
            nameField="text"
            controllerStyle={{
              width: 40,
            }}
          />
        </View>

        <TouchableOpacity onPress={() => removeSkill(index)}>
          <AntDesign name="delete" size={20} color="red" style={{ marginLeft: 5, marginHorizontal: 8 }} />
        </TouchableOpacity>
      </View>
    ),
    [handleSkillChange, removeSkill],
  );

  const keyExtractor = useCallback((item: IUserSkill, index: number) => index.toString(), []);

  const onSubmit = useCallback(() => {
    formik.setFieldValue('skills', skills);
    handleSubmit();
  }, [formik, handleSubmit, skills]);

  const onConfirm = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Work & Education</Text>

        <Text
          style={{
            marginRight: 14,
          }}>
          Employment status:
        </Text>
        <View style={styles.employmentStatusView}>
          <RadioButton
            value="Student"
            status={formik.values.employmentStatus === 'Student' ? 'checked' : 'unchecked'}
            onPress={() => formik.setFieldValue('employmentStatus', 'Student')}
            color="#50cd89"
          />

          <Text
            style={{
              marginRight: 14,
            }}>
            Student
          </Text>
          <RadioButton
            value="Employed"
            status={formik.values.employmentStatus === 'Employed' ? 'checked' : 'unchecked'}
            onPress={() => formik.setFieldValue('employmentStatus', 'Employed')}
            color="#50cd89"
          />

          <Text
            style={{
              marginRight: 14,
            }}>
            Employed
          </Text>

          <RadioButton
            value="Free"
            status={formik.values.employmentStatus === 'Free' ? 'checked' : 'unchecked'}
            onPress={() => formik.setFieldValue('employmentStatus', 'Free')}
            color="#50cd89"
          />
          <Text style={{ marginRight: 14 }}>Free</Text>
        </View>

        <InputField
          label={'Profession Title'}
          icon={<MaterialIcons name="work-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          onChangeText={formik.handleChange('professionTitle')}
          value={formik.values.professionTitle}
        />

        <View style={{ marginVertical: 4 }}>
          <Text style={styles.textDes}>Education Level</Text>
          <DropDownPicker
            open={openEducationLevelSelect}
            value={formik.values.educationLevel}
            items={educationLevels}
            setOpen={setOpenEducationLevelSelectCb}
            setValue={value => {
              formik.setFieldValue('educationLevel', value());
            }}
            ActivityIndicatorComponent={ActivityIndicatorElement}
            searchable={true}
            searchPlaceholder="Search..."
          />
          {touched.educationLevel && errors.educationLevel ? (
            <Text style={styles.errorText}>{JSON.stringify(errors.educationLevel)}</Text>
          ) : null}
        </View>

        <Text style={styles.titleText}>School Info</Text>

        <View style={styles.schoolInfoView}>
          <View style={{ flexDirection: 'column', minWidth: '40%' }}>
            <Text style={styles.desText}>School Name</Text>
            <TextInput
              placeholder="School Name"
              onChangeText={formik.handleChange('schoolName')}
              style={styles.textInputStyle}
              value={formik.values.schoolName}
            />
            {touched.schoolName && errors.schoolName ? (
              <Text style={styles.errorText}>{JSON.stringify(errors.schoolName)}</Text>
            ) : null}
          </View>

          <View style={{ flexDirection: 'column', minWidth: '40%' }}>
            <Text style={styles.desText}>Study Department</Text>
            <TextInput
              placeholder="Study Department"
              onChangeText={formik.handleChange('studyDepartment')}
              style={styles.textInputStyle}
              value={formik.values.studyDepartment}
            />
            {touched.studyDepartment && errors.studyDepartment ? (
              <Text style={styles.errorText}>{JSON.stringify(errors.studyDepartment)}</Text>
            ) : null}
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity onPress={showDatePickerBirth} style={styles.dateTouchableOpacity}>
            <AntDesign name="calendar" size={20} color="#666" style={{ marginRight: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {formik.values.graduationDate ? (
                <Text style={styles.textDes}>{moment(formik.values.graduationDate).format('DD / MM / yyyy')}</Text>
              ) : (
                <Text style={styles.textPlaceHolder}>asasas</Text>
              )}
              <Text style={styles.graduationDateText}>Graduation Date</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisibleBirth}
            mode="date"
            onConfirm={handleConfirmBirth}
            onCancel={hideDatePickerBirth}
            date={formik.values.graduationDate ?? new Date()}
            maximumDate={new Date()}
          />
          {touched.graduationDate && errors.graduationDate ? (
            <Text style={styles.errorText}>{errors.graduationDate.toString()}</Text>
          ) : null}
        </View>

        <View>
          <Text style={styles.titleText}>Skills</Text>

          <FlatList data={skills} keyExtractor={keyExtractor} renderItem={renderItem} />

          <TouchableOpacity onPress={addSkill} style={styles.addButton}>
            <AntDesign name="plus" size={20} color="white" style={{}} />
            <Text style={styles.addButtonLabel}>Add Skill</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
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
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },

  dateTouchableOpacity: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 8,
  },
  desText: {
    color: '#3f3f3f',
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  employmentStatusView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  graduationDateText: {
    color: '#3f3f3f',
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 2,
    marginLeft: 20,
  },
  headerText: {
    alignSelf: 'center',
    borderBottomColor: '#50cd89',
    borderBottomWidth: 2,
    color: '#50cd89',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    maxWidth: '70%',
    paddingBottom: 10,
    textAlign: 'center',
  },
  schoolInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  textDes: {
    paddingVertical: 0,
  },
  textInputStyle: {
    backgroundColor: '#f5f8fa',
    borderRadius: 5,
    color: '#000',
    minHeight: 40,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  textPlaceHolder: {
    color: '#ccc',
    flex: 1,
    paddingVertical: 0,
  },
  titleText: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
});
