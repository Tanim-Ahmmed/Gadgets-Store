"use client";

import { useEffect, useMemo, useState } from "react";

import gadgetsData from "@/data/gadgets.json";
import { ProtectedRoute } from "@/components/providers/protected-route";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { addItem } from "@/lib/storage";
import type { Gadget } from "@/types/gadget";

type FormValues = {
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  category: string;
  brand: string;
  image: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const categoryOptions = [...new Set((gadgetsData as Gadget[]).map((item) => item.category))];

const initialValues: FormValues = {
  title: "",
  shortDesc: "",
  fullDesc: "",
  price: "",
  category: categoryOptions[0] ?? "Phone",
  brand: "",
  image: "",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function isValidImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateForm(values: FormValues) {
  const errors: FormErrors = {};
  const numericPrice = Number(values.price);

  if (values.title.trim().length < 3) {
    errors.title = "Enter a title with at least 3 characters.";
  }

  if (values.shortDesc.trim().length < 20) {
    errors.shortDesc = "Short description should be at least 20 characters.";
  }

  if (values.fullDesc.trim().length < 60) {
    errors.fullDesc = "Full description should be at least 60 characters.";
  }

  if (!values.price.trim()) {
    errors.price = "Enter a price.";
  } else if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    errors.price = "Price must be a valid number greater than 0.";
  }

  if (!values.category.trim()) {
    errors.category = "Select a category.";
  }

  if (values.brand.trim().length < 2) {
    errors.brand = "Enter a brand name with at least 2 characters.";
  }

  if (!values.image.trim()) {
    errors.image = "Enter an image URL.";
  } else if (!isValidImageUrl(values.image)) {
    errors.image = "Enter a valid image URL starting with http or https.";
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-rose-300">{message}</p>;
}

export default function AddItemPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const numericPrice = Number(values.price);
  const previewPrice = Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : null;

  const previewTitle = values.title.trim() || "Your new item";
  const previewBrand = values.brand.trim() || "Brand";
  const previewCategory = values.category.trim() || "Category";
  const previewShortDesc =
    values.shortDesc.trim() || "A concise product summary will appear here.";

  const heroLabel = useMemo(
    () => (previewPrice ? formatPrice(previewPrice) : "Set a price"),
    [previewPrice],
  );

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [showToast]);

  function updateValue<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[key]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[key];
      return nextErrors;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      addItem({
        title: values.title.trim(),
        shortDesc: values.shortDesc.trim(),
        fullDesc: values.fullDesc.trim(),
        price: Number(values.price),
        category: values.category.trim(),
        brand: values.brand.trim(),
        image: values.image.trim(),
        rating: 4.7,
      });

      setValues(initialValues);
      setErrors({});
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="bg-transparent">
        <Toast visible={showToast}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Saved
            </div>
            <div>
              <p className="font-semibold text-white">Item added successfully</p>
              <p className="mt-1 text-slate-300">
                Your product has been saved to local storage.
              </p>
            </div>
          </div>
        </Toast>

        <Section className="pt-16 sm:pt-20">
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Catalog tools
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Add a polished product listing in one pass
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  Fill in the essentials, validate before submit, and store the
                  listing locally so it is ready for your inventory workflow.
                </p>
              </div>

              <Card className="grid gap-4 p-6 sm:grid-cols-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                    Price target
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{heroLabel}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                    Category
                  </p>
                  <p className="mt-2 text-lg font-medium text-slate-50">
                    {previewCategory}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                    Brand
                  </p>
                  <p className="mt-2 text-lg font-medium text-slate-50">
                    {previewBrand}
                  </p>
                </div>
              </Card>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
              <Card className="p-6 sm:p-8">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="title" className="text-sm font-medium text-slate-300">
                        Title
                      </label>
                      <Input
                        id="title"
                        value={values.title}
                        onChange={(event) => updateValue("title", event.target.value)}
                        placeholder="Nova X14 Ultra"
                        aria-invalid={Boolean(errors.title)}
                      />
                      <FieldError message={errors.title} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="shortDesc"
                        className="text-sm font-medium text-slate-300"
                      >
                        Short description
                      </label>
                      <Textarea
                        id="shortDesc"
                        value={values.shortDesc}
                        onChange={(event) => updateValue("shortDesc", event.target.value)}
                        placeholder="A quick, compelling summary customers can scan in seconds."
                        className="min-h-28"
                        aria-invalid={Boolean(errors.shortDesc)}
                      />
                      <FieldError message={errors.shortDesc} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="fullDesc"
                        className="text-sm font-medium text-slate-300"
                      >
                        Full description
                      </label>
                      <Textarea
                        id="fullDesc"
                        value={values.fullDesc}
                        onChange={(event) => updateValue("fullDesc", event.target.value)}
                        placeholder="Describe the product in more depth, including standout features, materials, or intended use."
                        className="min-h-40"
                        aria-invalid={Boolean(errors.fullDesc)}
                      />
                      <FieldError message={errors.fullDesc} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium text-slate-300">
                        Price
                      </label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        inputMode="decimal"
                        value={values.price}
                        onChange={(event) => updateValue("price", event.target.value)}
                        placeholder="999"
                        aria-invalid={Boolean(errors.price)}
                      />
                      <FieldError message={errors.price} />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="category"
                        className="text-sm font-medium text-slate-300"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        value={values.category}
                        onChange={(event) => updateValue("category", event.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white shadow-md transition-all duration-200 ease-in-out hover:border-primary/80 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                        aria-invalid={Boolean(errors.category)}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.category} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="brand" className="text-sm font-medium text-slate-300">
                        Brand
                      </label>
                      <Input
                        id="brand"
                        value={values.brand}
                        onChange={(event) => updateValue("brand", event.target.value)}
                        placeholder="NovaTech"
                        aria-invalid={Boolean(errors.brand)}
                      />
                      <FieldError message={errors.brand} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium text-slate-300">
                        Image URL
                      </label>
                      <Input
                        id="image"
                        type="url"
                        value={values.image}
                        onChange={(event) => updateValue("image", event.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        aria-invalid={Boolean(errors.image)}
                      />
                      <FieldError message={errors.image} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-6 text-slate-400">
                      Saved items are written to `localStorage` and available in this browser.
                    </p>
                    <Button type="submit" className="sm:min-w-40" disabled={isSubmitting}>
                      {isSubmitting ? "Saving item..." : "Save item"}
                    </Button>
                  </div>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="overflow-hidden p-0">
                  <div className="aspect-[4/3] bg-[#151131]">
                    {isValidImageUrl(values.image) ? (
                      // The preview accepts arbitrary user-provided URLs, so a plain img is safer here.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={values.image}
                        alt={previewTitle}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#14102f_0%,#1c1740_100%)] px-6 text-center">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Image preview
                          </p>
                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            Add a valid image URL to preview how the item card will feel.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                        {previewCategory}
                      </span>
                      <span className="text-slate-400">{previewBrand}</span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-semibold text-white">
                        {previewTitle}
                      </h2>
                      <p className="text-sm leading-6 text-slate-300">{previewShortDesc}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-sm text-slate-400">Preview price</p>
                        <p className="text-xl font-semibold text-white">
                          {previewPrice ? formatPrice(previewPrice) : "$0"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-200">
                        Ready to save
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="space-y-4 p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                      Listing guidance
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                      What makes a strong item entry
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm leading-6 text-slate-300">
                    <p>
                      Use a short description for the quick pitch and reserve the full
                      description for features, use cases, and differentiators.
                    </p>
                    <p>
                      Keep pricing realistic and use a high-quality image URL so the
                      listing looks credible in catalog views.
                    </p>
                    <p>
                      Category and brand metadata help future filtering and inventory
                      management feel much cleaner.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </ProtectedRoute>
  );
}
