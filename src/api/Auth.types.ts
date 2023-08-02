type Token = {
  accessToken: string;
  expiresAt: string;
};

type User = {
  isProfileFilled: boolean;
  username: string;
  id: number;
};

export type LogInResponse = {
  token: Token;
  user: User;
};

export type SignUpResponse = {
  token: Token;
  user: User;
};
