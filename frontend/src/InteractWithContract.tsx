import { Box, Stack, TextField, Typography } from "@mui/material";
import {
    ContractEvent,
    Web3Button,
    toWei,
    useContract,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import MintableERC20 from "./MintableERC20.json";
import { ethers } from "ethers";

export const InteractWithContract = () => {
    const { contract, refetch } = useContract(
        "YOUR_DEPLOYED_CONTRACT_ADDRESS",
        MintableERC20.abi
    );

    const [contractData, setContractData] = useState({
        totalSupply: "",
        maxSupply: "",
        events: [] as ContractEvent<Record<string, any>>[],
    });

    const [amountToMint, setAmountToMint] = useState(0);

    useEffect(() => {
        async function getContractData() {
            if (contract) {
                const totalSupply = await contract.call("totalSupply");
                const maxSupply = await contract.call("MAX_TO_MINT");

                const events = (await contract.events.getAllEvents()).filter(
                    (event) => {
                        return event.eventName === "PurchaseOccurred";
                    }
                );

                setContractData({
                    totalSupply: ethers.utils.formatEther(
                        totalSupply.toString()
                    ),
                    maxSupply: ethers.utils.formatEther(maxSupply.toString()),
                    events: events,
                });
            }
        }
        getContractData();
    }, [contract]);

    return (
        <div>
            {contract && (
                <Stack spacing={1}>
                    <Typography variant="h6">
                        Total Supply: {contractData.totalSupply} /{" "}
                        {contractData.maxSupply}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Enter Amount to Mint"
                            variant="outlined"
                            type="number"
                            onChange={(e) => {
                                setAmountToMint(parseInt(e.target.value));
                            }}
                        />
                        <Web3Button
                            contractAddress="YOUR_DEPLOYED_CONTRACT_ADDRESS"
                            contractAbi={MintableERC20.abi}
                            action={async (mintContract) => {
                                const receipt = await mintContract.call(
                                    "purchaseMint",
                                    [],
                                    {
                                        value: toWei(amountToMint.toString()),
                                    }
                                );
                                refetch();
                                return receipt;
                            }}
                        >
                            Mint
                        </Web3Button>
                    </Box>
                    <Typography variant="h6">Events</Typography>
                    {contractData.events.map((event) => {
                        return (
                            <Stack>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        Minter
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Amount
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                    key={event.transaction.transactionHash}
                                >
                                    <Typography variant="subtitle1">
                                        {event.data.minter.slice(0, 6)}...
                                        {event.data.minter.slice(-4)}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {ethers.utils.formatEther(
                                            event.data.amount.toString()
                                        )}
                                    </Typography>
                                </Box>
                            </Stack>
                        );
                    })}
                </Stack>
            )}
        </div>
    );
};
