'use client'
import Image from 'next/image'
import Link from 'next/link'

import { selector } from "@/lib/redux/store";

const Topbar = () => {
  const { user} = selector((state) => state.auth);

  // useEffect(() => {
  //   if (isSuccess) navigate(0);
  // }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Link href={`/profile/${user.id}`} className="flex-center gap-3">
            <Image
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              width={100}
              height={100}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
