import { useSelector } from 'react-redux';

import { selectContacts, selectFilter } from 'redux/selectors';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from 'components/ContactList/ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredContacts) {
    return (
      <List>
        {filteredContacts.map(contact => {
          return <ContactItem key={contact.id} {...contact} />;
        })}
      </List>
    );
  }
};
