import { Wallet, Transaction } from '@/types';

// Mock API - Replace with actual BGS backend API
class WalletService {
  private baseUrl = '/api/wallet'; // Placeholder

  async getBalance(token: string): Promise<Wallet> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      balance: 500000,
      currency: 'IDR',
    };
  }

  async getTransactions(token: string, limit = 50): Promise<Transaction[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));

    // Mock recent transactions
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_001',
        type: 'payment',
        amount: -45000,
        date: new Date(Date.now() - 1000 * 60).toISOString(),
        source: 'BGS Canggu',
        location: 'Canggu Store',
        description: 'Almond Latte',
        status: 'completed',
      },
      {
        id: 'txn_002',
        type: 'payment',
        amount: -55000,
        date: new Date(Date.now() - 1000 * 120).toISOString(),
        source: 'BGS Canggu',
        location: 'Canggu Store',
        description: 'BGS Blondie',
        status: 'completed',
      },
      {
        id: 'txn_003',
        type: 'topup',
        amount: 300000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        source: 'Cash - Store',
        location: 'BGS Canggu',
        description: 'Top up via cash',
        status: 'completed',
      },
      {
        id: 'txn_004',
        type: 'payment',
        amount: -120000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        source: 'BGS Online Store',
        description: 'BGS T-Shirt',
        status: 'completed',
      },
      {
        id: 'txn_005',
        type: 'topup',
        amount: 500000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        source: 'Online Top-up',
        description: 'Top up via website',
        status: 'completed',
      },
    ];

    return mockTransactions.slice(0, limit);
  }

  async processPayment(token: string, amount: number): Promise<Transaction> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: 'txn_' + Date.now(),
      type: 'payment',
      amount: -amount,
      date: new Date().toISOString(),
      source: 'BGS Store',
      description: 'Store purchase',
      status: 'completed',
    };
  }
}

export const walletService = new WalletService();
