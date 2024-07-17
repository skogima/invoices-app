import { useEffect } from "react";
import {
  Control,
  FieldErrorsImpl,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { CreateInvoiceSchema } from "@/const";
import { formatToUSD, generateUUID, round } from "@/utils";
import { Button, Input } from ".";
import deleteIcon from "@/assets/icon-delete.svg";

type Props = {
  control: Control<CreateInvoiceSchema>;
  errors: FieldErrorsImpl<CreateInvoiceSchema>;
  register: UseFormRegister<CreateInvoiceSchema>;
  setValue: UseFormSetValue<CreateInvoiceSchema>;
};

export function ProductsForm({ control, errors, register, setValue }: Readonly<Props>) {
  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "items",
  });

  const products = useWatch({ control, name: "items", defaultValue: productFields });

  useEffect(() => {
    addProduct(false);
  }, []);

  function addProduct(shouldFocus = true) {
    appendProduct(
      { id: generateUUID(), itemName: "", price: 0, quantity: 1, total: 0 },
      { shouldFocus },
    );
  }

  function handleRemoveProduct(index: number) {
    if (productFields.length == 1) {
      return;
    }

    removeProduct(index);
  }

  function calcProductTotal(price: number, quantity: number) {
    return round(price * quantity);
  }

  function onQuantityChanged(productIndex: number, value: number) {
    setValue(
      `items.${productIndex}.total`,
      calcProductTotal(products[productIndex].price, Number.isNaN(value) ? 0 : value),
    );
  }

  function onPriceChanged(productIndex: number, value: number) {
    setValue(
      `items.${productIndex}.total`,
      calcProductTotal(Number.isNaN(value) ? 0 : value, products[productIndex].quantity),
    );
  }

  return (
    <fieldset className="mt-4">
      <legend id="itemList" className="mb-4 text-body-l text-gray-400">
        Item List
      </legend>

      {productFields.map((product, i) => (
        <div
          key={product.id}
          className="mb-4 grid grid-cols-[0.7fr_1fr_1fr_min-content] gap-x-4 text-blue-gray-300 dark:text-gray-200 md:grid-cols-[2fr_0.7fr_1fr_1fr_min-content]"
        >
          <div className="col-span-5 mb-4 space-y-2  sm:col-span-1 sm:mb-0">
            <label
              className={i == 0 ? "block" : "block md:hidden"}
              htmlFor={`products.${i}.itemName`}
            >
              Item Name
            </label>
            <Input
              label=""
              type="text"
              id={`items.${i}.itemName`}
              register={register(`items.${i}.itemName`)}
              error={!!errors.items?.[i]?.itemName}
            />
          </div>
          <div className="space-y-2">
            <label className={i == 0 ? "block" : "block md:hidden"} htmlFor={`items.${i}.quantity`}>
              Qty.
            </label>
            <Input
              label=""
              type="number"
              id={`items.${i}.quantity`}
              register={register(`items.${i}.quantity`, {
                valueAsNumber: true,
                onChange: (event) => onQuantityChanged(i, event.target.valueAsNumber),
              })}
              error={!!errors.items?.[i]?.quantity}
            />
          </div>
          <div className="space-y-2">
            <label className={i == 0 ? "block" : "block md:hidden"} htmlFor={`items.${i}.price`}>
              Price
            </label>
            <Input
              label=""
              type="number"
              id={`items.${i}.price`}
              register={register(`items.${i}.price`, {
                valueAsNumber: true,
                onChange: (event) => onPriceChanged(i, event.target.valueAsNumber),
              })}
              error={!!errors.items?.[i]?.price}
            />
          </div>
          <div className="space-y-4">
            <span
              className={`${
                i == 0 ? "block" : "block md:hidden"
              } text-draft-light dark:text-draft-dark tracking-tight`}
            >
              Total
            </span>
            {products.length > 0 && (
              <div className="flex h-[48px] items-center font-bold text-blue-gray-400 dark:text-gray-200">
                {formatToUSD(products[i]?.total ?? 0)}
              </div>
            )}
          </div>
          <div className="group flex h-[48px] w-[24px] items-center self-end">
            <button
              type="button"
              className="h-[24px] w-[24px] rounded-full bg-blue-gray-400 p-1 hover:bg-red disabled:pointer-events-none disabled:opacity-50"
              style={{ mask: `url(${deleteIcon}) center no-repeat` }}
              aria-label="delete"
              disabled={productFields.length == 1}
              onClick={() => handleRemoveProduct(i)}
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        type="button"
        className="mb-4 w-full justify-center py-4"
        onClick={() => addProduct()}
      >
        + Add New Item
      </Button>
    </fieldset>
  );
}
