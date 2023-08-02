type TokenType = {
  accessToken: string | null;
  expiresAt: string | null;
  isProfileFilled: boolean;
  username: string | null | any;
};

export type State = TokenType;
