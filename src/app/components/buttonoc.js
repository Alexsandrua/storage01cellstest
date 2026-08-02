'use client';

import { Stack, Button } from "@mui/material";

export default function ButtOpenCreate() {
    return (
        <Stack direction="row" spacing={6} size="Large">
            <Button loading  loadingPosition="start" variant="contained" color="success">
                Create
            </Button>
            <Button loading  loadingPosition="start" variant="contained" color="success">
                Open
            </Button>
        </Stack>
    );
}
