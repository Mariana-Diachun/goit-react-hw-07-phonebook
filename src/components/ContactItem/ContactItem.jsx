import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/operations';

import { Contact, Button } from 'components/ContactItem/ContactItem.styled';

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  return (
    <Contact id={id}>
      {name} : {phone}
      <Contact />
      <Button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </Button>
    </Contact>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
