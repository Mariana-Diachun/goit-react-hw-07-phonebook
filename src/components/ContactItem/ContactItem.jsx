import { deleteContact } from 'redux/contactsSlice';
import { Contact, Button } from 'components/ContactItem/ContactItem.styled';
import { useDispatch } from 'react-redux';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <Contact id={id}>
      {name} : {number}
      <Button type="button" onClick={() => dispatch(deleteContact({ id }))}>
        Delete
      </Button>
    </Contact>
  );
};
