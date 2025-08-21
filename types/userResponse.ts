type UserResponse = {
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
