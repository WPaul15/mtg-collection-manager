import { Form, Formik } from 'formik';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './App.css';
import { TextInput } from './components/form/CustomInputs';

PrimeReact.ripple = true;

interface Type {
  label: string;
  value: string;
}

function App() {
  const [types, setTypes] = useState<Type[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<Type>();
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([]);

  const creatureTypes: Type[] = [
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

  const groupedTypes = [{ label: 'Creature Types', items: creatureTypes }];

  useEffect(() => {
    setTypes(creatureTypes);
  }, []);

  const searchTypes = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredTypes;

      if (!event.query.trim().length) {
        _filteredTypes = [...types];
      } else {
        _filteredTypes = types.filter((type) => {
          return type.label.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredTypes(_filteredTypes);
    }, 250);
  };

  const searchGroupedTypes = (event: { query: string }) => {
    const _filteredTypes = [];

    for (const group of groupedTypes) {
      const filteredItems = group.items.filter(
        (item) => item.label.toLowerCase().indexOf(event.query.toLowerCase()) !== -1
      );

      if (filteredItems && filteredItems.length) {
        _filteredTypes.push({ ...group, ...{ items: filteredItems } });
      }
    }

    setFilteredTypes(_filteredTypes);
  };

  const groupedItemTemplate = (item: { label: string; items: Type[] }) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{item.label}</div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        cardName: '',
        oracleText: '',
        types: [],
      }}
      validationSchema={Yup.object({
        cardName: Yup.string(),
        oracleText: Yup.string(),
        types: Yup.array().of(
          Yup.object().shape({
            label: Yup.string(),
            value: Yup.string(),
          })
        ),
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

          <span className="field col-12 p-fluid w-full">
            <AutoComplete
              dropdown
              // multiple
              value={selectedType}
              suggestions={filteredTypes}
              completeMethod={searchTypes}
              field="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              optionGroupTemplate={groupedItemTemplate}
              onChange={(event) => setSelectedType(event.value)}
            />
          </span>
        </div>

        <Button type="submit" label="Submit" />
      </Form>
    </Formik>
  );
}

export default App;
