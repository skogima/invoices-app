import { useEffect, useRef } from "react";
import { Button } from ".";

type Props = {
  invoiceId: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteDialog({ invoiceId, onCancel, onConfirm }: Readonly<Props>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="w-10/12 max-w-[480px] rounded bg-white p-8 shadow-card dark:bg-gray-800 sm:p-12"
    >
      <h2 className="text-heading-m text-gray-950 dark:text-white">Confirm Deletion</h2>

      <p className="mb-4 mt-3 text-body text-blue-gray-400 dark:text-gray-200">
        Are you sure you want to delete invoice {invoiceId}? This action cannot be undone.
      </p>

      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </dialog>
  );
}
