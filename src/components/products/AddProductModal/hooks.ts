import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import {
  CATEGORIES,
  DEFAULT_CURRENCY,
  DEFAULT_VAT_RATE,
  MANUFACTURERS,
  validateSku,
} from "./utils";
import { CombinedFormValues } from "./types";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/lib/schemas/product-schemas";

export const useAddProduct = ({
  handleOpen,
  handleAddProduct,
  existingProducts,
}: {
  handleAddProduct: (product: Product) => void;
  handleOpen: (isOpen: boolean) => void;
  existingProducts: Product[];
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setCurrentStep(1);
      form.reset();
    }
    handleOpen(open);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      manufacturer: "",
      category: "",
      tags: [],
      netPrice: "",
      grossPrice: "",
      vatRate: DEFAULT_VAT_RATE,
      currency: DEFAULT_CURRENCY,
      isAvailable: true,
      isLimited: false,
      stockQuantity: undefined,
      minCartQuantity: "",
      maxCartQuantity: "",
    } as CombinedFormValues,
    canSubmitWhenInvalid: true,
    validators: {
      onSubmit: ({ value }) => {
        const result = step3Schema.safeParse({
          isAvailable: value.isAvailable,
          isLimited: value.isLimited,
          stockQuantity: value.stockQuantity,
          minCartQuantity: value.minCartQuantity,
          maxCartQuantity: value.maxCartQuantity,
        });

        if (result.success) {
          return undefined;
        }

        return {
          fields: Object.fromEntries(
            result.error.issues.map((issue) => [
              issue.path.join("."),
              issue.message,
            ]),
          ),
        };
      },
    },
    onSubmit: async ({ value }) => {
      const step2Result = step2Schema.safeParse({
        netPrice: value.netPrice,
        grossPrice: value.grossPrice,
        vatRate: value.vatRate,
        currency: value.currency,
      });

      if (!step2Result.success) {
        return;
      }

      const step3Result = step3Schema.safeParse({
        isAvailable: value.isAvailable,
        isLimited: value.isLimited,
        stockQuantity: value.stockQuantity,
        minCartQuantity: value.minCartQuantity,
        maxCartQuantity: value.maxCartQuantity,
      });

      if (!step3Result.success) {
        return;
      }

      const manufacturer =
        MANUFACTURERS.find(
          ({ value: optionValue }) => optionValue === value.manufacturer,
        )?.label ?? value.manufacturer;
      const category =
        CATEGORIES.find(
          ({ value: optionValue }) => optionValue === value.category,
        )?.label ?? value.category;

      const product: Product = {
        ...value,
        manufacturer,
        category,
        ...step2Result.data,
        ...step3Result.data,
        minCartQuantity: step3Result.data.minCartQuantity,
        maxCartQuantity: step3Result.data.maxCartQuantity,
        id: crypto.randomUUID(),
      };

      handleAddProduct(product);
      handleOpen(false);
      setCurrentStep(1);
      form.reset();
      toast.success("Produkt został dodany");
    },
  });

  const handleNextStep = () => {
    const values = form.state.values;

    if (currentStep === 1) {
      const result = step1Schema.safeParse({
        name: values.name,
        sku: values.sku,
        description: values.description,
        manufacturer: values.manufacturer,
        category: values.category,
        tags: values.tags,
      });

      if (!result.success || validateSku(values.sku, existingProducts)) {
        form.validateAllFields("change");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const result = step2Schema.safeParse({
        netPrice: values.netPrice,
        grossPrice: values.grossPrice,
        vatRate: values.vatRate,
        currency: values.currency,
      });

      if (!result.success) {
        form.validateAllFields("change");
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  return {
    handlePrevStep,
    handleNextStep,
    handleDialogOpenChange,
    form,
    currentStep,
  };
};
