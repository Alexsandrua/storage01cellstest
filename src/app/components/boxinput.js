'use client';

import { Box, TextField } from "@mui/material"
import { actionWrite } from "../services/actions"
import { search } from "../services/search";
import tempFild from "../resurce/tempFild";

export default function FormPropsTextFields() {

    async function handleNameOne(e) {
        if (e.target.value.length > 2) {
            tempFild.fild['nameOne'] = e.target.value
            await actionWrite(tempFild.fild);
        } else {
            delete tempFild.fild.nameOne;
            await actionWrite(tempFild.fild);
        }
    }

    async function handNameTwo(e) {
        if (e.target.value.length > 2) {
            tempFild.fild['nameTwo'] = e.target.value
            actionWrite(tempFild.fild);
        } else {
            delete tempFild.fild.nameTwo;
            await actionWrite(tempFild.fild);
        }
    }

    async function handlePName(e) {
        if (e.target.value.length > 2) {
            tempFild.fild['nameP'] = e.target.value
            actionWrite(tempFild.fild);
        } else {
            delete tempFild.fild.nameP;
            await actionWrite(tempFild.fild);
        }
    }

    async function handleSearch(e) {
        if (e.target.value.length > 2) {
            await search({ search: e.target.value });
        }
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
