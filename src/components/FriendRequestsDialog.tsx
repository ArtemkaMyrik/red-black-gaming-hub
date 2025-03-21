
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, X, BellRing } from 'lucide-react';
import { toast } from 'sonner';

// Типы и интерфейсы
interface FriendRequest {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  date: string;
  type: 'incoming' | 'outgoing';
}

// Моковые данные
const mockFriendRequests: FriendRequest[] = [
  { 
    id: '1', 
    userId: '101', 
    username: 'RPGMaster', 
    avatar: 'https://i.pravatar.cc/150?img=11', 
    date: '10.11.2023', 
    type: 'incoming' 
  },
  { 
    id: '2', 
    userId: '102', 
    username: 'FPSLegend', 
    date: '09.11.2023', 
    type: 'incoming' 
  },
  { 
    id: '3', 
    userId: '103', 
    username: 'StrategyKing', 
    avatar: 'https://i.pravatar.cc/150?img=13', 
    date: '08.11.2023', 
    type: 'outgoing' 
  }
];

const FriendRequestsDialog = () => {
  const [requests, setRequests] = useState<FriendRequest[]>(mockFriendRequests);
  const [activeTab, setActiveTab] = useState("incoming");
  
  const incomingRequests = requests.filter(req => req.type === 'incoming');
  const outgoingRequests = requests.filter(req => req.type === 'outgoing');
  
  const handleAcceptRequest = (requestId: string) => {
    // В реальном приложении здесь был бы API-запрос
    setRequests(requests.filter(req => req.id !== requestId));
    toast.success('Заявка в друзья принята');
  };
  
  const handleRejectRequest = (requestId: string) => {
    setRequests(requests.filter(req => req.id !== requestId));
    toast.info('Заявка в друзья отклонена');
  };
  
  const handleCancelRequest = (requestId: string) => {
    setRequests(requests.filter(req => req.id !== requestId));
    toast.info('Заявка в друзья отменена');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <BellRing size={20} />
          {incomingRequests.length > 0 && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-gaming-red rounded-full" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gaming-card-bg border-white/10 text-gaming-text-primary">
        <DialogHeader>
          <DialogTitle>Заявки в друзья</DialogTitle>
          <DialogDescription className="text-gaming-text-secondary">
            Управляйте входящими и исходящими заявками в друзья
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="incoming" className="relative">
              Входящие
              {incomingRequests.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gaming-red">
                  {incomingRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              Исходящие
              {outgoingRequests.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gaming-dark-accent">
                  {outgoingRequests.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="incoming" className="mt-0">
            {incomingRequests.length > 0 ? (
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {incomingRequests.map(request => (
                  <div 
                    key={request.id}
                    className="bg-gaming-dark rounded-md p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        {request.avatar ? (
                          <AvatarImage src={request.avatar} alt={request.username} />
                        ) : (
                          <AvatarFallback className="bg-gaming-dark-accent">
                            {request.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{request.username}</h3>
                        <p className="text-xs text-gaming-text-secondary">
                          Отправлена: {request.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-gaming-red hover:bg-gaming-red-hover h-8 w-8 p-0"
                      >
                        <Check size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRejectRequest(request.id)}
                        className="border-white/10 h-8 w-8 p-0"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gaming-dark rounded-md">
                <p className="text-gaming-text-secondary">У вас нет входящих заявок в друзья</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="outgoing" className="mt-0">
            {outgoingRequests.length > 0 ? (
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {outgoingRequests.map(request => (
                  <div 
                    key={request.id}
                    className="bg-gaming-dark rounded-md p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        {request.avatar ? (
                          <AvatarImage src={request.avatar} alt={request.username} />
                        ) : (
                          <AvatarFallback className="bg-gaming-dark-accent">
                            {request.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{request.username}</h3>
                        <p className="text-xs text-gaming-text-secondary">
                          Отправлена: {request.date}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCancelRequest(request.id)}
                      className="border-white/10"
                    >
                      Отменить
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gaming-dark rounded-md">
                <p className="text-gaming-text-secondary">У вас нет исходящих заявок в друзья</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestsDialog;
