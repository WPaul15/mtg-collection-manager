import { FieldHookConfig, useField } from 'formik';
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

interface FormikTextAreaProps {
  label: string;
  columnWidth?: number;
}

export const FormikTextArea = ({
  label,
  columnWidth,
  ...props
}: FormikTextAreaProps & InputTextareaProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const id: string = props.id || props.name;
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={id}>{label}</label>
      {/* TODO: Resolve type conflict for 'ref' prop */}
      <InputTextarea
        {...field}
        {...props}
        rows={5}
        cols={30}
        autoResize
        className={classNames({ 'p-invalid': isInvalid }, 'w-full')}
      />
      {isInvalid && (
        <small id={`${id}-error`} className="p-error block">
          {meta.error}
        </small>
      )}
    </div>
  );
};
