export type UserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    profilePic?: string;
    address?: string;
    occupation?: string;
    birthDate?: string;
    role: string;
  };
};

export type UpdateUserResponse = {
  updateUser: {
    id: string
    name: string
    email: string
    address?: string | null
    occupation?: string | null
    birthDate?: string | null
    profilePic?: string | null
  }
}
