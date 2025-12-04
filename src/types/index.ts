export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  qr_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'topup' | 'payment';
  amount: number;
  source: string | null;
  location: string | null;
  description: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Legacy types for backward compatibility
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  qrCodeUrl: string;
  createdAt: string;
}

export interface AuthUser {
  token: string;
  customer: Customer;
}
