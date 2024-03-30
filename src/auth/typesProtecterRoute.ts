export type UserInfo = {
  id: number;
  nombre: string;
  correo: string;
  level: string;
  delete: boolean;
};

export type AuthResponse = {
  pass: boolean;
  message: string;
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
};
