"use client"
import Image from 'next/image';
import { useUserContext } from "@/lib/context/AuthContext";
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children
}: { 
  children: React.ReactNode
}) {
  const { isAuthenticated} = useUserContext();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/');
    return null;
  } 
  return (
    <>
      <section className="flex flex-1 justify-center gap-10 items-center flex-row py-10">
        {children}
      <Image
        src="/assets/images/side-img.svg"
        width={720}
        height={720}
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
      </section>
 
    </>
  );
}