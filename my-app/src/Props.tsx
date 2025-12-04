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

export type PublicRouteProp = {
  children: React.ReactNode;
};

export type Value = {
  isModalOpen: boolean;
  isLoading: boolean;
  isEdit: boolean;
  total: number;
};

export type Admin = {
  _id: string;
  email: string;
  password: string;
  newPassword: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
