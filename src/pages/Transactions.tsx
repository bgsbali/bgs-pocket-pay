import { useState, useEffect } from 'react';
import { walletService } from '@/services/walletService';
import { Transaction } from '@/types';
import { BottomNav } from '@/components/BottomNav';
import { TransactionItem } from '@/components/TransactionItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'topup' | 'payment'>('all');
  const { toast } = useToast();

  const loadTransactions = async () => {
    try {
      const data = await walletService.getTransactions();
      setTransactions(data);
    } catch (error) {
      toast({ title: 'Failed to load transactions', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => { loadTransactions(); }, []);

  const filteredTransactions = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        <div className="bg-card border-b border-border p-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <Button variant="ghost" size="icon" onClick={() => { setIsRefreshing(true); loadTransactions(); }} disabled={isRefreshing}>
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <div className="px-6 py-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="topup">Top Ups</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="px-6 pb-6">
          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">{filteredTransactions.map((t) => <TransactionItem key={t.id} transaction={t} />)}</div>
          ) : (
            <div className="text-center py-16"><p className="text-muted-foreground font-medium">No transactions found</p></div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
