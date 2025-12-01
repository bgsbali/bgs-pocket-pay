import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { walletService } from '@/services/walletService';
import { Wallet as WalletType, Transaction } from '@/types';
import { BottomNav } from '@/components/BottomNav';
import { TransactionItem } from '@/components/TransactionItem';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Wallet() {
  const { user, token } = useAuth();
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const { toast } = useToast();

  const loadData = async () => {
    if (!token) return;
    
    try {
      const [walletData, transactionsData] = await Promise.all([
        walletService.getBalance(token),
        walletService.getTransactions(token, 5),
      ]);
      setWallet(walletData);
      setTransactions(transactionsData);
    } catch (error) {
      toast({
        title: 'Failed to load data',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Balance */}
      <div className="bg-black/90 text-white p-6 rounded-b-[2rem] shadow-soft">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm">Hello,</p>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-white hover:bg-white/10"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Total Balance</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="h-8 w-8 text-white hover:bg-white/10"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-3xl font-bold">
              {showBalance
                ? `IDR ${wallet?.balance.toLocaleString('id-ID')},-`
                : '••• •••'}
            </p>
            <div className="flex gap-2 text-xs text-white/70 mt-3">
              <span>{user?.phone}</span>
              <span>•</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <a href="/transactions" className="text-sm text-primary font-medium hover:underline">
            View All
          </a>
        </div>

        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your wallet activity will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
