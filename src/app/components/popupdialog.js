'use client';

import * as React from 'react';
import { DialogTitle, Button, Dialog, DialogActions, DialogContent, TextareaAutosize } from "@mui/material"

// Ваш компонент текстового поля (трохи адаптований за стилями)
function MinHeightTextarea() {
    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Введіть ваш текст тут..."
            style={{
                width: '100%',
                height: '100%',        // Щоб розтягувався на всю ширину вікна
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '4px',
                borderColor: '#ccc',
                fontFamily: 'Roboto, sans-serif'
            }}
        />
    );
}

// Головний компонент з Popup вікном
export default function PopupWithTextarea({ open, onClose }) {

    // Функції для відкриття та закриття
    const saveKomirka = () => {
         onClose();
    };

    const handleClose = () => {
        return onClose()
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}      // Дозволяє вікну адаптуватися під розмір
                maxWidth="sm"         // Встановлює максимальну ширину (small)
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">
                    Заголовок вікна
                </DialogTitle>

                <DialogContent dividers>
                    {/* Вставляємо ваш компонент сюди */}
                    <MinHeightTextarea />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Скасувати
                    </Button>
                    <Button onClick={saveKomirka} variant="contained" color="primary">
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
