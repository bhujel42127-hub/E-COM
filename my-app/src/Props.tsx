export type FieldType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginFieldType = {
  email: string;
  password: string;
};
export type User = {
  _id?: string;
  email: string;
  password: string;
  newPassword?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
