'use client';

import { Box, TextField } from "@mui/material"
import { actionNameOne } from "../services/actions"

export default function FormPropsTextFields(reg) {

    const registration = async (nameONE) => {  
        if (!reg.regToken) {
            const id_reg = `id_${nameONE}_${new Date().getTime()}`;
            try {
                const response = await fetch("/api/reg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "aplication/json",
                    },
                    body: JSON.stringify({ reg: id_reg }),
                });
            } catch (error) {
                console.error(error);
            }
        } else return;
    }

    function handleNameOne(e) {
        if (e.target.value.length > 2) {
            registration(e.target.value);
            actionNameOne({nameOne: e.target.value, reg});
        }
    }

    function handNameTwo(e) {
        if (e.target.value.length > 2)
        actionNameOne({nameTwo: e.target.value, reg});
    }

    function handlePName(e) {
        if (e.target.value.length > 7)
            actionNameOne({nameP: e.target.value, reg});
    }

    function handleSearch(e) {
        if (e.target.value.length > 2)
            actionNameOne({search: e.target.value, reg});
    }

    return (

        <Box
            className="bg-primary-main"
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField

                    required
                    id="outlined-required"
                    label="Редегувати"
                    defaultValue="Ім'я комірки"
                    onChange={handleNameOne}
                />
                <TextField
                    id="outlined-required"
                    label="Подивитись"
                    defaultValue="Друге ім'я комірки"
                    onChange={handNameTwo}
                />
            </div>
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlePName}
                />
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    onChange={handleSearch}
                />
            </div>
        </Box>

    );
}
