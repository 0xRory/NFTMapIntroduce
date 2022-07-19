import React from "react";
import {
    useAddress,     // 確定是否有連結錢包（地址）
    useContractMetadata,
    useNFTBalance,  // 確定錢包的 NFT 和 餘額
    useNFTDrop,

} from '@thirdweb-dev/react';
import { Theme } from 'react-daisyui'
import { Link } from "react-router-dom";

const ShareNFT = () => {
    // Put Your NFT Drop Contract address from the dashboard here
    const myNftDropContractAddress = '0x322067594DBCE69A9a9711BC393440aA5e3Aaca1';

    const nftDrop = useNFTDrop(myNftDropContractAddress);
    const editionDrop = useNFTDrop(myNftDropContractAddress);
    console.log('editionDrop', editionDrop)
    const address = useAddress();
    const { data: balance, isLoading } = useNFTBalance(editionDrop, address, "0");
    // Load contract metadata
    const { data: contractMetadata } = useContractMetadata(
        myNftDropContractAddress,
    );

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
    if (balance > 0) {
        return (
            <div className="page">
                <div className="container">
                    <div className='row'>
                        <Theme dataTheme="light">
                            <div class="card w-96 bg-base-100 shadow-xl">
                                <figure><img loading="lazy" src={contractMetadata?.image} /></figure>
                                <div class="card-body">
                                    <p>🎉🎉🎉 分享你的 NFT 🎉🎉🎉</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-3 mb-3">
                                <Link className="btn" to="/">⬅️ 回上一頁</Link>
                            </div>
                        </Theme>
                    </div>
                </div>
            </div>
        )
    } else {
        <div className="page">
            <div className="container">
                <div className='row'>
                    <h1>很抱歉你還有有ＮＦＴ😴</h1>
                </div>
            </div>
        </div>
    }

}
export default ShareNFT