export type Currency = "PLN" | "EUR" | "USD";

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  manufacturer: string;
  category: string;
  tags: string[];
  netPrice: number;
  grossPrice: number;
  vatRate: number;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity?: number;
  minCartQuantity?: number;
  maxCartQuantity?: number;
}
