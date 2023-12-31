import { User } from '@/types/models/User';

import { create } from 'zustand'

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))