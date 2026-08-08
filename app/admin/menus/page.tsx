'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Edit, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';

const fetchMenus = async () => {
  const res = await axios.get('/api/admin/menus', {
    headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
  });
  return res.data;
};

function SortableItem({ menu, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-200 dark:border-gray-700">
      <button className="cursor-grab touch-none" {...attributes} {...listeners}><GripVertical className="h-5 w-5 text-gray-400" /></button>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{menu.menuId}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{menu.displayText.slice(0,60)}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/admin/menus/${menu.id}`}><Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button></Link>
        <Button size="sm" variant="destructive" onClick={() => onDelete(menu.id)}><Trash className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

export default function MenusPage() {
  const queryClient = useQueryClient();
  const { data: menus = [], isLoading } = useQuery({ queryKey: ['menus'], queryFn: fetchMenus });
  const [items, setItems] = useState(menus);
  useEffect(() => setItems(menus), [menus]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/admin/menus/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['menus'] }); toast.success('Deleted'); }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      await axios.put('/api/admin/menus/reorder', { orderedIds }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menus'] })
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i: any) => i.id === active.id);
      const newIndex = items.findIndex((i: any) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      reorderMutation.mutate(newItems.map((i: any) => i.id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🔀 Menu Builder</h2>
        <Link href="/admin/menus/new"><Button><Plus className="w-4 h-4 mr-2" /> Add Menu</Button></Link>
      </div>
      {isLoading ? <p>Loading...</p> : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
            {items.map((menu: any) => <SortableItem key={menu.id} menu={menu} onDelete={(id: string) => deleteMutation.mutate(id)} />)}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}