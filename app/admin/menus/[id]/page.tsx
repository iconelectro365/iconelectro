'use client';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-hot-toast';
import { Trash, Plus } from 'lucide-react';
import { useEffect } from 'react';

interface MenuFormData {
  menuId: string; parentMenuId: string; triggerText: string; isMain: boolean;
  displayText: string; buttons: { value: string }[]; nextAction: string;
  dynamicCalcEnabled: boolean; dynamicCalcFormula: string; order: number;
}

const fetchMenu = async (id: string) => {
  if (id === 'new') return null;
  const res = await axios.get(`/api/admin/menus/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
  });
  return res.data;
};

export default function MenuFormPage() {
  const params = useParams(); const id = params.id as string;
  const router = useRouter(); const queryClient = useQueryClient();
  const isNew = id === 'new';

  const { data: menu, isLoading } = useQuery({ queryKey: ['menu', id], queryFn: () => fetchMenu(id), enabled: !isNew });

  const { register, control, handleSubmit, setValue, watch, reset } = useForm<MenuFormData>({
    defaultValues: { menuId:'', parentMenuId:'', triggerText:'', isMain:false, displayText:'', buttons:[{value:''}], nextAction:'show_menu', dynamicCalcEnabled:false, dynamicCalcFormula:'bill * 0.8', order:0 }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'buttons' });

  useEffect(() => {
    if (menu) {
      reset({
        menuId: menu.menuId, parentMenuId: menu.parentMenuId || '', triggerText: menu.triggerText || '',
        isMain: menu.isMain, displayText: menu.displayText,
        buttons: menu.buttons.map((b: string) => ({ value: b })),
        nextAction: menu.nextAction,
        dynamicCalcEnabled: menu.dynamicCalcEnabled || false,
        dynamicCalcFormula: menu.dynamicCalcFormula || '',
        order: menu.order
      });
    }
  }, [menu, reset]);

  const mutation = useMutation({
    mutationFn: (data: MenuFormData) => {
      const payload = {
        ...data,
        buttons: data.buttons.map(b => b.value).filter(Boolean),
      };
      const token = localStorage.getItem('admin_token');
      if (isNew) return axios.post('/api/admin/menus', payload, { headers: { Authorization: `Bearer ${token}` } });
      return axios.put(`/api/admin/menus/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast.success(isNew ? 'Menu created' : 'Menu updated');
      router.push('/admin/menus');
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Error saving'),
  });

  const onSubmit = (data: MenuFormData) => mutation.mutate(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{isNew ? 'Create Menu' : 'Edit Menu'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Menu ID (unique)</Label><Input {...register('menuId',{required:true})} placeholder="main, pricing" /></div>
          <div><Label>Parent Menu ID</Label><Input {...register('parentMenuId')} placeholder="Leave empty for main" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Trigger Text</Label><Input {...register('triggerText')} placeholder="1, Back" /></div>
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox id="isMain" checked={watch('isMain')} onCheckedChange={(v) => setValue('isMain', !!v)} />
            <Label htmlFor="isMain">Is Main Menu?</Label>
          </div>
        </div>
        <div><Label>Display Text</Label><Textarea {...register('displayText',{required:true})} rows={6} /></div>
        <div>
          <Label>Buttons</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input {...register(`buttons.${index}.value`)} placeholder="Button label" />
              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })}><Plus className="w-4 h-4 mr-1" /> Add Button</Button>
        </div>
        <div>
          <Label>Next Action</Label>
          <Select onValueChange={(v) => setValue('nextAction', v)} defaultValue={watch('nextAction')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="show_menu">Show Menu</SelectItem>
              <SelectItem value="await_input">Await Input</SelectItem>
              <SelectItem value="collect_bill">Collect Bill</SelectItem>
              <SelectItem value="save_lead_step1">Save Lead Step1</SelectItem>
              <SelectItem value="save_lead_step2">Save Lead Step2</SelectItem>
              <SelectItem value="save_lead_step3">Save Lead Step3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox id="calc" checked={watch('dynamicCalcEnabled')} onCheckedChange={(v) => setValue('dynamicCalcEnabled', !!v)} />
            <Label htmlFor="calc">Enable Calculation</Label>
          </div>
          {watch('dynamicCalcEnabled') && (
            <div className="mt-2"><Label>Formula</Label><Input {...register('dynamicCalcFormula')} placeholder="bill * 0.8" /></div>
          )}
        </div>
        <div><Label>Order</Label><Input type="number" {...register('order',{valueAsNumber:true})} /></div>
        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>{mutation.isPending?'Saving...':'Save'}</Button>
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}