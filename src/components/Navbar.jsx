import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";
export default function Navbar({ shouldShowWallet }) {
  return (
    <div className='bg-[#20252e] flex items-center justify-between px-2 py-3'>
      <Link to='/'>
        <p className='text-white text-xl'>Solana Starter</p>
      </Link>

      {shouldShowWallet && <WalletMultiButton />}
    </div>
  );
}
