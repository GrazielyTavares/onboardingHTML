import { createContext } from 'react';
import { UserContextType } from '../types';

export const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    role: '',
    department: '',
    progress: 0,
    joinDate: '',
    avatar: ''
  }
});