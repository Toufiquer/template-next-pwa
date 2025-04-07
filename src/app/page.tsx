/*
|-----------------------------------------
| setting up \Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import TextSession from '@/provider/TextSession';
import Link from 'next/link';

const links = [
  { name: 'Home', url: '/' },
  { name: 'Login', url: '/login' },
  { name: 'SignUp', url: '/signup' },
  { name: 'Template 6', url: '/template6' },
];

const Page = () => {
  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full h-screen flex-col ">
      <div className="w-full">
        <TextSession />
      </div>
      <p className="w-full text-center">Home page</p>
      <div className="w-full flex flex-col text-center">
        {links.map(i => (
          <Link key={i.name} className="block my-2 hover:underline cursor-pointer" href={i.url}>
            {i.name}
          </Link>
        ))}
      </div>
    </main>
  );
};
export default Page;
