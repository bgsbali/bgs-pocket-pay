export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  qrCodeUrl: string;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'topup' | 'payment' | 'refund';
  amount: number;
  date: string;
  source: string;
  location?: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface AuthUser {
  token: string;
  customer: Customer;
}
