/* eslint-disable react/prop-types */
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { theme } from '../theme.js';
import { ThemeProvider } from '@emotion/react';

export default function DropDown({randomPaths}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
    <List
      sx={{ width: '80%', maxWidth: 360, marginLeft: '5px', bgcolor: '212121', color: 'FFFFFF'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

      <ListItemButton onClick={handleClick}>
      <ListItemText primary="Otros Paths: " primaryTypographyProps={{ fontWeight: 'bold', fontSize: '20px' }} />
        {open ? <ExpandLess sx={{ fontSize: 35 }} /> : <ExpandMore sx={{ fontSize: 35 }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {randomPaths.map((pathName) => (
            <ListItemButton key = {pathName} sx={{ pl: '18px' }}>
              <ListItemText primary={pathName} primaryTypographyProps={{ fontSize: '18px' }}/>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
    </ThemeProvider>
  );
}