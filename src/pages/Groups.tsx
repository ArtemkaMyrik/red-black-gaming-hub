
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupsList from '../components/GroupsList';
import GroupDetail from '../components/GroupDetail';
import CreateGroupDialog from '../components/CreateGroupDialog';

const Groups = () => {
  const { id } = useParams<{ id: string }>();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  return (
    <div className="min-h-screen bg-gaming-dark text-gaming-text-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {id ? (
            <GroupDetail groupId={id} />
          ) : (
            <GroupsList onCreateGroup={() => setShowCreateDialog(true)} />
          )}
          
          <CreateGroupDialog 
            open={showCreateDialog} 
            onOpenChange={setShowCreateDialog} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Groups;
