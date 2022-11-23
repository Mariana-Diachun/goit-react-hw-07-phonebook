import { deleteContact } from 'redux/operations';
import { Contact, Button } from 'components/ContactItem/ContactItem.styled';
import { useDispatch } from 'react-redux';

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  return (
    <Contact id={id}>
      {name} : {phone}
      <Contact />
      <Button type="button" onClick={() => dispatch(deleteContact({ id }))}>
        Delete
      </Button>
    </Contact>
  );
};
