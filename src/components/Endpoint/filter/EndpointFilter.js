import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 176,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      '0px 3px 6px #121B234D',
    '& .MuiMenu-list': {
      padding: '§px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 28,
        // marginRight: theme.spacing(0),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [method, setMethod] = React.useState(false)
  const open = Boolean(method);
  const handleClick = (event) => {
    setMethod((prev) => !prev)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [checked, setChecked] = React.useState([false, false, false, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChange2 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };

  function handleSelectAll(){
    setChecked([true, true, true, true]);
  }

  function handleClearAll() {
  setChecked([false, false, false, false]);
  }

  return (
    <div>
         <Button
                  sx={{
                    ":hover": {
                      bgcolor: method ? `#FC574E`:`#EBE9E1`,
                      color: method ? `#FBFBF9`:`#7E8282`,
                    },
                    textTransform: 'none',
                    backgroundColor: method ? `#FC574E` : `#F4F3EE`,
                    color: method ? `#FBFBF9` : `#7E8282`,
                    px: 2,
                  }}
                  variant="text"
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  disableElevation
                  onClick={handleClick}
                >
                  Method
                </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setMethod(!method)}
      >
        <MenuItem>
        <FormControlLabel
        label="Post"
        sx={{width: "100%"}}
        control={<Checkbox 
          sx={{
            color: "#C7C7C1",
            '&.Mui-checked': {
              color: "#FC574E",
            },
          }}  
          checked={checked[0]} onChange={handleChange1} />}
      />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
        label="Get"
        sx={{width: "100%"}}
        control={<Checkbox 
          sx={{
            color: "#C7C7C1",
            '&.Mui-checked': {
              color: "#FC574E",
            },
          }}  
          checked={checked[1]} onChange={handleChange2} />}
      />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
        label="Put"
        sx={{width: "100%"}}
        control={<Checkbox 
          sx={{
            color: "#C7C7C1",
            '&.Mui-checked': {
              color: "#FC574E",
            },
          }}  
          checked={checked[2]} onChange={handleChange3} />}
      />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
        label="Delete"
        sx={{width: "100%"}}
        control={<Checkbox 
          sx={{
            color: "#C7C7C1",
            '&.Mui-checked': {
              color: "#FC574E",
            },
          }}  
          checked={checked[3]} onChange={handleChange4} />}
      />
        </MenuItem>
        <Divider sx={{ my: 0, mx: 1.5 }} />
        <Box display="flex" justifyContent="end">
        <Button
                    onClick={() => handleSelectAll()}
                    style={{ backgroundColor: "transparent" }}
                    sx={{
                      textTransform: "none",
                      color: "#A3A4A2",
                      fontSize: 12,
                      animationTimeline: 5000,
                      "&:hover": {
                        opacity: 1,
                        color: "#FC574E",
                      },
                      p: 0
                    }}
                  >
                    ALL
                  </Button>
                  <Button
                    onClick={() => handleClearAll()}
                    style={{ backgroundColor: "transparent" }}
                    sx={{
                      textTransform: "none",
                      color: "#A3A4A2",
                      fontSize: 12,
                      animationTimeline: 5000,
                      "&:hover": {
                        opacity: 1,
                        color: "#FC574E",
                      },
                      p: 0
                    }}
                  >
                    NONE
                  </Button>
                  </Box>
      </StyledMenu>
    </div>
  );
}