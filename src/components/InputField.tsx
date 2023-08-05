import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { palette } from '../constants/Layout';

interface Props {
  label: any;
  icon: any;
  inputType?: 'password';
  keyboardType?: '' | any;
  fieldButtonLabel?: '';
  fieldButtonFunction?: () => void;
  onChangeText?: (text: string) => void;
  value: any;
}

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: '#000' }}
          secureTextEntry={true}
          onChangeText={onChangeText}
          value={value}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: '#000' }}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={'#aaa'}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: palette.secondaryColor, fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
