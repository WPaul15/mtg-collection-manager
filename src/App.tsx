import { Form, Formik } from 'formik';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './App.css';
import ArtifactSymbol from './assets/artifact-symbol.svg';
import BlackManaSymbol from './assets/black-mana-symbol.svg';
import BlueManaSymbol from './assets/blue-mana-symbol.svg';
import ColorlessManaSymbol from './assets/colorless-mana-symbol.svg';
import CreatureSymbol from './assets/creature-symbol.svg';
import GreenManaSymbol from './assets/green-mana-symbol.svg';
import RedManaSymbol from './assets/red-mana-symbol.svg';
import WhiteManaSymbol from './assets/white-mana-symbol.svg';
import { FormikAutoComplete, FormikCheckbox, FormikDropdown, FormikText } from './components/form/FormikInputs';
import { Dropdown } from 'primereact/dropdown';
import { SelectItem } from 'primereact/selectitem';

PrimeReact.ripple = true;

interface Type {
  label: string;
}

interface TypeGroup {
  label: string;
  icon: string;
  items: Type[];
}

interface ColorCheckboxOption {
  label: string;
  key: Color;
  icon?: string;
}

enum Color {
  WHITE = 'W',
  BLUE = 'U',
  BLACK = 'B',
  RED = 'R',
  GREEN = 'G',
  COLORLESS = 'C',
}

function App() {
  const [types, setTypes] = useState<TypeGroup[]>([]);

  const cardTypes: TypeGroup[] = [
    {
      label: 'Creature Types',
      icon: CreatureSymbol,
      items: [
        { label: 'Advisor' },
        { label: 'Aetherborn' },
        { label: 'Alien' },
        { label: 'Ally' },
        { label: 'Angel' },
        { label: 'Antelope' },
        { label: 'Ape' },
        { label: 'Archer' },
        { label: 'Archon' },
        { label: 'Army' },
        { label: 'Artificer' },
        { label: 'Assassin' },
        { label: 'Assembly-Worker' },
        { label: 'Astartes' },
      ],
    },
    {
      label: 'Artifact Types',
      icon: ArtifactSymbol,
      items: [{ label: 'Equipment' }, { label: 'Vehicle' }],
    },
  ];

  const colorOptions: ColorCheckboxOption[] = [
    { label: 'White', key: Color.WHITE, icon: WhiteManaSymbol },
    { label: 'Blue', key: Color.BLUE, icon: BlueManaSymbol },
    { label: 'Black', key: Color.BLACK, icon: BlackManaSymbol },
    { label: 'Red', key: Color.RED, icon: RedManaSymbol },
    { label: 'Green', key: Color.GREEN, icon: GreenManaSymbol },
    { label: 'Colorless', key: Color.COLORLESS, icon: ColorlessManaSymbol },
  ];

  const formatOptions: string[] = ['Standard', 'Historic', 'Modern', 'Commander', 'Brawl'];

  useEffect(() => {
    setTypes(cardTypes);
  }, []);

  const groupedItemTemplate = (item: TypeGroup) => {
    return (
      <div className="flex align-items-center">
        <img src={item.icon} alt="" className="w-1rem mr-2" />
        <div>{item.label}</div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        cardName: '',
        oracleText: '',
        cardTypes: new Array<Type>(),
        colors: new Array<Color>(),
        format: '',
      }}
      validationSchema={Yup.object({
        cardName: Yup.string(),
        oracleText: Yup.string(),
        cardTypes: Yup.array().of(
          Yup.object().shape({
            label: Yup.string(),
            value: Yup.string(),
          })
        ),
        colors: Yup.array(Yup.mixed<Color>().oneOf(Object.values(Color))),
        format: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <div className="formgrid grid">
          <FormikText label="Card Name" name="cardName" />
          <FormikText label="Oracle Text" name="oracleText" />
          <FormikAutoComplete
            label="Card Types"
            name="cardTypes"
            dropdown
            multiple
            data={types}
            field="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={groupedItemTemplate}
          />
          <FormikCheckbox label="Colors" name="colors" options={colorOptions} />
          <FormikDropdown
            label="Format"
            name="format"
            options={formatOptions}
            filter
            showFilterClear
            filterMatchMode="startsWith"
          />
        </div>

        <Button type="submit" label="Submit" />
      </Form>
    </Formik>
  );
}

export default App;
