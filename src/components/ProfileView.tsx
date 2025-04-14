
import { useProfileData } from "@/hooks/useProfileData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

interface ProfileViewProps {
  userId: string;
}

export const ProfileView = ({ userId }: ProfileViewProps) => {
  const { data: profile, isLoading, error } = useProfileData(userId);

  if (isLoading) {
    return <LoadingSpinner className="my-8" />;
  }

  if (error) {
    return <ErrorMessage message="Ошибка при загрузке профиля" />;
  }

  if (!profile) {
    return <ErrorMessage message="Профиль не найден" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{profile.username}</h2>
      {profile.avatar && (
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-24 h-24 rounded-full"
        />
      )}
      <div className="flex gap-2">
        {profile.is_admin && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
            Администратор
          </span>
        )}
        {profile.is_moderator && (
          <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
            Модератор
          </span>
        )}
      </div>
    </div>
  );
};
