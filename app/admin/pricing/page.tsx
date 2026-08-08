'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });

export default function PricingPage() {
  const queryClient = useQueryClient();
  const { data: pricings = [], isLoading } = useQuery({
    queryKey: ['pricings'],
    queryFn: async () => (await axios.get('/api/admin/pricing', authHeaders())).data
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ capacity:'', price:'', subsidyInfo:'' });

  const createMutation = useMutation({
    mutationFn: (data: any) => axios.post('/api/admin/pricing', data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Added'); setForm({ capacity:'', price:'', subsidyInfo:'' }); }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => axios.put(`/api/admin/pricing/${id}`, data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Updated'); setEditingId(null); }
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/admin/pricing/${id}`, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pricings'] }); toast.success('Deleted'); }
  });

  const startEdit = (item: any) => { setEditingId(item.id); setForm({ capacity:item.capacity, price:item.price.toString(), subsidyInfo:item.subsidyInfo || '' }); };
  const handleSave = () => {
    if (editingId) updateMutation.mutate({ id: editingId, data: { capacity:form.capacity, price:parseInt(form.price), subsidyInfo:form.subsidyInfo } });
    else createMutation.mutate({ capacity:form.capacity, price:parseInt(form.price), subsidyInfo:form.subsidyInfo });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">💰 Pricing Manager</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        <Input placeholder="Capacity (e.g. 1KW)" value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})} />
        <Input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <Input placeholder="Subsidy Info" value={form.subsidyInfo} onChange={e=>setForm({...form,subsidyInfo:e.target.value})} />
        <Button onClick={handleSave}>{editingId ? 'Update' : 'Add'}</Button>
        {editingId && <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>}
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Capacity</TableHead><TableHead>Price (₹)</TableHead><TableHead>Subsidy</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {pricings.map((item:any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.capacity}</TableCell>
              <TableCell>₹{item.price.toLocaleString()}</TableCell>
              <TableCell>{item.subsidyInfo}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}