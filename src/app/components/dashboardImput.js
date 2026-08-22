'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment, Stack } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { actionWrite } from "../services/actions"
import { search } from "../services/search";
import { actionCreate } from '../services/create';
import PopupWithTextarea from './popupdialog'

export default function DashboardImput() {

    const [form, setForm] = useState({ oneName: '', secondName: '', password: '' });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [open, setOpen] = useState(true);
    const [create, setCreate] = useState(true);

    const [isNameOneExists, setIsNameOneExists] = useState(false);
    const [isNameSecondExists, setIsNameSecondExists] = useState(false);

    const [error, setError] = useState('');

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    async function handleNameOne(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        const res = await actionWrite({
            match: e.target.value,
            typName: e.target.name,
            form,
        });

        if (res.lengthLine) {
            setCreate(res.create);
            setOpen(res.open);
            setIsNameOneExists(res.open);
        }

    }

    async function handNameSecond(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        const res = await actionWrite({
            match: e.target.value,
            typName: e.target.name,
            form,
        });
        if (res.lengthLine) {
            setCreate(res.create);
            setOpen(res.open);
            setIsNameOneExists(res.open);
        }

    }

    async function handlePName(e) {
        setPassword(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSearch(e) {
        await search({ search: e.target.value });
    }

    const handleSubmit = async (e) => {
        setIsPopupOpen(true);
        e.preventDefault();
        await actionCreate(form);
    };

    const handleClose = () => setIsPopupOpen(false);

    return (

        <Box
            className="bg-primary-main"
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField

                    required
                    id="outlined-required"
                    label="Ім'я комірки"
                    onChange={handleNameOne}
                    name="oneName"
                    value={form.oneName}
                    error={isNameOneExists}
                    helperText={isNameOneExists ? "Цей іʼмя вже існує" : ""}
                />
                <TextField
                    id="outlined-required"
                    label="Друге ім'я комірки"
                    onChange={handNameSecond}
                    name="secondName"
                    value={form.secondName}
                    error={isNameSecondExists}
                    helperText={isNameSecondExists ? "Цей іʼмя вже існує" : ""}
                />
            </div>
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Пароль"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    autoComplete="current-password"
                    onChange={handlePName}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    onChange={handleSearch}
                />
            </div>
            <Stack
                direction="row"
                spacing={6}
                size="Large"
                sx={{
                    ml: '5px',
                    mt: 3,
                    width: '100%'
                }}
            >
                <Button
                    loadingPosition="start"
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={open}
                >
                    Створити
                </Button>
                <Button
                    loadingPosition="start"
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={create}
                >
                    Відкрити
                </Button>
            </Stack>
            < PopupWithTextarea open={isPopupOpen} onClose={handleClose} />
        </Box >

    );
}
