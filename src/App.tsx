import { Form, Formik } from 'formik';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import * as Yup from 'yup';
import './App.css';
import { TextInput } from './components/form/CustomInputs';

PrimeReact.ripple = true;

function App() {
  return (
    <Formik
      initialValues={{
        cardName: '',
        oracleText: '',
      }}
      validationSchema={Yup.object({
        cardName: Yup.string(),
        oracleText: Yup.string(),
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
        </div>

        <Button type="submit" label="Submit" />
      </Form>
    </Formik>
  );
}

export default App;
