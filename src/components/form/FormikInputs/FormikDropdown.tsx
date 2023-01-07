import { FieldHookConfig, useField } from 'formik';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { SelectItem } from 'primereact/selectitem';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';

interface FormikDropdownProps {
  label: string;
  options: string[];
  columnWidth?: number;
}

export const FormikDropdown = ({
  label,
  options,
  columnWidth,
  ...props
}: FormikDropdownProps & FieldHookConfig<string> & DropdownProps) => {
  const [field, meta] = useField(props);

  const id: string = props.id || props.name;
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={id}>{label}</label>
      <span className="p-fluid">
        <Dropdown
          {...field}
          {...props}
          value={field.value}
          options={options}
          className={classNames({ 'p-invalid': isInvalid })}
        />
      </span>
      {/* TODO: Resolve type conflict for 'ref' prop */}
      {isInvalid && (
        <small id={`${id}-error`} className="p-error block">
          {meta.error}
        </small>
      )}
    </div>
  );
};
