import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import schema from 'validation/validation';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contactsSlice';
import {
  MainTitle,
  Input,
  FormWrap,
  Label,
  Button,
  Alert,
} from 'components/ContactForm/ContactForm.styled';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const nameID = nanoid();
  const numberID = nanoid();

  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const hasContact = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (hasContact)
      return Notiflix.Notify.failure(`${values.name} is already in contacts`);

    dispatch(addContact(values));

    resetForm({ name: '', number: '' });
  };

  return (
    <header>
      <section>
        <MainTitle>Phonebook</MainTitle>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <FormWrap autoComplete="off">
            <Label htmlFor={nameID}>
              Name
              <Input type="text" name="name" id={nameID} />
            </Label>
            <Alert name="name" compononet="span" />
            <Label htmlFor={numberID}>
              Number
              <Input type="tel" name="number" id={numberID} />
            </Label>
            <Alert name="number" compononet="span" />
            <Button type="submit">Add contact</Button>
          </FormWrap>
        </Formik>
      </section>
    </header>
  );
};
