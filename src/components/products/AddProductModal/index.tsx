"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { step1Schema, step2Schema } from "@/lib/schemas/product-schemas";
import { AddProductModalProps } from "./types";
import {
  CATEGORIES,
  CURRENCIES,
  MANUFACTURERS,
  PRODUCT_TAGS,
  VAT_RATES,
  validateStep3Field,
  validateSku,
  parsePriceInput,
} from "./utils";
import { useAddProduct } from "./hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function AddProductModal({
  isOpen,
  handleOpen,
  handleAddProduct,
  existingProducts,
}: AddProductModalProps) {
  const {
    handleDialogOpenChange,
    handleNextStep,
    handlePrevStep,
    form,
    currentStep,
  } = useAddProduct({ handleOpen, handleAddProduct, existingProducts });

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="lg:rounded-xl gap-0 overflow-y-auto">
        <DialogHeader className="pb-4 lg:pb-6">
          <DialogTitle className="text-base leading-none font-medium text-foreground ">
            Dodaj nowy produkt
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-0 lg:flex items-center justify-start lg:-mx-4 py-6 lg:px-4 lg:py-3 border-y border-base">
          <div className="flex flex-col lg:flex-row lg:text-left lg:gap-3 lg:items-center lg:min-w-36.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "border border-base text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? (
                <Check className="h-4 w-4 stroke-[2.5]" />
              ) : (
                "1"
              )}
            </div>
            <div>
              <p className="mt-3 mb-0.5 lg:mt-0 text-sm font-semibold text-foreground">
                Informacje
              </p>
              <p className=" lg:block text-xs text-muted-foreground">
                Dane podstawowe
              </p>
            </div>
          </div>

          <div
            className={`hidden max-w-16.75 h-px lg:block flex-1 mx-2 lg:mx-4 ${currentStep >= 2 ? "bg-blue-600" : "bg-[#e4e4e4]"}`}
          />

          <div
            className={`flex flex-col lg:flex-row lg:text-left lg:gap-3 lg:items-center lg:min-w-36.5 transition-opacity`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors bg-accent ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "border border-base text-muted-foreground "
              }`}
            >
              {currentStep > 2 ? (
                <Check className="h-4 w-4 stroke-[2.5]" />
              ) : (
                "2"
              )}
            </div>
            <div>
              <p
                className={`mt-3 mb-0.5 lg:mt-0 text-sm font-medium ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Cena
              </p>
              <p className=" lg:block text-xs text-muted-foreground">
                Dane cenowe
              </p>
            </div>
          </div>

          <div
            className={`hidden max-w-16.75 h-px lg:block flex-1 mx-2 lg:mx-4 ${currentStep === 3 ? "bg-blue-600" : "bg-[#e4e4e4]"}`}
          />

          <div
            className={`flex flex-col lg:flex-row lg:text-left lg:items-center lg:gap-3 lg:min-w-36.5 transition-opacity`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors bg-accent text-muted-foreground ${
                currentStep === 3
                  ? "bg-blue-600 text-white"
                  : "border border-base"
              }`}
            >
              3
            </div>
            <div>
              <p
                className={`mt-3 mb-0.5 lg:mt-0 text-sm font-medium ${currentStep === 3 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Dostępność
              </p>
              <p className="lg:block text-xs text-muted-foreground">
                Stany magazynowe
              </p>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col grow"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === 3) {
              form.handleSubmit();
            }
          }}
        >
          {currentStep === 1 && (
            <div className="space-y-4 pt-4 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      const res = step1Schema.shape.name.safeParse(value);
                      return res.success
                        ? undefined
                        : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Nazwa produktu
                      </Label>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="np. MacBook Pro 14"
                        className="h-8 rounded-xl border-base text-sm "
                      />
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="sku"
                  validators={{
                    onChange: ({ value }) =>
                      validateSku(value, existingProducts),
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        SKU produktu
                      </Label>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="np. MBP14M3PRO"
                        className="h-8 rounded-xl border-base text-sm focus-visible:ring-blue-600"
                      />
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field
                name="description"
                validators={{
                  onChange: ({ value }) => {
                    const res = step1Schema.shape.description.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Opis produktu
                    </Label>
                    <Textarea
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Krótki opis produktu"
                      className="min-h-16 rounded-[10px] border-base text-sm resize-none p-3"
                    />
                    {field.state.meta.errors[0] && (
                      <p className="text-xs text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form.Field
                  name="manufacturer"
                  validators={{
                    onChange: ({ value }) => {
                      const res =
                        step1Schema.shape.manufacturer.safeParse(value);
                      return res.success
                        ? undefined
                        : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Producent
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-base text-sm focus:ring-blue-600">
                          <SelectValue placeholder="Wybierz producenta" />
                        </SelectTrigger>
                        <SelectContent>
                          {MANUFACTURERS.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="category"
                  validators={{
                    onChange: ({ value }) => {
                      const res = step1Schema.shape.category.safeParse(value);
                      return res.success
                        ? undefined
                        : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Kategoria
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-base text-sm focus:ring-blue-600">
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field
                name="tags"
                validators={{
                  onChange: ({ value }) => {
                    const res = step1Schema.shape.tags.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2 pt-1">
                    <Label className="text-sm font-medium text-foreground">
                      Cechy produktu
                    </Label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {PRODUCT_TAGS.map((tag) => {
                        const isSelected = field.state.value.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                field.handleChange(
                                  field.state.value.filter((t) => t !== tag),
                                );
                              } else {
                                field.handleChange([...field.state.value, tag]);
                              }
                            }}
                            className={`px-1.75 py-px rounded-full border text-sm transition-colors ${
                              isSelected
                                ? "bg-blue-50 border-blue-600 text-blue-600"
                                : "border-base text-muted-foreground hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                    {field.state.meta.errors[0] && (
                      <p className="text-xs text-red-500 pt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 py-4 lg:py-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form.Field
                  name="netPrice"
                  validators={{
                    onChange: ({ value }) => {
                      const res = step2Schema.shape.netPrice.safeParse(value);
                      return res.success
                        ? undefined
                        : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Cena netto
                      </Label>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={field.state.value}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          field.handleChange(inputValue);
                          const net = parsePriceInput(inputValue);
                          if (net === undefined) return;
                          const vatRate = form.getFieldValue("vatRate") || 0;
                          const gross = net * (1 + vatRate / 100);
                          form.setFieldValue("grossPrice", gross.toFixed(2));
                        }}
                        placeholder="0.00"
                        className="[appearance:textfield] h-8 rounded-[60px] border-base text-sm"
                      />
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="grossPrice"
                  validators={{
                    onChange: ({ value }) => {
                      const res = step2Schema.shape.grossPrice.safeParse(value);
                      return res.success
                        ? undefined
                        : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Cena brutto
                      </Label>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={field.state.value}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          field.handleChange(inputValue);
                          const gross = parsePriceInput(inputValue);
                          if (gross === undefined) return;

                          const vatRate = form.getFieldValue("vatRate") || 0;
                          const net = gross / (1 + vatRate / 100);
                          form.setFieldValue("netPrice", net.toFixed(2));
                        }}
                        placeholder="0.00"
                        className="[appearance:textfield] h-8 rounded-[60px] border-base text-sm "
                      />
                      {field.state.meta.errors[0] && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form.Field name="vatRate">
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Stawka VAT (%)
                      </Label>
                      <Select
                        value={String(field.state.value)}
                        onValueChange={(val) => {
                          const newVat = Number(val);
                          field.handleChange(newVat);

                          const netPrice = parsePriceInput(
                            form.getFieldValue("netPrice"),
                          );
                          if (netPrice === undefined) return;
                          const gross = netPrice * (1 + newVat / 100);
                          form.setFieldValue("grossPrice", gross.toFixed(2));
                        }}
                      >
                        <SelectTrigger className="h-8 rounded-[60px] border-base text-sm">
                          <SelectValue placeholder="Wybierz VAT" />
                        </SelectTrigger>
                        <SelectContent>
                          {VAT_RATES.map((rate) => (
                            <SelectItem key={rate} value={String(rate)}>
                              {rate}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="currency">
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Waluta
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(val: "PLN" | "EUR" | "USD") =>
                          field.handleChange(val)
                        }
                      >
                        <SelectTrigger className="h-8 rounded-[60px] border-base text-sm">
                          <SelectValue placeholder="Wybierz walutę" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className=" py-4 lg:py-5">
              <div className="space-y-4">
                <form.Field name="isAvailable">
                  {(field) => (
                    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-base">
                      <Switch
                        id="isAvailable"
                        checked={field.state.value}
                        onCheckedChange={field.handleChange}
                      />
                      <Label
                        htmlFor="isAvailable"
                        className="text-sm font-medium text-foreground cursor-pointer select-none"
                      >
                        Produkt jest dostępny
                      </Label>
                    </div>
                  )}
                </form.Field>

                <form.Field name="isLimited">
                  {(field) => (
                    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-base">
                      <Checkbox
                        id="isLimited"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(Boolean(checked))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label
                        htmlFor="isLimited"
                        className="text-sm font-medium text-foregroud cursor-pointer select-none"
                      >
                        Produkt limitowany
                      </Label>
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Subscribe selector={(state) => [state.values.isLimited]}>
                {([isLimited]) =>
                  isLimited ? (
                    <form.Field
                      name="stockQuantity"
                      validators={{
                        onChangeListenTo: ["isAvailable"],
                        onChange: ({ value, fieldApi }) =>
                          validateStep3Field(
                            {
                              ...fieldApi.form.state.values,
                              stockQuantity: value,
                            },
                            "stockQuantity",
                          ),
                        onSubmit: ({ fieldApi }) =>
                          validateStep3Field(
                            fieldApi.form.state.values,
                            "stockQuantity",
                          ),
                      }}
                    >
                      {(field) => (
                        <div className="mb-4 space-y-2 animate-in fade-in-50 duration-200">
                          <Label className="text-sm font-medium text-foregroud">
                            Ilość na magazynie{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={field.state.value ?? ""}
                            onChange={(e) =>
                              field.handleChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.valueAsNumber,
                              )
                            }
                            placeholder="np. 50"
                            className="h-10 rounded-[50px] border-gray-200 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          {field.state.meta.errors[0] && (
                            <p className="text-xs text-red-500">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                        </div>
                      )}
                    </form.Field>
                  ) : null
                }
              </form.Subscribe>

              <div className="space-y-4">
                <p className="text-base font-medium text-foregroud">
                  Limity koszyka
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <form.Field
                    name="minCartQuantity"
                    validators={{
                      onChange: ({ value, fieldApi }) =>
                        validateStep3Field(
                          {
                            ...fieldApi.form.state.values,
                            minCartQuantity: value,
                          },
                          "minCartQuantity",
                        ),
                      onSubmit: ({ fieldApi }) =>
                        validateStep3Field(
                          fieldApi.form.state.values,
                          "minCartQuantity",
                        ),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Minimalna ilość
                        </Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="1"
                          className="h-10 rounded-[50px] border-gray-200 text-sm text-foregroud [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {field.state.meta.errors[0] && (
                          <p className="text-xs text-red-500">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="maxCartQuantity"
                    validators={{
                      onChange: ({ value, fieldApi }) =>
                        validateStep3Field(
                          {
                            ...fieldApi.form.state.values,
                            maxCartQuantity: value,
                          },
                          "maxCartQuantity",
                        ),
                      onSubmit: ({ fieldApi }) =>
                        validateStep3Field(
                          fieldApi.form.state.values,
                          "maxCartQuantity",
                        ),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Maksymalna ilość
                        </Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="10"
                          className="h-10 rounded-[50px] border-gray-200 text-sm text-foregroud [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {field.state.meta.errors[0] && (
                          <p className="text-xs text-red-500">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto -mb-4 -mx-4 p-4 border-t border-base bg-neutral-50">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handlePrevStep}
                className=" border-base rounded-[50px] px-4 text-sm font-medium text-foreground flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Wstecz
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                size="lg"
                onClick={handleNextStep}
                className=" bg-blue-600 hover:bg-blue-700 text-white rounded-[40px] px-4 font-medium text-sm flex items-center gap-1.5 transition-all ml-auto"
              >
                Dalej
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                onClick={() => form.handleSubmit()}
                className=" bg-blue-600 hover:bg-blue-700 text-white rounded-[50px] px-4 font-medium text-sm flex items-center gap-1.5 transition-all ml-auto"
              >
                Zapisz produkt
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
