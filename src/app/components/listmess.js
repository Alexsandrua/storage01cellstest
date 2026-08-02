'use client';

import { List, ListItem, ListItemText, CommentIcon, IconButton } from "@mui/material";


export default function ListMess() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}