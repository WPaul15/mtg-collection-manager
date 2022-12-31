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
import CreatureSymbol from './assets/creature-symbol.svg';
import { AutoCompleteInput, TextInput } from './components/form/CustomInputs';

PrimeReact.ripple = true;

interface Type {
  label: string;
}

interface TypeGroup {
  label: string;
  icon: string;
  items: Type[];
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
      }}
      validationSchema={Yup.object({
        cardName: Yup.string(),
        oracleText: Yup.string(),
        cardTypes: Yup.array()
          .of(
            Yup.object().shape({
              label: Yup.string(),
              value: Yup.string(),
            })
          )
          .required('required'),
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
          <TextInput label="Card Name" name="cardName" />
          <TextInput label="Oracle Text" name="oracleText" />
          <AutoCompleteInput
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
        </div>

        <Button type="submit" label="Submit" />
      </Form>
    </Formik>
  );
}

export default App;
