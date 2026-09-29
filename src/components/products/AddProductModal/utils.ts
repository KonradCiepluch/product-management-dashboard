import type { Currency, Product } from "@/types/product";
import { step1Schema, step3Schema } from "@/lib/schemas/product-schemas";
import { CombinedFormValues, Step3FieldName } from "./types";

export const PRODUCT_TAGS = [
  "Bluetooth",
  "WiFi",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
] as const;

export const MANUFACTURERS = [
  { value: "apple", label: "Apple" },
  { value: "samsung", label: "Samsung" },
  { value: "sony", label: "Sony" },
  { value: "xiaomi", label: "Xiaomi" },
  { value: "lg", label: "LG" },
  { value: "bosch", label: "BOSCH" },
] as const;

export const CATEGORIES = [
  { value: "laptopy", label: "Laptopy" },
  { value: "smartfony", label: "Smartfony" },
  { value: "audio", label: "Słuchawki & Audio" },
  { value: "akcesoria", label: "Akcesoria" },
  { value: "agd", label: "AGD" },
] as const;

export const VAT_RATES = [23, 8, 5, 0] as const;

export const CURRENCIES = [
  "PLN",
  "EUR",
  "USD",
] as const satisfies readonly Currency[];

export const DEFAULT_VAT_RATE = VAT_RATES[0];
export const DEFAULT_CURRENCY = CURRENCIES[0];

export const validateSku = (sku: string, existingProducts: Product[]) => {
  const result = step1Schema.shape.sku.safeParse(sku);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }

  const normalizedSku = sku.toLowerCase();
  if (
    existingProducts.some(
      (product) => product.sku.toLowerCase() === normalizedSku,
    )
  ) {
    return "Produkt z takim SKU już istnieje.";
  }
};

export const parsePriceInput = (value: string) => {
  const normalizedValue = value.trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalizedValue)) {
    return undefined;
  }

  const price = Number(normalizedValue);
  return Number.isFinite(price) ? price : undefined;
};

export const validateStep3Field = (
  values: CombinedFormValues,
  fieldName: Step3FieldName,
) => {
  const result = step3Schema.safeParse({
    isAvailable: values.isAvailable,
    isLimited: values.isLimited,
    stockQuantity: values.stockQuantity,
    minCartQuantity: values.minCartQuantity,
    maxCartQuantity: values.maxCartQuantity,
  });

  if (result.success) {
    return undefined;
  }

  return result.error.issues.find((issue) => issue.path[0] === fieldName)
    ?.message;
};
