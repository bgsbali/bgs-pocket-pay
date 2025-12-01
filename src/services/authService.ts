import { AuthUser, Customer } from '@/types';

// Mock API - Replace with actual BGS backend API
class AuthService {
  private baseUrl = '/api/auth'; // Placeholder

  async login(email: string, password: string): Promise<AuthUser> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock auto-create account if doesn't exist
    const mockToken = 'mock_jwt_token_' + Date.now();
    const customer: Customer = {
      id: 'customer_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      phone: '+6285773741556', // Mock phone
      qrCodeUrl: 'QR_' + email,
      createdAt: new Date().toISOString(),
    };

    return {
      token: mockToken,
      customer,
    };
  }

  async updateProfile(token: string, data: Partial<Customer>): Promise<Customer> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedAuth = localStorage.getItem('bgs_auth');
    if (!storedAuth) throw new Error('Not authenticated');

    const { customer } = JSON.parse(storedAuth) as AuthUser;
    const updated = { ...customer, ...data };

    return updated;
  }
}

export const authService = new AuthService();
