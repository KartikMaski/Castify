import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-3 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          width={50}
          height={50}
          alt="Castify logo"
          className="max-sm:size-10"
        />
        <p className="text-white font-extrabold text-[26px] px-2 max-sm:hidden">
          <span className="text-[32px] text-pink-500">STUDIO</span> 
          <span className="text-[15px] text-white">  by CASTIFY</span>
        </p>
      </Link>
      <div className="flex-between gap-5  ">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
