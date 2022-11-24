import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { searchByName } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

import { Box, Label, InputSearch } from 'components/Filter/Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
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
