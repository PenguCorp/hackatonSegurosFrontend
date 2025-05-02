export type User = {
  id?: string;
  nombre?: string;
  email: string;
  token?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type UserCharacterizationForm = {
  fullName: string;
  age: number;
  gender: string;
  occupation: string;
  education: string;
  interests: string[];
  favoriteColor: string;
  bio: string;
};