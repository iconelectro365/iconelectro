'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => (await axios.get('/api/admin/settings', authHeaders())).data
  });
  const [form, setForm] = useState<Record<string, any>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (settings) setForm(settings); }, [settings]);

  const mutation = useMutation({
    mutationFn: (data: any) => axios.put('/api/admin/settings', data, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['settings'] }); toast.success('Settings saved'); }
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/admin/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}`, 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, logo_url: res.data.url });
      toast.success('Logo uploaded');
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); mutation.mutate(form); };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">⚙️ Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <Label>Company Name</Label>
          <Input value={form?.company_name || ''} onChange={e => setForm({...form, company_name: e.target.value})} />
        </div>
        <div>
          <Label>Welcome Message</Label>
          <Input value={form?.welcome_message || ''} onChange={e => setForm({...form, welcome_message: e.target.value})} />
        </div>
        <div>
          <Label>Calculator Saving Percent</Label>
          <Input type="number" value={form?.calculator_saving_percent || 80} onChange={e => setForm({...form, calculator_saving_percent: e.target.value})} />
        </div>
        <div>
          <Label>Logo URL</Label>
          <div className="flex gap-2 items-center">
            <Input value={form?.logo_url || ''} onChange={e => setForm({...form, logo_url: e.target.value})} placeholder="/logo.svg" />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Upload</Button>
          </div>
          {form?.logo_url && <img src={form.logo_url} alt="Logo preview" className="mt-2 h-10 rounded" />}
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}