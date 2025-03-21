
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FriendRequestsDialog from './FriendRequestsDialog';
import AddFriendDialog from './AddFriendDialog';

const SocialNavbar = () => {
  return (
    <div className="mt-6 mb-8 flex flex-wrap gap-3 justify-center md:justify-start">
      <Button asChild variant="outline" className="border-white/10">
        <Link to="/profile/123">Мой профиль</Link>
      </Button>
      <Button asChild variant="outline" className="border-white/10">
        <Link to="/groups">Группы</Link>
      </Button>
      <AddFriendDialog />
      <FriendRequestsDialog />
    </div>
  );
};

export default SocialNavbar;
