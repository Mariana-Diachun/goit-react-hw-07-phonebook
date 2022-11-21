import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { searchByName } from 'redux/contactsSlice';
import { Box, Label, InputSearch } from 'components/Filter/Filter.styled';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const inputID = nanoid();

  return (
    <Box>
      <Label htmlFor={inputID}>
        Find contacts by name:
        <InputSearch
          id={inputID}
          type="text"
          value={filter}
          name="filter"
          onChange={e => dispatch(searchByName(e.target.value))}
        />
      </Label>
    </Box>
  );
};
