import { FieldHookConfig, useField } from 'formik';
import { AutoComplete, AutoCompleteProps } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';

interface AutoCompleteInputProps<T extends Group | Item> {
  label: string;
  data: T[];
  columnWidth?: number;
}

interface Item {
  label: string;
}

interface Group {
  label: string;
  icon?: string;
  items: Item[];
}

export const AutoCompleteInput = <T extends Group | Item>({
  label,
  data,
  columnWidth,
  ...props
}: AutoCompleteInputProps<T> & FieldHookConfig<string> & AutoCompleteProps) => {
  const [field, meta] = useField(props);
  const [selectedValues, setSelectedValues] = useState<Item | Item[]>();
  const [filteredValues, setFilteredValues] = useState<T[]>([]);

  const id: string = props.id || props.name;
  const isInvalid = !!(meta.touched && meta.error);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceOfGroupArray = (obj: any[]): obj is Group[] => {
    return obj.length > 0 && 'items' in obj[0];
  };

  const search = (event: { query: string }) => {
    const _filteredValues = [];

    if (instanceOfGroupArray(data)) {
      for (const group of data) {
        const filteredItems = group.items.filter(
          (item) => item.label.toLowerCase().indexOf(event.query.toLowerCase()) !== -1
        );

        if (filteredItems && filteredItems.length) {
          _filteredValues.push({ ...group, ...{ items: filteredItems } });
        }
      }
    } else {
      for (const item of data) {
        if (item.label.toLocaleLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          _filteredValues.push(item);
        }
      }
    }

    setFilteredValues(_filteredValues);
  };

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={id}>{label}</label>
      <span className="p-fluid">
        {/* TODO: Resolve type conflict for 'ref' prop */}
        <AutoComplete
          {...field}
          {...props}
          type="text"
          value={selectedValues}
          completeMethod={search}
          suggestions={filteredValues}
          onChange={(event) => {
            setSelectedValues(event.value);
            field.onChange(event);
          }}
          className={classNames({ 'p-invalid': isInvalid }, 'w-full')}
        />
      </span>
      {isInvalid && (
        <small id={`${id}-error`} className="p-error block">
          {meta.error}
        </small>
      )}
    </div>
  );
};
