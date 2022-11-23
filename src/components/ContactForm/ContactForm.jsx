import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import schema from 'validation/validation';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

import {
  MainTitle,
  Input,
  FormWrap,
  Label,
  Button,
  Alert,
} from 'components/ContactForm/ContactForm.styled';

export const ContactForm = () => {
  const nameId = nanoid();
  const phoneId = nanoid();

  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);

  const handleSubmit = ({ name, phone }, { resetForm }) => {
    const hasContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasContact)
      return Notiflix.Notify.failure(`${name} is already in contacts`);

    dispatch(addContact({ name, phone }));
    resetForm();
  };

  return (
    <header>
      <section>
        <MainTitle>Phonebook</MainTitle>
        <Formik
          initialValues={{ name: '', phone: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <FormWrap autoComplete="off">
            <Label htmlFor={nameId}>
              Name
              <Input type="text" name="name" id={nameId} />
            </Label>
            <Alert name="name" compononet="span" />
            <Label htmlFor={phoneId}>
              Phone number
              <Input type="tel" name="phone" id={phoneId} />
            </Label>
            <Alert name="phone" compononet="span" />
            <Button type="submit">Add contact</Button>
          </FormWrap>
        </Formik>
      </section>
    </header>
  );
};
