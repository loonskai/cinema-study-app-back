export interface UserSignUpReqBody {
  id: number;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserSignUpResBody {
  id: number;
  email: string;
  username: string;
  role: string;
}
