import { Listbox } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface FormSelectItemProps {
  value: string;
  placeholder: string;
  onSelect?: () => void;
}

export function FormSelectItem({ value, placeholder, onSelect }: FormSelectItemProps) {
  return (
    <Listbox.Option
      className={twMerge(
        'flex cursor-default items-center justify-start px-2.5 py-2.5 text-base',
        'text-gray-700 ui-selected:bg-gray-200 hover:bg-gray-100 ',
      )}
      value={value}
      onClick={onSelect}
    >
      <span className="truncate whitespace-nowrap">{placeholder}</span>
    </Listbox.Option>
  );
}
