import Image from 'next/image';

type Props = {
  banner: string;
};

export const ProfileBanner = async ({ banner }: Props) => {
  return (
    <div className="relative h-[20em] w-full bg-cyan-800">
      {banner ? (
        <Image
          src={banner}
          fill
          className="object-cover"
          objectPosition="top"
          alt="Profile banner"
        />
      ) : null}
    </div>
  );
};
