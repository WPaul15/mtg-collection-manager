import { FieldHookConfig, useField } from 'formik';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { useState } from 'react';

interface CheckboxInputProps {
  label: string;
  options: CheckboxOption[];
  columnWidth?: number;
}

export interface CheckboxOption {
  label: string;
  key: string;
  icon?: string;
}

export const CheckboxInput = ({
  label,
  options,
  columnWidth,
  ...props
}: CheckboxInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const id: string = props.id || props.name;
  const groupId = `${id}-checkbox-group`;
  const isInvalid = !!(meta.touched && meta.error);

  const onSelectionChange = (event: { value: string; checked: boolean }) => {
    const _selectedOptions = [...selectedOptions];

    if (event.checked) {
      _selectedOptions.push(event.value);
    } else {
      for (let i = 0; i < _selectedOptions.length; i++) {
        const selected = _selectedOptions[i];

        if (selected === event.value) {
          _selectedOptions.splice(i, 1);
          break;
        }
      }
    }

    setSelectedOptions(_selectedOptions);
  };

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={groupId}>{label}</label>
      <div id={groupId} className="formgroup-inline">
        {options.map((option) => {
          return (
            <div key={option.key} className="field-checkbox">
              {/* TODO: Resolve type conflict for 'ref' prop */}
              <Checkbox
                {...field}
                {...props}
                inputId={option.key}
                name={id}
                value={option.key}
                onChange={(event) => {
                  onSelectionChange({ value: event.value, checked: event.checked });
                  field.onChange(event);
                }}
                checked={selectedOptions.some((item) => item === option.key)}
                className={classNames({ 'p-invalid': isInvalid })}
              />
              <label htmlFor={option.key} className="p-checkbox-label">
                {option.icon && (
                  <img src={option.icon} alt="" className="w-1rem mr-2  vertical-align-middle" aria-hidden />
                )}
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {isInvalid && (
        <small id={`${id}-error`} className="p-error block">
          {meta.error}
        </small>
      )}
    </div>
  );
};
