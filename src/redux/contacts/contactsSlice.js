import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteCard,
} from 'redux/contacts/operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const allCases = [fetchContacts, addContact, deleteCard];
const getAllCases = type => allCases.map(allCase => allCase[type]);

const fetchSuccessReducer = (state, action) => {
  state.items = action.payload;
};

const addSuccessReducer = (state, action) => {
  state.items.push(action.payload);
};

const deleteSuccessReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const anyPendingReducer = state => {
  state.isLoading = true;
};

const anyFulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};
const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, fetchSuccessReducer)
      .addCase(addContact.fulfilled, addSuccessReducer)
      .addCase(deleteCard.fulfilled, deleteSuccessReducer)
      .addMatcher(isAnyOf(...getAllCases('pending')), anyPendingReducer)
      .addMatcher(isAnyOf(...getAllCases('fulfilled')), anyFulfilledReducer)
      .addMatcher(isAnyOf(...getAllCases('rejected')), anyRejectedReducer);
  },
});
export const { updateFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     updateFilter(state, action) {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [addContact.pending]: handlePending,
//     [deleteCard.pending]: handlePending,
//     [fetchContacts.rejected]: handleRejected,
//     [addContact.rejected]: handleRejected,
//     [deleteCard.rejected]: handleRejected,
//     [fetchContacts.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = payload;
//     },
//     [addContact.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = [...state.items, payload];
//     },
//     [deleteCard.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.error = null;
//       const index = state.items.findIndex(contact => contact.id === payload);
//       state.items.splice(index, 1);
//     },
//   },
// });

// export const { updateFilter } = contactsSlice.actions;

// export const contactsReducer = contactsSlice.reducer;
