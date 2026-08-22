'use client';

import { Fragment, useState } from "react";
//import  React { useState, Fragment} from 'react';
import { DialogTitle, Button, Dialog, DialogActions, DialogContent, TextareaAutosize } from "@mui/material"

// Ваш компонент текстового поля (трохи адаптований за стилями)
function LeterPopup({ ...props }) {
    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Введіть текст вашиго повідомлення..."
            style={{
                width: '100%',
                height: '100%',        // Щоб розтягувався на всю ширину вікна
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '4px',
                borderColor: '#ccc',
                fontFamily: 'Roboto, sans-serif',
            }}
            {...props}
        />
    );
}

// Головний компонент з Popup вікном
export default function PopupWithTextarea({ open, onClose }) {

    const [form, setForm] = useState({ leter: '' });

    // Функції для відкриття та закриття
    const saveKomirka = () => {
        onClose();
        console.log('FROM ', form)
    };

    const handleClose = () => {
        return onClose()
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                component="form"
                fullWidth={true}      // Дозволяє вікну адаптуватися під розмір
                maxWidth="sm"         // Встановлює максимальну ширину (small)
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">
                    Заголовок вікна
                </DialogTitle>

                <DialogContent dividers>
                    {/* Вставляємо ваш компонент сюди */}
                    <LeterPopup
                        name="leter"
                        value={form.leter}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
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
        </Fragment>
    );
}
