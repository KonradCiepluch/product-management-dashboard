import { z } from "zod";

export const step1Schema = z.object({
  name: z
    .string()
    .min(3, { error: "Nazwa produktu musi mieć co najmniej 3 znaki." }),
  sku: z
    .string()
    .min(1, { error: "SKU produktu jest wymagane." })
    .max(24, { error: "SKU produktu może mieć maksymalnie 24 znaki." })
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry"),
  description: z.string().optional(),
  manufacturer: z.string().min(1, "Wybierz producenta"),
  category: z.string().min(1, "Wybierz kategorię"),
  tags: z.array(z.string()).min(1, "Wybierz co najmniej jedną cechę"),
});

const priceSchema = (minimumMessage: string) =>
  z
    .string()
    .trim()
    .transform((value, ctx) => {
      const normalizedValue = value.replace(",", ".");
      if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalizedValue)) {
        ctx.addIssue({ code: "custom", message: "Podaj poprawną kwotę." });
        return z.NEVER;
      }

      const price = Number(normalizedValue);
      if (!Number.isFinite(price)) {
        ctx.addIssue({ code: "custom", message: "Podaj poprawną kwotę." });
        return z.NEVER;
      }

      return price;
    })
    .pipe(z.number().min(0.01, minimumMessage));

export const step2Schema = z.object({
  netPrice: priceSchema("Cena netto musi być większa od 0"),
  grossPrice: priceSchema("Cena brutto musi być większa od 0"),
  vatRate: z.coerce.number().min(0, "Wybierz stawkę VAT"),
  currency: z.enum(["PLN", "EUR", "USD"], { error: "Wybierz walutę" }),
});

const optionalCartQuantitySchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    if (value === "") {
      return undefined;
    }

    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(value)) {
      ctx.addIssue({ code: "custom", message: "Wartość musi być liczbą." });
      return z.NEVER;
    }

    const number = Number(value);
    if (!Number.isFinite(number)) {
      ctx.addIssue({ code: "custom", message: "Wartość musi być liczbą." });
      return z.NEVER;
    }

    return number;
  })
  .pipe(
    z
      .number()
      .int("Wartość musi być liczbą całkowitą")
      .min(1, "Minimum to 1")
      .optional(),
  );

export const step3Schema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.coerce
      .number()
      .int("Wartość musi być liczbą całkowitą")
      .min(0, "Ilość nie może być ujemna")
      .optional(),
    minCartQuantity: optionalCartQuantitySchema,
    maxCartQuantity: optionalCartQuantitySchema,
  })
  .superRefine((data, ctx) => {
    if (
      data.isLimited &&
      (data.stockQuantity === undefined || Number.isNaN(data.stockQuantity))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Podaj ilość na magazynie dla produktu limitowanego",
        path: ["stockQuantity"],
      });
    }

    if (data.isLimited && data.isAvailable && data.stockQuantity === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Dostępny produkt musi mieć stan magazynowy większy od 0.",
        path: ["stockQuantity"],
      });
    }

    if (
      data.minCartQuantity !== undefined &&
      data.maxCartQuantity !== undefined &&
      data.minCartQuantity > data.maxCartQuantity
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Maksymalna ilość nie może być mniejsza niż minimalna",
        path: ["maxCartQuantity"],
      });
    }
  });

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
export type Step3Values = z.infer<typeof step3Schema>;
