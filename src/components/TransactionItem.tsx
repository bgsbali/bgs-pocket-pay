import { Transaction } from '@/types';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isPositive = transaction.amount > 0;
  const Icon = transaction.type === 'topup' ? ArrowUpCircle : ArrowDownCircle;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return diffMins <= 1 ? '1 min ago' : `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-smooth">
      <div className={cn('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', isPositive ? 'bg-success/10' : 'bg-muted')}>
        <Icon className={cn('h-5 w-5', isPositive ? 'text-success' : 'text-foreground')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{transaction.description || (transaction.type === 'topup' ? 'Top Up' : 'Payment')}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
          <span>{formatDate(transaction.created_at)}</span>
          {transaction.location && <><span>•</span><span className="truncate">{transaction.location}</span></>}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={cn('font-semibold text-sm', isPositive ? 'text-success' : 'text-foreground')}>
          {isPositive ? '+' : '-'} IDR {Math.abs(transaction.amount).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
};
