"use client";

import Image from "next/image";
import { AudioPosts } from "./components/AudioPosts";
import SignInButton from "./components/SignInButton";
import useLensUser from "./lib/auth/useLensUser";
import styles from "./page.module.css";

const backgroundImageUrl = "./god-playing-guitar.png";
const bgIpfsUrl =
  "https://gateway.ipfs.io/ipfs/bafybeicsruc3o3thtmg3lxihrgz4j3jorvjqosket2amkgnqg63qziu7oe";
const heroStyle = {
  height: "50vh",
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

export default function Home() {
  const { profileQuery } = useLensUser();

  return (
    <>
      <main className={styles.main}>
        <div className='bg-black pb-24 sm:pb-32'>
          <div className='mx-auto max-w-full px-6 lg:px-8'>
            <div className='mx-auto max-w-8xl'>
              <nav className=' px-4 py-2 flex justify-between'>
                <div className=' flex items-center'>
                  <a
                    href='#'
                    className='text-white font-bold text-lg items-center'>
                    MAYAH
                  </a>
                </div>
                <div>
                  <ul className='flex items-center justify-end space-x-4'>
                    <li>
                      <a href='#' className='text-white hover:text-gray-300'>
                        Home
                      </a>
                    </li>
                    <li>
                      <a href='#' className='text-white hover:text-gray-300'>
                        Artists
                      </a>
                    </li>
                    <li>
                      <SignInButton />
                    </li>
                  </ul>
                </div>
              </nav>

              {/* hero component */}
              <div style={heroStyle}>
                <div className='mx-8'>
                  <h1 className='text-8xl stroke-red-700 font-bold text-white'>
                    Kyaa Ramailo
                  </h1>
                </div>
              </div>

              {/* why mayah */}
              <div className='text-center max-w-lg m-auto pt-20 pb-20'>
                <p className='text-2xl'>
                  Mayah is a collective of artists and creatives coming together
                  to build a new music ecosystem.
                </p>
              </div>

              {!!profileQuery.data?.defaultProfile && <AudioPosts />}

              {/* footer with copyright information*/}
              <div className=''>
                <p className='text-sm text-center text-gray-500'>
                  © 2023 Mayah. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
