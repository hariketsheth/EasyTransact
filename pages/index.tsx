import type {NextPage} from 'next'
import {FaChevronRight} from "react-icons/fa";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="text-white flex flex-col gap-10 w-1/2 h-4/5 justify-center font-nunito">
      <h2 className="font-bold text-4xl">
        <span className="text-blue">Test</span> your solana accounts by running custom transactions easily and
        efficiently.
      </h2>

      <div>
        <button
          className="relative block bg-green-normal hover:bg-green-dark text-xl cursor-pointer z-20 font-medium rounded-xl">
          <Link href="/main">
            <p className="flex gap-3  px-10 py-3 justify-center items-center">Get started <FaChevronRight/></p>
          </Link>
        </button>
      </div>


      <img className="h-4/5 fixed bottom-0 right-0" src="/images/landing-page-lines.png"/>
    </div>
  )
}

export default Home;
