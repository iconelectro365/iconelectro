'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

const fetchStats = async () => {
  const res = await axios.get('/api/admin/stats', {
    headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
  });
  return res.data;
};

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ['stats'], queryFn: fetchStats, refetchInterval: 10000 });
  const stats = data || { totalUsers:0, todayLeads:0, activeConversations:0 };
  const items = [
    { title:'Total Users', value:stats.totalUsers, icon:'👥', gradient:'from-blue-500 to-cyan-500' },
    { title:"Today's Leads", value:stats.todayLeads, icon:'📈', gradient:'from-green-500 to-emerald-500' },
    { title:'Active Chats', value:stats.activeConversations, icon:'💬', gradient:'from-purple-500 to-pink-500' },
  ];
  return (
    <div>
      <motion.h2 initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="text-3xl font-bold mb-8">📊 Dashboard</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}>
            <Card className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.gradient}`} />
              <CardHeader><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{item.value}</div>
                <span className="text-6xl absolute right-4 bottom-2 opacity-10 dark:opacity-20">{item.icon}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}