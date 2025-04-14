
import { useQuery } from '@tanstack/react-query';
import { getProfile, Profile } from '@/services/profileService';

export const useProfileData = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await getProfile(userId);
      if (error) throw error;
      if (!data) throw new Error('Profile not found');
      return data;
    },
    retry: false,
  });
};
