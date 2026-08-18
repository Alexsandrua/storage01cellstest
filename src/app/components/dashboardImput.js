'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { actionWrite } from "../services/actions"
import { search } from "../services/search";

export default function DashboardImput() {

    const [form, setForm] = useState({ oneName: '', secondName: '' });

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    async function handleNameOne(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        await actionWrite({ match: e.target.value, label: e.target.name });
    }

    async function handNameSecond(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        actionWrite({ match: e.target.value, label: e.target.name });
    }

    async function handlePName(e) {
        setPassword(e.target.value);
        // actionWrite({ nameP: e.target.value });
    }

    async function handleSearch(e) {
        if (e.target.value.length > 2) {
            await search({ search: e.target.value });
        }
    }

    const handleSubmit = (e) => {
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
            <Button type="submit" variant="contained">Відправити</Button>
        </Box>

    );
}
