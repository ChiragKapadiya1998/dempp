import * as yup from 'yup';
import remoteConfig from '@react-native-firebase/remote-config';

import { checkNoWhitespaces } from './functions';
import { MAX_LENGTH_TEXT_INPUT } from './constants';

/** Reset password schema */
export const passwordResetSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters long')
    .max(MAX_LENGTH_TEXT_INPUT, '')
    .matches(/[A-Z]/, 'Password should contain numbers and uppercase letters')
    .matches(/[\d]/, 'Password should contain numbers and uppercase letters')
    .test('no-whitespaces', 'Password should not contain whitespaces', checkNoWhitespaces),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password mush match')
    .required('Password confirmation is required'),
});

/** Log in schema */
export const logInSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
});

/** Sig up schema */
export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username is required')
    .min(6, 'Username should be at least 6 characters long')
    .max(MAX_LENGTH_TEXT_INPUT, '')
    .test('no-whitespaces', 'Username should not contain whitespaces', checkNoWhitespaces),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters long')
    .max(MAX_LENGTH_TEXT_INPUT, '')
    .matches(/[A-Z]/, 'Password should contain numbers and uppercase letters')
    .matches(/[\d]/, 'Password should contain numbers and uppercase letters')
    .test('no-whitespaces', 'Password should not contain whitespaces', checkNoWhitespaces),
});

/** Set up profile schema */
export const setUpProfileSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username is required')
    .min(6, 'Username should be at least 6 characters long')
    .max(MAX_LENGTH_TEXT_INPUT, '')
    .test('no-whitespaces', 'Username should not contain whitespaces', checkNoWhitespaces),
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
    .min(3, 'Full name should be at least 3 characters long')
    .max(MAX_LENGTH_TEXT_INPUT, ''),
  tagline: yup
    .string()
    .trim()
    .required('Tagline is required')
    .min(3, 'Tagline should be at least 3 characters long')
    .max(remoteConfig().getValue('taglineLength').asNumber(), ''),
});

/** Update tagline */
export const updateTaglineSchema = yup.object().shape({
  tagline: yup
    .string()
    .trim()
    .required('Tagline is required')
    .min(3, 'Tagline should be at least 3 characters long')
    .max(remoteConfig().getValue('taglineLength').asNumber(), ''),
});
