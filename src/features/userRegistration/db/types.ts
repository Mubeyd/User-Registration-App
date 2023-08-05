import { DirectoryPickerResponse, DocumentPickerResponse } from 'react-native-document-picker';

export interface Contact {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  currencySymbol: string;
  currencyName: string;
  flag: string;
  weekend: number;
  holiDays: string[];
  penaltyPerDay: number;
}

export interface IUserPersonalInfo {
  avatarUrl: string | null;
  fullName: string;
  phone: string;
  state: string;
  country: string;
  idNo: string;
  birthDate: Date | null;
  KVKKApproval: boolean;
  gender: string;
}

export interface IUserWorkAndEducation {
  employmentStatus: string;
  professionTitle: string;
  educationLevel: string;
  schoolName: string;
  studyDepartment: string;
  graduationDate: Date | null;
  skills: IUserSkill[];
}

export interface IUserSkill {
  skillName: string;
  skillLevel: string;
}

export interface IUserResumeAndProjects {
  resume: Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null;
  projects: IUserProject[];
}

export interface IUserProject {
  title: string;
  des: string;
}
