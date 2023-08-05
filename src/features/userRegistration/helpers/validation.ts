import { array, bool, date, object, string } from 'yup';
import { IUserPersonalInfo, IUserWorkAndEducation } from '../db/types';

export const userPersonalInfoSchema = object<IUserPersonalInfo>().shape({
  avatarUrl: string().required('Please take a photo of yourself'),
  fullName: string().required('Please enter your full name'),
  phone: string() /* .min(10) */
    .required('Please enter your phone number'),
  state: string().required('Please enter your state'),
  country: string().required('Please select a country'),
  idNo: string().required('Please enter your ID number'),
  birthDate: date().required('Please select your birth date'),
  KVKKApproval: bool().required('Please accept the terms and conditions'),
  gender: string().required('Please select a gender'),
});

export const userWorkAndEducationValidationSchema = object<IUserWorkAndEducation>().shape({
  employmentStatus: string().required('Employment status is required '),
  professionTitle: string().required('Profession title is required '),
  educationLevel: string().required('Education level is required '),
  schoolName: string().required('School name is required '),
  studyDepartment: string().required('Study department is required '),
  graduationDate: date().required('Please select your graduation date'),
  skills: array(),
});
