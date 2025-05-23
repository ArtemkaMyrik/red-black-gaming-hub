
import FriendRequestsDialog from './FriendRequestsDialog';
import AddFriendDialog from './AddFriendDialog';

const SocialNavbar = () => {
  return (
    <div className="mt-6 mb-8 flex flex-wrap gap-3 justify-center md:justify-start">
      <AddFriendDialog />
      <FriendRequestsDialog />
    </div>
  );
};

export default SocialNavbar;
