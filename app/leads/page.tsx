'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => (await axios.get('/api/admin/leads', authHeaders())).data
  });
  const updateLead = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => axios.put(`/api/admin/leads/${id}`, { status }, authHeaders()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['leads'] }); toast.success('Updated'); }
  });

  const getBadgeVariant = (status: string) => {
    if (status === 'new') return 'default';
    if (status === 'contacted') return 'warning';
    if (status === 'converted') return 'success';
    return 'secondary';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📋 Leads</h2>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Address</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {leads.map((lead: any) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.address}</TableCell>
              <TableCell>{lead.leadType}</TableCell>
              <TableCell><Badge variant={getBadgeVariant(lead.status)}>{lead.status}</Badge></TableCell>
              <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {lead.status !== 'converted' && (
                  <Button size="sm" onClick={() => updateLead.mutate({ id: lead.id, status: 'converted' })}>Mark Converted</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}