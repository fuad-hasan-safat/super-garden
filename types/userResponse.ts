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
    address?: string
    occupation?: string
    birthDate?: string | null
    role: string
    profilePic: string | null
  }
}
