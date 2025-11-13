
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
