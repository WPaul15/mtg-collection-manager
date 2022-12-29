import { FieldHookConfig, useField } from 'formik';
import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';

interface AutoCompleteInputProps {
  label: string;
  columnWidth?: number;
}

export const AutoCompleteInput = ({
  label,
  columnWidth,
  ...props
}: AutoCompleteInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const id: string = props.id || props.name;
  const isInvalid = !!(meta.touched && meta.error);

  const creatureTypes = [
    { label: 'Advisor', value: 'Advisor' },
    { label: 'Aetherborn', value: 'Aetherborn' },
    { label: 'Alien', value: 'Alien' },
    { label: 'Ally', value: 'Ally' },
    { label: 'Angel', value: 'Angel' },
    { label: 'Antelope', value: 'Antelope' },
    { label: 'Ape', value: 'Ape' },
    { label: 'Archer', value: 'Archer' },
    { label: 'Archon', value: 'Archon' },
    { label: 'Army', value: 'Army' },
    { label: 'Artificer', value: 'Artificer' },
    { label: 'Assassin', value: 'Assassin' },
    { label: 'Assembly-Worker', value: 'Assembly-Worker' },
    { label: 'Astartes', value: 'Astartes' },
  ];

  const groups = [{ label: 'Creature Types', items: creatureTypes }];

  const groupedItemTemplate = (item: any) => {
    return (
      <div className="flex align-items-center">
        <div>{item.label}</div>
      </div>
    );
  };

  return (
    <div className={`field col-${columnWidth || 12} mb-4`}>
      <label htmlFor={id}>{label}</label>
      {/* TODO: Resolve type conflict for 'ref' prop */}
      <AutoComplete
        {...field}
        {...props}
        suggestions={groups}
        optionGroupLabel="label"
        optionGroupChildren="items"
        optionGroupTemplate={groupedItemTemplate}
        type="text"
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
