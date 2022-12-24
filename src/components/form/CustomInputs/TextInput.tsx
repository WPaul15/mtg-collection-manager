import { FieldHookConfig, useField } from 'formik';
import { ClassAttributes, InputHTMLAttributes } from 'react';

interface TextInputProps {
  label: string;
}

export const TextInput = ({
  label,
  ...props
}: TextInputProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} type="text" />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
