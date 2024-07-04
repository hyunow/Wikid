import Image from "next/image";
import Link from "next/link";
import LinkCopyButton from "@components/LinkCopyButton";
import { Profile } from "@lib/types/Profile";
import profileIcon from "@icons/ic_profile.svg";

interface UserWikiCardProps {
  profile: Profile;
}

const UserWikiCard = ({ profile }: UserWikiCardProps) => {
  const imageSrc =
    profile.image && profile.image.includes("sprint") // "https://example.com/..." 이 이미지 때문에 에러떠서 임시로 이렇게 구현했어요.
      ? profile.image
      : profileIcon;

  return (
    <div className="mb-[24px] flex h-[140px] items-end justify-between gap-[20px] rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]">
      <Link
        href={`/wiki/${profile.code}`}
        className="h-full w-full p-[25px_0_25px_35px]"
      >
        <div className="flex items-center gap-[32px]">
          <Image
            src={imageSrc}
            alt={profile.name}
            width={85}
            height={85}
            className="h-[85px] w-[85px] rounded-full"
          />
          <div>
            <div className="mb-[15px] text-[24px] font-semibold">
              {profile.name}
            </div>
            <div className="text-gray400">{profile.city}</div>
            <div className="text-gray400">{profile.job}</div>
          </div>
        </div>
      </Link>
      <div className="flex h-full shrink-0 items-end p-[25px_35px_25px_0]">
        <LinkCopyButton link="https://www.wikied.kr/wikicode" />
      </div>
    </div>
  );
};

export default UserWikiCard;
