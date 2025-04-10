
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Edit, Trash, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Моковые данные для категорий
const mockCategories = [
  { id: 1, name: 'RPG', description: 'Ролевые игры' },
  { id: 2, name: 'FPS', description: 'Шутеры от первого лица' },
  { id: 3, name: 'Стратегии', description: 'Стратегические игры' },
  { id: 4, name: 'Симуляторы', description: 'Игры-симуляторы' },
  { id: 5, name: 'Платформеры', description: 'Платформенные игры' },
];

interface Category {
  id: number;
  name: string;
  description: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<{name: string, description: string}>({
    name: '',
    description: ''
  });
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteCategory = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Категория удалена');
    }
  };
  
  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { ...newCategory, id: newId }]);
    setIsAddCategoryDialogOpen(false);
    toast.success('Категория добавлена');
  };

  const startEditingCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditFormData({
      name: category.name,
      description: category.description
    });
  };

  const updateCategory = () => {
    if (editingCategoryId === null) return;
    
    setCategories(categories.map(category => 
      category.id === editingCategoryId 
        ? { ...category, name: editFormData.name, description: editFormData.description } 
        : category
    ));
    setEditingCategoryId(null);
    toast.success('Категория обновлена');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-gaming-card-bg border border-white/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Управление категориями</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gaming-text-secondary" size={18} />
            <Input
              placeholder="Поиск категорий..."
              className="pl-8 bg-gaming-dark border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
            <Button className="bg-gaming-red hover:bg-gaming-red/90" onClick={() => setIsAddCategoryDialogOpen(true)}>
              <PlusCircle size={16} className="mr-2" />
              Добавить категорию
            </Button>
            <DialogContent className="bg-gaming-card-bg border-white/10">
              <DialogHeader>
                <DialogTitle>Добавить новую категорию</DialogTitle>
              </DialogHeader>
              <AddCategoryForm onSubmit={addCategory} onCancel={() => setIsAddCategoryDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border border-white/10 overflow-hidden">
        <Table className="min-w-full bg-gaming-dark">
          <TableHeader>
            <TableRow className="bg-gaming-dark-accent hover:bg-gaming-dark-accent">
              <TableHead>Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-gaming-dark-accent">
                  {editingCategoryId === category.id ? (
                    <>
                      <TableCell>
                        <Input
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="bg-gaming-dark border-white/10"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          name="description"
                          value={editFormData.description}
                          onChange={handleInputChange}
                          className="bg-gaming-dark border-white/10"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={updateCategory}
                            className="bg-gaming-red hover:bg-gaming-red/90"
                          >
                            Сохранить
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCategoryId(null)}
                            className="border-white/10"
                          >
                            Отмена
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditingCategory(category)}
                            className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-white"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteCategory(category.id)}
                            className="h-8 w-8 p-0 text-gaming-text-secondary hover:text-red-500"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

interface AddCategoryFormProps {
  onSubmit: (category: Omit<Category, 'id'>) => void;
  onCancel: () => void;
}

const AddCategoryForm = ({ onSubmit, onCancel }: AddCategoryFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Название категории
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gaming-dark border-white/10"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Описание
        </label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gaming-dark border-white/10"
          required
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-white/10"
        >
          Отмена
        </Button>
        <Button type="submit" className="bg-gaming-red hover:bg-gaming-red/90">
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default AdminCategories;
