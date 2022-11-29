import { Wrapper, Input, Label } from 'components/Filter/Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/contactsSlice';
import { getStatusFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getStatusFilter);

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
