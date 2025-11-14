
export interface FundingPackage {
  id: number;
  accountSize: number;
  price: number;
  features: string[];
}

export interface Review {
  id: number;
  name: string;
  accountBought: number;
  profit: number;
  quote: string;
  userImage: string;
  paymentImage: string;
}

export interface Notification {
  id: number;
  message: string;
}

export type AccountStatus = 'pending' | 'active' | 'suspended' | 'review' | 'banned';

export interface Payout {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, this would be a bcrypt hash
  country: string;
  signupDate: string;
  accountSize: number;
  status: AccountStatus;
  payoutHistory: Payout[];
  role: 'user' | 'admin';
}
