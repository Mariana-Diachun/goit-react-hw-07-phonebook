import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import { Layout } from 'components/Layout/Layout';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <ContactForm />
      {isLoading && !error && <Loader />}
      <Filter />
      <ContactList />
    </Layout>
  );
};
