import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
        kanazawa: {
            url: "https://testnet-rpc.meld.com/",
            chainId: 222000222,
            accounts: ["YOUR_PRIVATE_KEY"],
        },
    },
};

export default config;
