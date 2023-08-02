type RequestError = {
  code: string;
  message: string;
};

const requestErrors: RequestError[] = [
  { code: 'phone-required', message: 'phone-required' },
  {
    code: 'user-phone-already-exists',
    message: '  Sorry, this phone number is already\n  associated with the Parlapp account please\n  log in or try a different number',
  },
  { code: 'code-required', message: 'code-required' },
  { code: 'code-incorrect', message: 'Seems like code is incorrect. Please, try again.' },
  { code: 'username-required', message: 'username-required' },
  { code: 'user-username-already-exists', message: 'This username already exists ' },
  { code: 'phone-format-incorrect', message: 'phone-format-incorrect' },
  {
    code: 'username-min-length',
    message: 'username-min-length',
  },
  { code: 'password-incorrect', message: 'Password is incorrect' },
  { code: 'user-does-not-exist', message: 'There is no account associated with this phone number. Please try again or Sign up.' },
];

export default requestErrors;
