'use client';

import { Fragment, useState } from "react";
import { DialogTitle, Button, Dialog, DialogActions, DialogContent, TextareaAutosize } from "@mui/material"
import { actionSeve } from "../services/saveleter";

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


export default function PopupWithTextarea({ open, onClose, text, isReadOnly, setCreate, setOpen }) {

    const [form, setForm] = useState({ leter: '' });


    const saveKomirka = async () => {
        await actionSeve(form);
        setCreate(true);
        setOpen(false);
        onClose();
        setForm({ ...form, 'leter': '' });
    };

    const handleClose = () => {
        return onClose();
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
                        value={form.leter || text}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        readOnly={isReadOnly}
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
