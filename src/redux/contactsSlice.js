import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push({
        id: nanoid(),
        number: action.payload.number,
        name: action.payload.name,
      });
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
    },
    searchByName(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, searchByName } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
