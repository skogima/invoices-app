import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, InputDate, Select } from ".";
import { useInvoices } from "@/context/InvoiceContext";
import { ProductsForm } from "./ProductsForm";
import { CreateInvoiceSchema, invoiceSchema } from "@/const";
import { generateHexId, generateUUID } from "@/utils";

const paymentTermOptions = [
  { text: "Net 1 Day", value: 1 },
  { text: "Net 7 Days", value: 7 },
  { text: "Net 14 Days", value: 14 },
  { text: "Net 30 Days", value: 30 },
];

export function InvoiceForm({ closeForm }: Readonly<{ closeForm: () => void }>) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
    reset,
  } = useForm<CreateInvoiceSchema>({
    mode: "onBlur",
    resolver: zodResolver(invoiceSchema),
  });

  const { invoiceToEdit, dispatch } = useInvoices();

  const isEditing = !!invoiceToEdit;
  const paymentTermsValue = watch("paymentTerms");

  useEffect(() => {
    if (invoiceToEdit) {
      reset({
        senderAddress: { ...invoiceToEdit.senderAddress },
        clientAddress: { ...invoiceToEdit.clientAddress },
        clientEmail: invoiceToEdit.clientEmail,
        clientName: invoiceToEdit.clientName,
        createdAt: invoiceToEdit.createdAt,
        description: invoiceToEdit.description,
        paymentTerms: invoiceToEdit.paymentTerms,
        items: [
          ...invoiceToEdit.items.map((product) => ({
            id: generateUUID(),
            itemName: product.name,
            price: product.price,
            quantity: product.quantity,
            total: product.total,
          })),
        ],
      });
    }

    setFocus("senderAddress.street");
  }, []);

  useEffect(() => {
    register("paymentTerms");
    setValue("paymentTerms", paymentTermOptions[paymentTermOptions.length - 1].value);
  }, [register]);

  function handlePaymentTermsChanged(value: number) {
    setValue("paymentTerms", value);
  }

  function calcPaymentDue(createdAt: Date, paymentTerms: number) {
    const paymentDue = new Date(createdAt);
    paymentDue.setDate(paymentTerms + createdAt.getDate());
    return paymentDue;
  }

  function submitForm(formData: CreateInvoiceSchema, isDraft: boolean) {
    const status = isDraft ? "draft" : "pending";

    dispatch({
      type: isEditing ? "update" : "add",
      payload: {
        id: isEditing ? invoiceToEdit.id : generateHexId(),
        clientAddress: formData.clientAddress,
        clientEmail: formData.clientEmail,
        clientName: formData.clientName,
        createdAt: formData.createdAt,
        description: formData.description,
        items: formData.items.map((item) => ({
          name: item.itemName,
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
        paymentDue: calcPaymentDue(
          new Date(formData.createdAt),
          formData.paymentTerms,
        ).toISOString(),
        paymentTerms: formData.paymentTerms,
        senderAddress: formData.senderAddress,
        status: isEditing ? invoiceToEdit.status : status,
        total: formData.items.reduce((sum, item) => item.total + sum, 0),
      },
    });

    closeForm();
  }

  function handleFormSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    const isDraft = (event.nativeEvent.submitter as HTMLButtonElement).value == "draft";

    handleSubmit((values) => submitForm(values, isDraft))(event);
  }

  function onDiscard() {
    closeForm();
  }

  return (
    <form className="flex h-full flex-col text-body" onSubmit={handleFormSubmit}>
      <div className=" h-full overflow-hidden p-0 sm:p-6">
        <div className="custom-scroll flex h-full flex-col gap-6 overflow-y-scroll p-6 sm:p-8">
          <h1 className="text-heading-m font-bold dark:text-white">
            {!invoiceToEdit ? (
              "Create Invoice"
            ) : (
              <span>
                Edit <span className="text-blue-gray-400">#</span>
                {invoiceToEdit.id}
              </span>
            )}
          </h1>

          <fieldset className="my-4">
            <legend className="mb-6 text-heading-s-variant font-bold text-violet">Bill From</legend>

            <Input
              id="fromStreetAddress"
              label="Street Address"
              register={register("senderAddress.street")}
              aria-invalid={errors.senderAddress?.street ? "true" : "false"}
              error={!!errors.senderAddress?.street}
              errorMessage={errors.senderAddress?.street?.message ?? ""}
            />

            <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3">
              <Input
                id="fromCity"
                label="City"
                register={register("senderAddress.city")}
                aria-invalid={errors.senderAddress?.city ? "true" : "false"}
                error={!!errors.senderAddress?.city}
                errorMessage={errors.senderAddress?.city?.message ?? ""}
              />
              <Input
                id="fromPostCode"
                label="Post Code"
                register={register("senderAddress.postCode")}
                aria-invalid={errors.senderAddress?.postCode ? "true" : "false"}
                error={!!errors.senderAddress?.postCode}
                errorMessage={errors.senderAddress?.postCode?.message ?? ""}
              />
              <Input
                id="fromCountry"
                label="Country"
                className="col-span-2 sm:col-span-1"
                register={register("senderAddress.country")}
                aria-invalid={errors.senderAddress?.country ? "true" : "false"}
                error={!!errors.senderAddress?.country}
                errorMessage={errors.senderAddress?.country?.message ?? ""}
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-6">
            <legend className="text-sm mb-6 text-heading-s-variant font-bold text-violet">
              Bill To
            </legend>

            <Input
              id="clientName"
              label="Client's name"
              register={register("clientName")}
              aria-invalid={errors.clientName ? "true" : "false"}
              error={!!errors.clientName}
              errorMessage={errors.clientName?.message ?? ""}
            />

            <Input
              id="clientEmail"
              label="Client's email"
              type="email"
              register={register("clientEmail")}
              aria-invalid={errors.clientEmail ? "true" : "false"}
              error={!!errors.clientEmail}
              errorMessage={errors.clientEmail?.message ?? ""}
            />

            <Input
              id="clientStreet"
              label="Street Address"
              register={register("clientAddress.street")}
              aria-invalid={errors.clientAddress?.street ? "true" : "false"}
              error={!!errors.clientAddress?.street}
              errorMessage={errors.clientAddress?.street?.message ?? ""}
            />

            <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3">
              <Input
                id="clientCity"
                label="City"
                register={register("clientAddress.city")}
                aria-invalid={errors.clientAddress?.city ? "true" : "false"}
                error={!!errors.clientAddress?.city}
                errorMessage={errors.clientAddress?.city?.message ?? ""}
              />
              <Input
                id="clientPostCode"
                label="Post Code"
                register={register("clientAddress.postCode")}
                aria-invalid={errors.clientAddress?.postCode ? "true" : "false"}
                error={!!errors.clientAddress?.postCode}
                errorMessage={errors.clientAddress?.postCode?.message ?? ""}
              />
              <Input
                id="clientCountry"
                label="Country"
                className="col-span-2 sm:col-span-1"
                register={register("clientAddress.country")}
                aria-invalid={errors.clientAddress?.country ? "true" : "false"}
                error={!!errors.clientAddress?.country}
                errorMessage={errors.clientAddress?.country?.message ?? ""}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
              <InputDate
                id="invoiceDate"
                label="Invoice Date"
                register={register("createdAt")}
                disabled={isEditing}
                aria-invalid={errors.createdAt ? "true" : "false"}
                error={!!errors.createdAt}
                errorMessage={errors.createdAt?.message ?? ""}
              />

              <Select
                className="shrink-0"
                id="paymentTerms"
                label="Payment Terms"
                items={paymentTermOptions}
                value={paymentTermsValue}
                onValueChange={(value) => handlePaymentTermsChanged(value as number)}
                error={!!errors.paymentTerms}
              />
            </div>

            <Input
              id="projectDescription"
              label="Project Description"
              register={register("description")}
              aria-invalid={errors.description ? "true" : "false"}
              error={!!errors.description}
              errorMessage={errors.description?.message ?? ""}
            />
          </fieldset>

          <ProductsForm control={control} errors={errors} register={register} setValue={setValue} />

          {Object.keys(errors).length > 0 && (
            <div className="mb-4 flex flex-col text-red">
              <span>- All fields must be added </span>
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full -translate-y-full bg-gradient-to-b from-black/0 to-black/10"></div>
      <div className="z-10 flex w-full items-center gap-x-2 rounded-lg bg-white p-6 dark:bg-gray-900 sm:px-16">
        <Button
          variant="secondary"
          type="button"
          onClick={() => onDiscard()}
          className={`text-nowrap px-5 ${isEditing ? "ml-auto" : ""}`}
        >
          {isEditing ? "Cancel" : "Discard"}
        </Button>

        {!isEditing && (
          <Button
            className="ml-auto text-nowrap px-5"
            variant="tertiary"
            type="submit"
            value="draft"
          >
            Save as Draft
          </Button>
        )}

        <Button variant="primary" type="submit" className="text-nowrap px-5" value="pending">
          Save & Send
        </Button>
      </div>
    </form>
  );
}
