'use client'

import { useEffect } from 'react';

import { User } from '@/types/models/User';

import { useUserStore } from '@/stores/userStore';

export const SetUserStore = ({ user }: { user: User | null }) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return <></>;
}