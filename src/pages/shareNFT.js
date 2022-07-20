import React from "react";
import {
    useAddress,     // 確定是否有連結錢包（地址）
    useOwnedNFTs,  // 確定錢包的 NFT 和 餘額
    useNFTDrop,

} from '@thirdweb-dev/react';
import { Theme } from 'react-daisyui'
import { NavLink } from "react-router-dom";

const ShareNFT = () => {
    // Put Your NFT Drop Contract address from the dashboard here
    const myNftDropContractAddress = '0x322067594DBCE69A9a9711BC393440aA5e3Aaca1';

    const editionDrop = useNFTDrop(myNftDropContractAddress);
    const address = useAddress();
    const { data: ownedNFTs, isLoading } = useOwnedNFTs(editionDrop, address);
    // // Load contract metadata
    // const { data: contractMetadata } = useContractMetadata(
    //     myNftDropContractAddress,
    // );

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
    if (ownedNFTs.length > 0) {
        let contractMetadata = ownedNFTs[0].metadata
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
                                <NavLink exact className="btn" to="/">⬅️ 回上一頁</NavLink>
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