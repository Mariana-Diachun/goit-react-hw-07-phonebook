import { createSlice, isAnyOf, nanoid } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const extraActions = [fetchContacts, addContact, deleteContact];

const getActions = type => extraActions.map(action => action[type]);

const fetchContactSuccessReducer = (state, action) => {
  state.contacts = action.payload;
};

const addContactsSuccessReducer = (state, action) => {
  state.contacts.push({
    id: nanoid(),
    phone: action.payload.phone,
    name: action.payload.name,
  });
};

const deleteContactSuccessReducer = (state, action) => {
  state.contacts = state.contacts.find(
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

// extraReducers: {
//   [fetchContacts.pending](state) {
//     state.isLoading = true;
//   },
//   [fetchContacts.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.contacts = action.payload;
//   },
//   [fetchContacts.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   [addContact.pending](state) {
//     state.isLoading = true;
//   },
//   [addContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.contacts.push({
//       id: nanoid(),
//       number: action.payload.number,
//       name: action.payload.name,
//     });
//   },
//   [addContact.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   [deleteContact.pending](state) {
//     state.isLoading = true;
//   },
//   [deleteContact.fulfilled](state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.contacts = state.contacts.filter(
//       contact => contact.id !== action.payload.id
//     );
//   },
//   [deleteContact.rejected](state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
// },
