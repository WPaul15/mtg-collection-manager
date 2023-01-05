import { FieldHookConfig, useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

interface FormikTextProps {
  label: string;
  columnWidth?: number;
}

export const FormikText = ({ label, columnWidth, ...props }: FormikTextProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const id: string = props.id || props.name;
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={id}>{label}</label>
      {/* TODO: Resolve type conflict for 'ref' prop */}
      <InputText {...field} {...props} type="text" className={classNames({ 'p-invalid': isInvalid }, 'w-full')} />
      {isInvalid && (
        <small id={`${id}-error`} className="p-error block">
          {meta.error}
        </small>
      )}
    </div>
  );
};
