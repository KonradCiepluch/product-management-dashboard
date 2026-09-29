import { z } from "zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/lib/schemas/product-schemas";
import { Product } from "@/types/product";

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;
type Step3Values = z.infer<typeof step3Schema>;

type Step2FormValues = Omit<Step2Values, "netPrice" | "grossPrice"> & {
  netPrice: string;
  grossPrice: string;
};

export type CombinedFormValues = Step1Values &
  Step2FormValues &
  Omit<Step3Values, "minCartQuantity" | "maxCartQuantity"> & {
    minCartQuantity: string;
    maxCartQuantity: string;
  };
export type Step3FieldName =
  | "stockQuantity"
  | "minCartQuantity"
  | "maxCartQuantity";

export interface AddProductModalProps {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  handleAddProduct: (product: Product) => void;
  existingProducts: Product[];
}
