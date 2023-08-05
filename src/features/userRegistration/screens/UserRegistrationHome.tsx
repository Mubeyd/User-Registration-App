import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFormik } from 'formik';
import moment from 'moment';
import InputField from '../../../components/InputField';
import { getCountriesFromApi, getStatesFromApi } from '../api/countryApi';
import { IUserPersonalInfo } from '../db/types';
import { userPersonalInfoSchema } from '../helpers/validation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider, Portal, RadioButton } from 'react-native-paper';
import KVKKDialog from '../../../components/KVKKDialog';
import { palette } from '../../../constants/Layout';

/* toggle includeExtra */
const includeExtra = true;

export default function UserRegistrationHome() {
  const { navigate } = useNavigation() as any;

  const [visible, setVisible] = useState(false);

  const showDialog = useCallback(() => {
    setVisible(true);
  }, []);

  const hideDialog = useCallback(() => {
    setVisible(false);
  }, []);

  const [openCountrySelect, setOpenCountrySelect] = useState(false);
  const [valueCountrySelect, setValueCountrySelect] = useState<string | null>(null);
  const [itemsCountries, setItemsCountries] = useState<{ label: string; value: string }[]>([]);

  const [openStateSelect, setOpenStateSelect] = useState(false);
  const [valueStateSelect, setValueStateSelect] = useState<string | null>(null);
  const [itemsStates, setItemsStates] = useState<{ label: string; value: string }[]>([]);

  const [isDatePickerVisibleBirth, setDatePickerVisibilityBirth] = useState(false);

  const formik = useFormik<IUserPersonalInfo>({
    initialValues: {
      avatarUrl: '',
      fullName: '',
      phone: '',
      state: '',
      country: '',
      idNo: '',
      birthDate: null,
      KVKKApproval: true,
      gender: 'Male',
    },
    validationSchema: userPersonalInfoSchema,
    async onSubmit(values) {
      try {
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('userPersonalInfo', jsonValue);
      } catch (e) {
        // saving error
      }

      setVisible(false);

      navigate('UserCareerAndEducation');
    },
  });

  const { handleSubmit, touched, errors, isValid } = formik;

  const {
    data: countries,
    isLoading: isLoadingCountries,
    error: errorCountries,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountriesFromApi(),
  });

  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useQuery({
    queryKey: ['states', formik.values.country],
    queryFn: () => {
      if (formik.values.country !== '') {
        return getStatesFromApi({ country: formik.values.country });
      }
      return Promise.resolve(null); // Return a resolved promise for empty country
    },
  });

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  const setOpenCountrySelectCb = useCallback(() => {
    setOpenCountrySelect(!openCountrySelect);
    setOpenStateSelect(false);
  }, [openCountrySelect]);

  const setOpenStateSelectCb = useCallback(() => {
    setOpenStateSelect(!openStateSelect);
    setOpenCountrySelect(false);
  }, [openStateSelect]);

  const onGetPhotoFromGallery = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
      },
      e => {
        formik.setFieldValue('avatarUrl', e?.assets?.[0]?.uri);
      },
    );
  }, [formik]);

  const showDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(true);
  }, []);

  const hideDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(false);
  }, []);

  const handleConfirmBirth = useCallback(
    (date: any) => {
      formik.setFieldValue('birthDate', date);
      hideDatePickerBirth();
    },
    [formik, hideDatePickerBirth],
  );

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const onConfirm = useCallback(() => {
    if (!isValid) {
      setVisible(false);
      return;
    }
    onSubmit();
  }, [isValid, onSubmit]);

  useEffect(() => {
    if (countries) {
      setItemsCountries(countries.map((item: any) => ({ label: item.name.common, value: item.name.common })));
    }
  }, [countries]);

  useEffect(() => {
    if (states?.data?.states) {
      setItemsStates(states?.data?.states?.map((item: any) => ({ label: item.name, value: item.state_code })));
    }
  }, [states]);

  useEffect(() => {
    if (valueCountrySelect) {
      const myCountry = itemsCountries?.find(x => x.value === valueCountrySelect);
      if (myCountry) {
        formik.handleChange('country')(myCountry.value);
        setValueStateSelect(null);
        setItemsStates([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, valueCountrySelect]);

  useEffect(() => {
    if (valueStateSelect) {
      const myState = itemsStates?.find(x => x.value === valueStateSelect);
      if (myState) {
        formik.handleChange('state')(myState.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, valueStateSelect]);

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Portal>
          <View style={styles.container}>
            <Text style={styles.headerText}>Personal Information</Text>
            <KVKKDialog hideDialog={hideDialog} showDialog={showDialog} onConfirm={onConfirm} visible={visible} />

            <Text style={styles.titleText}>Photograph</Text>

            <View
              style={{
                margin: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={onGetPhotoFromGallery}>
                <Image
                  source={
                    formik.values.avatarUrl
                      ? { uri: `file://${formik.values.avatarUrl}` }
                      : require('../../../assets/add.png')
                  }
                  style={styles.image}
                  resizeMethod="scale"
                  resizeMode="cover"
                />

                {errors.avatarUrl && touched.avatarUrl ? (
                  <Text style={styles.errorText}>{errors.avatarUrl.toString()}</Text>
                ) : null}
              </TouchableOpacity>
            </View>

            <InputField
              label={'Full Name'}
              icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
              onChangeText={formik.handleChange('fullName')}
              value={formik.values.fullName}
            />
            {touched.fullName && errors.fullName ? (
              <Text style={styles.errorText}>{JSON.stringify(errors.fullName)}</Text>
            ) : null}

            <View style={{ margin: 4, flexDirection: 'column' }}>
              <Text style={styles.textDes}>
                Country: {errorCountries ? 'error' : formik.values.country ?? 'not selected'}
              </Text>
              <DropDownPicker
                open={openCountrySelect}
                value={valueCountrySelect}
                items={itemsCountries}
                setOpen={setOpenCountrySelectCb}
                setValue={setValueCountrySelect}
                setItems={setItemsCountries}
                loading={isLoadingCountries}
                ActivityIndicatorComponent={ActivityIndicatorElement}
                searchable={true}
                searchPlaceholder="Search..."
              />
              {touched.country && errors.country ? (
                <Text style={styles.errorText}>{JSON.stringify(errors.country)}</Text>
              ) : null}
            </View>

            <View style={{ margin: 4, marginBottom: 12, flexDirection: 'column' }}>
              <Text style={styles.textDes}>State: {errorStates ? 'error' : formik.values.state ?? 'not selected'}</Text>
              <DropDownPicker
                open={openStateSelect}
                value={valueStateSelect}
                items={itemsStates}
                setOpen={setOpenStateSelectCb}
                setValue={setValueStateSelect}
                setItems={setItemsStates}
                loading={isLoadingStates}
                ActivityIndicatorComponent={ActivityIndicatorElement}
                searchable={true}
                searchPlaceholder="Search..."
                ListEmptyComponent={() => <Text style={styles.errorText}>Select a country first</Text>}
              />
              {touched.state && errors.state ? (
                <Text style={styles.errorText}>{JSON.stringify(errors.state)}</Text>
              ) : null}
            </View>

            <InputField
              label={'Id Number'}
              icon={<AntDesign name="idcard" size={20} color="#666" style={{ marginRight: 5 }} />}
              onChangeText={formik.handleChange('idNo')}
              value={formik.values.idNo}
              keyboardType="number-pad"
            />

            <InputField
              label={'Phone Number'}
              icon={<AntDesign name="phone" size={20} color="#666" style={{ marginRight: 5 }} />}
              onChangeText={formik.handleChange('phone')}
              value={formik.values.phone}
              keyboardType="number-pad"
            />

            <View>
              <TouchableOpacity
                onPress={showDatePickerBirth}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                  marginBottom: 25,
                }}>
                <AntDesign name="calendar" size={20} color="#666" style={{ marginRight: 5 }} />
                {formik.values.birthDate ? (
                  <Text style={styles.textDes}>{moment(formik.values.birthDate).format('DD / MM / yyyy')}</Text>
                ) : (
                  <Text style={styles.textPlaceHolder}>Birth Date</Text>
                )}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisibleBirth}
                mode="date"
                onConfirm={handleConfirmBirth}
                onCancel={hideDatePickerBirth}
                date={formik.values.birthDate ?? new Date()}
                maximumDate={new Date()}
              />
              {touched.birthDate && errors.birthDate ? (
                <Text style={styles.errorText}>{errors.birthDate.toString()}</Text>
              ) : null}
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginRight: 20,
                }}>
                Select Gender:
              </Text>
              <RadioButton
                value="Male"
                status={formik.values.gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => formik.setFieldValue('gender', 'Male')}
                // color="#50cd89"
              />

              <Text
                style={{
                  marginRight: 20,
                }}>
                Male
              </Text>

              <RadioButton
                value="Female"
                status={formik.values.gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => formik.setFieldValue('gender', 'Female')}
                // color="#50cd89"
              />
              <Text style={{ marginRight: 20 }}>Female</Text>
            </View>

            <TouchableOpacity onPress={showDialog} style={styles.button} activeOpacity={0.5}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View style={{ height: 30 }} />
          </View>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    bottom: 0,
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    position: 'absolute',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
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
  image: {
    borderColor: 'white',
    borderRadius: 12,
    borderWidth: 6,
    height: 140,
    padding: 4,
    width: 140,
  },
  textDes: {
    color: '#000',
    flex: 1,
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
