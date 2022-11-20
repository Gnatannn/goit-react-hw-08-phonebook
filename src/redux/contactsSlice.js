import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteCard } from './operations';

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
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchSuccessReducer)
      .addCase(addContact.fulfilled, addSuccessReducer)
      .addCase(deleteCard.fulfilled, deleteSuccessReducer)
      .addMatcher(isAnyOf(...getAllCases('pending')), anyPendingReducer)
      .addMatcher(isAnyOf(...getAllCases('fulfilled')), anyFulfilledReducer)
      .addMatcher(isAnyOf(...getAllCases('rejected')), anyRejectedReducer),
});
export const { updateFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
