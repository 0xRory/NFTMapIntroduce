import React, { useState } from "react";
import {
    ChainId,
    useClaimedNFTSupply,
    useContractMetadata,
    useNetwork,
    useNFTDrop,
    useAddress,
    useMetamask,
    useNetworkMismatch,
    useUnclaimedNFTSupply,
    useActiveClaimCondition,
    useClaimNFT,
    useWalletConnect,
    useCoinbaseWallet,
} from '@thirdweb-dev/react';
import styles from '../styles/Theme.module.css';

const MintNFT = () => {
    // Put Your NFT Drop Contract address from the dashboard here
    const myNftDropContractAddress = '0x322067594DBCE69A9a9711BC393440aA5e3Aaca1';

    const nftDrop = useNFTDrop(myNftDropContractAddress);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const isOnWrongNetwork = useNetworkMismatch();
    const claimNFT = useClaimNFT(nftDrop);
    const [, switchNetwork] = useNetwork();

    // Load contract metadata
    const { data: contractMetadata, isLoading, error } = useContractMetadata(
        myNftDropContractAddress,
    );

    // Load claimed supply and unclaimed supply
    const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
    const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);
    // Load the active claim condition
    const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);
    // Check if there's NFTs left on the active claim phase
    const isNotReady =
        activeClaimCondition &&
        parseInt(activeClaimCondition?.availableSupply) === 0;

    // Check if there's any NFTs left
    const isSoldOut = unclaimedSupply?.toNumber() === 0;
    // The amount the user claims
    const [quantity, setQuantity] = useState(1); // default to 1

    // Loading state while we fetch the metadata
    if (error) {
        window.location.reload();
    }
    if (!nftDrop || !contractMetadata) {
        return (
            <div div className="page" >
                <div className="container">
                    <div className='row'>
                        {/* <h1>讀取中...</h1> */}
                        <progress max="100" className="progress w-56" />
                    </div>
                </div>
            </div>
        )
    }
    // Function to mint/claim an NFT
    const mint = async () => {
        if (isOnWrongNetwork) {
            switchNetwork && switchNetwork(ChainId.Mumbai);
            return;
        }

        claimNFT.mutate(
            { to: address, quantity },
            {
                onSuccess: () => {
                    alert(`Successfully minted NFT${quantity > 1 ? 's' : ''}!`);
                },
                onError: (err) => {
                    console.error(err);
                    alert(err?.message || 'Something went wrong');
                },
            },
        );
    };

    return (
        <div className="page">
            <div className="container">
                <div className={styles.mintInfoContainer}>
                    <div class="card w-96 shadow-xl">
                        <div>
                            <figure>
                                {/* Image Preview of NFTs */}
                                <img
                                    className={styles.image}
                                    src={contractMetadata?.image}
                                    alt={`${contractMetadata?.name} preview image`}
                                />
                            </figure>
                            {/* Amount claimed so far */}
                            <div className={styles.mintCompletionArea}>
                                <div className={styles.mintAreaLeft}>
                                    <p>Total Minted</p>
                                </div>
                                <div className={styles.mintAreaRight}>
                                    {claimedSupply && unclaimedSupply ? (
                                        <p>
                                            {/* Claimed supply so far */}
                                            <b>{claimedSupply?.toNumber()}</b>
                                            {' / '}
                                            {
                                                // Add unclaimed and claimed supply to get the total supply
                                                claimedSupply?.toNumber() + unclaimedSupply?.toNumber()
                                            }
                                        </p>
                                    ) : (
                                        // Show loading state if we're still loading the supply
                                        <p>讀取中...</p>
                                    )}
                                </div>
                            </div>
                            <>
                                {/* <p>數量</p> */}
                                <div className={`${styles.quantityContainer} mt-3 mb-3`}>
                                    <button
                                        className={`${styles.quantityControlButton} text-black`}
                                        onClick={() => setQuantity(quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>

                                    <h4>{quantity}</h4>

                                    <button
                                        className={`${styles.quantityControlButton} text-black`}
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={
                                            quantity >=
                                            parseInt(
                                                activeClaimCondition?.quantityLimitPerTransaction ||
                                                '0',
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </>
                        </div>
                    </div>
                    <div className={styles.infoSide}>
                        <h1>Metadata is</h1>
                        {/* Title of your NFT Collection */}
                        <h2>name : {contractMetadata?.name}</h2>
                        {/* Description of your NFT Collection */}
                        {/* <p className={styles.description}>{contractMetadata?.description}</p> */}
                        {/* 顯示認領按鈕或連接錢包按鈕*/}
                        {address ? (
                            // Sold out or show the claim button
                            isSoldOut ? (
                                <div>
                                    <h2>賣完了～</h2>
                                </div>
                            ) : isNotReady ? (
                                <div>
                                    <h2>尚未準備好鑄造</h2>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-center mt-3 mb-3">
                                        <button
                                            className={`btn`}
                                            onClick={mint}
                                            disabled={claimNFT.isLoading}
                                        >
                                            {claimNFT.isLoading
                                                ? 'Minting...'
                                                : 'Free Mint 🤡'
                                                // : `Mint${quantity > 1 ? ` ${quantity}` : ''}${activeClaimCondition?.price.eq(0)
                                                //     ? ' (Free)'
                                                //     : activeClaimCondition?.currencyMetadata.displayValue
                                                //         ? ` (${formatUnits(
                                                //             priceToMint,
                                                //             activeClaimCondition.currencyMetadata.decimals,
                                                //         )} ${activeClaimCondition?.currencyMetadata.symbol
                                                //         })`
                                                //         : ''
                                            }
                                            {/* `} */}
                                        </button>
                                    </div>
                                </>
                            )
                        ) : (
                            <div className={styles.buttons}>
                                <button
                                    className="btn"
                                    onClick={connectWithMetamask}
                                >
                                    請連結錢包
                                </button>
                                {/* <button
                                    className={styles.mainButton}
                                    onClick={connectWithWalletConnect}
                                >
                                    Connect with Wallet Connect
                                </button>
                                <button
                                    className={styles.mainButton}
                                    onClick={connectWithCoinbaseWallet}
                                >
                                    Connect with Coinbase Wallet
                                </button> */}
                            </div>
                        )}
                    </div>
                </div>
                {/* Powered by thirdweb */}{' '}
                {/* <img
                    src="/logo.png"
                    alt="thirdweb Logo"
                    width={135}
                    className={styles.buttonGapTop}
                /> */}
            </div>
        </div>
    );
}
export default MintNFT