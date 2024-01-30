import "./App.css";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { Kanazawa, Meld } from "@thirdweb-dev/chains";

import { InteractWithContract } from "./InteractWithContract";

function App() {
    return (
        <ThirdwebProvider
            activeChain={Kanazawa}
            supportedChains={[Meld, Kanazawa]}
            clientId="YOUR_CLIENT_ID"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                }}
            >
                <ConnectWallet />
            </Box>
            <Card sx={{ width: "500px" }}>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h5">Mint Your Token!</Typography>
                        <InteractWithContract />
                    </Stack>
                </CardContent>
            </Card>
        </ThirdwebProvider>
    );
}

export default App;
