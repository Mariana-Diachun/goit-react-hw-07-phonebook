import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './operations';

const extraActions = [fetchContacts, addContact, deleteContact];

const getActions = type => extraActions.map(action => action[type]);

const fetchContactSuccessReducer = (state, action) => {
  state.contacts = action.payload;
};

const addContactsSuccessReducer = (state, action) => {
  state.contacts.push({
    id: action.payload.id,
    phone: action.payload.phone,
    name: action.payload.name,
  });
};

const deleteContactSuccessReducer = (state, action) => {
  state.contacts = state.contacts.filter(
    contact => contact.id !== action.payload.id
  );
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactSuccessReducer)
      .addCase(addContact.fulfilled, addContactsSuccessReducer)
      .addCase(deleteContact.fulfilled, deleteContactSuccessReducer)
      .addMatcher(isAnyOf(...getActions('pending')), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...getActions('rejected')), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isAnyOf(...getActions('fulfilled')), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const contactsReducer = contactsSlice.reducer;
