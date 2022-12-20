import { Wrapper, Input, Label } from 'components/Filter/Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/contacts/contactsSlice';
import { selectFilter } from 'redux/contacts/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const onFilterChange = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  return (
    <Wrapper>
      <Label htmlFor="text">Find contacts by name</Label>
      <Input
        type="text"
        name="filter"
        placeholder="Please find ..."
        value={filter}
        onChange={onFilterChange}
      />
    </Wrapper>
  );
};
