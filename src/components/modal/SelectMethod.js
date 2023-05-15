import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 106;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 12 + ITEM_PADDING_TOP,
      width: '',
    },
  },
};

const names = [
  'POST',
  'GET',
  'PUT',
  'DELETE',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder({handleSelectMethod}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    handleSelectMethod(value)
  };

  return (
    <div>
      <FormControl size="small" sx={{ width: "100%" }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          fontFamily= {"bold 14px/22px Poppins"}
          sx={{
            backgroundColor: "white",
            border: "1px solid #C7C7C1",
            color: "#7E8282",
            fontFamily: "bold 14px/22px Poppins",
            "&:hover .css-vd98qc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-vd98qc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-vd98qc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
              color: '#7E8282',
              border: "1px solid #D4D2CB",
              backgroundColor: "#EBE9E1"
            }
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {  
            if (selected.length === 0) {
              return <em style={{fontSize: '12px', padding: 0}}>Select Method</em>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Method</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
