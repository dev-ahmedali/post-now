/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn } from 'next-auth/react';
export default function signin({ providers }) {
  return (
    <div className='flex justify-center mt-20 space-x-8'>
      <img className='md:inline-flex md:w-64 hidden' src="/auth.svg" alt="signin image" />
      <div>
          {
            Object.values(providers).map((provider) => (
                <div key={provider.name} className='flex flex-col items-center'>
                    <img className='w-36 object-cover' src='/logo.png' alt='post now logo'/>
                    <p className='text-sm italic my-10'>This app created for learning purposes</p>
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'>Sign in with {provider.name}</button>
                </div>
            ))
          }
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
