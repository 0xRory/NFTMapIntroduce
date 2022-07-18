import React from "react";
import {
    useAddress,     // 確定是否有連結錢包（地址）
    useMetamask,    // 調用Metamask
    useNFTBalance,  // 確定錢包的 NFT 和 餘額
    //useNetwork,     // 切換網路
    useEditionDrop, // 使用Drop address
} from "@thirdweb-dev/react";
import { Theme, Button } from 'react-daisyui'


function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
const MintNFT = () => {
    // Replace this address with your NFT Drop address!
    const editionDrop = useEditionDrop(
        "0x1fCbA150F05Bbe1C9D21d3ab08E35D682a4c41bF"
    );
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const { data: balance, isLoading } = useNFTBalance(editionDrop, address, "0");
    // 判定有沒有address
    if (!address) {
        return (
            <div className="page">
                <div className='container'>
                    <div className='row'>
                        <Theme dataTheme="light">
                            <h1>請連結錢包</h1>
                            <Button size="lg" onClick={connectWithMetamask}>Connect MetaMask</Button>
                        </Theme>
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className="page">
                <div className="container">
                    <div className='row'>
                        <h1>檢查你的錢包...</h1>
                        <progress max="100" className="progress w-56" />
                    </div>
                </div>
            </div>
        );
    }
    // if the user is connected and has an NFT from the drop, display text
    if (balance > 0) {
        return (
            <div>
                <h2>Congratulations! You have a Shape Membership Card! 🟦🔺🟣</h2>
            </div>
        );
    }

    // if there are no NFTs from collection in wallet, display button to mint
    return (
        <div className="page">
            <div className="container">
                <div className='row'>
                    <Theme dataTheme="light">
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://img.freepik.com/free-vector/omg-wording-comic-speech-bubble-burst_1308-56321.jpg?t=st=1658152998~exp=1658153598~hmac=6ffaee2ea210164e6e664a253ecddf3c0196c2dd20d285cbc09ef6b4aa7d33c9&w=1380" alt="OMG" /></figure>
                            <div class="card-body">
                                <p>你的錢包地址：{truncateAddress(address)}</p>
                                <p>Sorry 你還沒有擁有  NFT</p>
                                <div class="card-actions justify-end">
                                    <button class="btn">Go to Mint</button>
                                </div>
                            </div>
                        </div>
                        {/* <h1>連接錢包為：</h1>
                        <span className="value">{truncateAddress(address)}</span>
                        <h2>尚未擁有NFT</h2> */}
                    </Theme>
                </div>
            </div>
        </div>
    );
}
export default MintNFT