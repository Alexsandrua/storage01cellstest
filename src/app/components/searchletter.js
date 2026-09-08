'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader'
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { openLater } from '../services/openleter';

export default function SearchLetter({ names, setIsReadOnly, setIsPopupOpen, setOpenLaterText }) {

  const handleOpen = async (e) => {

    const result = await openLater({[e.currentTarget.name]:e.currentTarget.value});
    setIsReadOnly(true);
    setIsPopupOpen(true);
    //e.preventDefault();
    setOpenLaterText(result && result['leter']);
  }
  const mapNames = () => {
    if (Array.isArray(names.value)) {
      return names.value.map((value, i) => {
        let name = '';
        let type = '';
        if (value.oneName) { name = value.oneName; type = 'oneName' }
        if (value.secondName) { name = value.secondName; type = 'secondName' }
        return (
          <ListItem
            key={`${name}${i}`}
            primary="Build"
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <Link
              component="button"
              type="button"
              variant="body2"
              name={type}
              value={name}
              onClick={handleOpen}
            >
              <ListItemText primary={`\u00A0\u00A0\u00A0Комірка \u00A0${i}:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0  ${names.search}`} />
            </Link>

          </ListItem>
        )
      })
    } else return '';
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Список знайдених комірок:
        </ListSubheader>
      }>
      {mapNames()}
    </List>
  );
}
