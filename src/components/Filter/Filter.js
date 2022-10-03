import { PropTypes } from 'prop-types';
import { Wrapper, Input, Label } from 'components/Filter/Filter.styled';

export const Filter = ({ value, onFilterChange }) => {
  return (
    <Wrapper>
      <Label htmlFor="text">Find contacts by name</Label>
      <Input
        type="text"
        name="filter"
        placeholder="Please find ..."
        value={value}
        onChange={onFilterChange}
      />
    </Wrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
