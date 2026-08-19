'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment, Stack } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { actionWrite } from "../services/actions"
import { search } from "../services/search";

export default function DashboardImput() {

    const [form, setForm] = useState({ oneName: '', secondName: '', password: '' });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [open, setOpen] = useState(true);
    const [create, setCreate] = useState(true);
    const [isNameExists, setIsNameExists] = useState(false);
    const [error, setError] = useState('');

    async function handleNameOne(e) {
        setOpen(false);
        setForm({ ...form, [e.target.name]: e.target.value });
        await actionWrite({ match: e.target.value, label: e.target.name });
    }

    async function handNameSecond(e) {
        setCreate(false)
        setForm({ ...form, [e.target.name]: e.target.value });
        actionWrite({ match: e.target.value, label: e.target.name });
    }

    async function handlePName(e) {
        setPassword(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSearch(e) {
        if (e.target.value.length > 2) {
            await search({ search: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        setIsNameExists(true);
        e.preventDefault();
        console.log('Зібрані дані:', form);
    };

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
                    name="oneName"
                    value={form.oneName}
                    error={isNameExists}
                    helperText={isNameExists ? "Цей іʼмя вже існує" : ""}
                    onChange={handleNameOne}
                />
                <TextField
                    id="outlined-required"
                    label="Друге ім'я комірки"
                    name="secondName"
                    value={form.secondName}
                    onChange={handNameSecond}
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

        </Box >

    );
}
