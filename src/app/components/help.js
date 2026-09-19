import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function RulesKomirka() {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2, 
        border: '1px solid',
        borderColor: 'info.light',
        bgcolor: 'info.lighter', // або 'rgba(2, 136, 209, 0.04)' якщо lighter не налаштований у темі
      }}
    >
      {/* Заголовок блоку з іконкою інформації */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, color: 'info.main' }}>
        <InfoOutlinedIcon />
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          Правила використання комірок:
        </Typography>
      </Box>

      {/* Список правил */}
      <List disablePadding>
        {[
          <>Комірка, створена з першим ім’ям, буде доступна <strong>тільки для читання</strong>.</>,
          <>Комірка, створена з двох імен, <strong>може редагуватися</strong> та мати пароль.</>,
          <>Для редагування необхідно <strong>вводити обидва імені</strong>. Для читання потрібно ввести <strong>тільки друге ім’я</strong> та натиснути кнопку <em>«Відкрити»</em>. Якщо комірка захищена паролем, необхідно ввести також і пароль.</>,
          <>Комірки зберігаються <strong>протягом 3 годин</strong>.</>
        ].map((text, index) => (
          <ListItem 
            key={index} 
            disableGutters 
            sx={{ alignItems: 'flex-start', py: 0.75 }}
          >
            <ListItemIcon sx={{ minWidth: 24, mt: 0.75, color: 'text.secondary' }}>
              {/* Маленька крапка для маркованого списку в стилі Material */}
              <FiberManualRecordIcon sx={{ fontSize: 8 }} />
            </ListItemIcon>
            <ListItemText 
              primary={text} 
              primaryTypographyProps={{ 
                variant: 'body2', 
                color: 'text.primary',
                sx: { lineHeight: 1.6 } 
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
