export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    id: number;
    email: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpData {
  id: number;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}
