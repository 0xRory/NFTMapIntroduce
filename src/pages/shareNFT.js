import React from "react";
import {
    useAddress,     // 確定是否有連結錢包（地址）
    useOwnedNFTs,  // 確定錢包的 NFT 和 餘額
    useNFTDrop,
    useMetamask,

} from '@thirdweb-dev/react';
import { Theme, Button } from 'react-daisyui'
import { NavLink } from "react-router-dom";
import {
    TwitterIcon,
    TwitterShareButton,
} from "react-share";


const ShareNFT = () => {
    // Put Your NFT Drop Contract address from the dashboard here
    const myNftDropContractAddress = '0x322067594DBCE69A9a9711BC393440aA5e3Aaca1';

    const editionDrop = useNFTDrop(myNftDropContractAddress);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const { data: ownedNFTs, isLoading } = useOwnedNFTs(editionDrop, address);
    // // Load contract metadata
    // const { data: contractMetadata } = useContractMetadata(
    //     myNftDropContractAddress,
    // );

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
                        <progress max="100" className="w-56 progress" />
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
                                    <TwitterShareButton
                                        title={"WOW MY NFT"}
                                        url={"https://timely-dusk-caad9a.netlify.app/"}
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
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
        return (
            <div className="page">
                <div className="container">
                    <div className='row'>
                        <Theme dataTheme="light">
                            <h1>很抱歉你還沒有ＮＦＴ😴
                                <NavLink exact className="btn btn-outline btn-success" replace to="/">回首頁</NavLink>
                            </h1>
                        </Theme>
                    </div>
                </div>
            </div>
        )
    }

}
export default ShareNFT