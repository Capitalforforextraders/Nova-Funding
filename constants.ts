
import { FundingPackage, Review, Notification } from './types';

export const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029VbBYoy33LdQTZWgY1t0e";
export const CONTACT_PHONE = "+92 329 8246163";

export const PAYMENT_DETAILS = {
  binanceId: "62831244 (capitalforforextrader)",
  trc20Address: "TCcLRPX1jSiKMoMhbYw4HNePFsuoRa1GVx",
};

export const FUNDING_PACKAGES: FundingPackage[] = [
  {
    id: 1,
    accountSize: 1000,
    price: 100,
    features: ["10% Daily Drawdown", "40% Overall Drawdown", "80% Profit Share", "Daily Payouts"],
  },
  {
    id: 2,
    accountSize: 2500,
    price: 250,
    features: ["10% Daily Drawdown", "40% Overall Drawdown", "80% Profit Share", "Daily Payouts"],
  },
  {
    id: 3,
    accountSize: 5000,
    price: 500,
    features: ["10% Daily Drawdown", "40% Overall Drawdown", "80% Profit Share", "Daily Payouts"],
  },
  {
    id: 4,
    accountSize: 10000,
    price: 1000,
    features: ["10% Daily Drawdown", "40% Overall Drawdown", "80% Profit Share", "Daily Payouts"],
  },
  {
    id: 5,
    accountSize: 25000,
    price: 2500,
    features: ["10% Daily Drawdown", "40% Overall Drawdown", "80% Profit Share", "Daily Payouts"],
  },
];

// NOTE: In a real application, these image paths would point to assets served from a CDN or the public folder.
// Using picsum.photos for placeholder user images. Payment screenshots are placeholders.
export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ali Khan",
    accountBought: 2500,
    profit: 1200,
    quote: "Made profit in 3 days",
    userImage: "https://picsum.photos/seed/ali_khan/100/100",
    paymentImage: "https://picsum.photos/seed/ali_khan_payment/400/600",
  },
  {
    id: 2,
    name: "Usman Raza",
    accountBought: 5000,
    profit: 3500,
    quote: "Received payout",
    userImage: "https://picsum.photos/seed/usman_raza/100/100",
    paymentImage: "https://picsum.photos/seed/usman_raza_payment/400/600",
  },
  {
    id: 3,
    name: "Hassan Malik",
    accountBought: 1000,
    profit: 300,
    quote: "Instant funding, withdrew",
    userImage: "https://picsum.photos/seed/hassan_malik/100/100",
    paymentImage: "https://picsum.photos/seed/hassan_malik_payment/400/600",
  },
  {
    id: 4,
    name: "Zain Khan",
    accountBought: 10000,
    profit: 6400,
    quote: "80% profit share worked - got",
    userImage: "https://picsum.photos/seed/zain_khan/100/100",
    paymentImage: "https://picsum.photos/seed/zain_khan_payment/400/600",
  },
  {
    id: 5,
    name: "Naveed Ali",
    accountBought: 25000,
    profit: 8000,
    quote: "Large payout processed in 24h",
    userImage: "https://picsum.photos/seed/naveed_ali/100/100",
    paymentImage: "https://picsum.photos/seed/naveed_ali_payment/400/600",
  },
];

export const NOTIFICATIONS: Notification[] = [
    { id: 1, message: "Hassan M. just bought a $2,500 account!" },
    { id: 2, message: "Zain K. just received a $400 payout!" },
    { id: 3, message: "Ali K. sent payment screenshot." },
    { id: 4, message: "Fatima R. just bought a $5,000 account!" },
    { id: 5, message: "Omar S. just received a $1,200 payout!" }
];
