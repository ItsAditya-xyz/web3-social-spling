import React, { useEffect, useContext, useState } from "react";
import { SocialProtocol } from "@spling/social-protocol";

import { Keypair } from "@solana/web3.js";
import PostCard from "./PostCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import toast, { Toaster } from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "../../components/Navbar";
import { protocolOptions } from "../../utils/constants";
import { PublicKey } from "@solana/web3.js";
import { useNavigate, Link } from "react-router-dom";
function LandingPage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [socialProtocolVal, setSocialProtocolVal] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  useEffect(() => {
    async function initApp() {
      const socialProtocol = await new SocialProtocol(
        Keypair.generate(),
        null,
        protocolOptions
      ).init();
      setSocialProtocolVal(socialProtocol);
      console.log(socialProtocol);
      try {
        const posts = await socialProtocol.getAllPosts(31, 30);
        const finalResult = [];
        //loop through userPosts and add that post to finalResult only when media's array length is greater than 0
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].media.length > 0) {
            finalResult.push(posts[i]);
          }
        }
        console.log(finalResult);
        setResponse(finalResult);
        setIsLoading(false);
      } catch (err) {
        toast.error(
          `Something went wrong. Please reload the page. ${err.message}`
        );
      }
    }
    if (!response) {
      initApp();
    }
  }, []);

  useEffect(() => {
    async function initApp() {
      const socialProtocolValue = await new SocialProtocol(
        wallet,
        null,
        protocolOptions
      ).init();
      console.log(socialProtocolValue);

      setSocialProtocolVal(socialProtocolVal);
    }
    if (wallet?.publicKey && typeof wallet !== "undefined") {
      initApp();
    }
  }, [wallet]);

  useEffect(() => {
    async function checkUser() {
      const publicKeyObj = new PublicKey(publicKey);
      const userInfo = await socialProtocolVal.getUserByPublicKey(publicKeyObj);
      if (userInfo) {
        setProfileInfo(userInfo);
      } else {
        navigate("/sign-up");
      }
    }
    if (publicKey && socialProtocolVal && !profileInfo) {
      checkUser();
    }
  }, [publicKey]);

  return (
    <div className='w-full'>
      <Navbar shouldShowWallet={true} />
      <Toaster />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-800 my-3 '>
          Welcome to My Web3 Social App
        </h1>
      </div>

      <div className='flex flex-col items-center justify-center'>
        {profileInfo && (
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-cente space-x-1'>
              <p>Logged In As:</p>
              <div className='ml-2'>
                <div className='text-gray-800 text-sm font-bold'>
                  {profileInfo.nickname}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <img
                  src={profileInfo.avatar}
                  className='w-10 h-10 rounded-full'
                  alt='profile pic'
                />
              </div>
            </div>

            <Link
              to='/create'
              className='bg-purple-500 text-white px-8 py-2 rounded-md hover:bg-purple-600'>
              Create
            </Link>
          </div>
        )}
      </div>
      <h1 className='text-2xl font-bold text-gray-800 my-10 text-center '>
        Trending Posts
      </h1>
      {isLoading && (
        <div className='flex justify-center items-center'>
          <div className=' ease-linear rounded-full border-4 border-t-4 border-t-blue-500 animate-spin h-12 w-12 mb-4'></div>
        </div>
      )}
      {!isLoading && (
        <div className=''>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
            <Masonry gutter='10px'>
              {response.map((post, index) => (
                <div className='w-full px-1 mx-auto' key={index}>
                  <PostCard postValue={post} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
