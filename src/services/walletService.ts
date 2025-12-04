import { supabase } from '@/integrations/supabase/client';
import { Wallet, Transaction } from '@/types';

class WalletService {
  async getBalance(): Promise<Wallet | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching wallet:', error);
      return null;
    }

    return data as Wallet | null;
  }

  async getTransactions(limit = 50): Promise<Transaction[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }

    return (data || []) as Transaction[];
  }

  async processPayment(amount: number, description: string, location?: string): Promise<Transaction | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'payment',
        amount: -Math.abs(amount),
        description,
        location,
        source: 'BGS Store',
        status: 'completed',
      })
      .select()
      .single();

    if (error) {
      console.error('Error processing payment:', error);
      return null;
    }

    return data as Transaction;
  }
}

export const walletService = new WalletService();
