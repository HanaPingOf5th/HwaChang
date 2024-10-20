import Image from "next/image";
import Google from '@/app/utils/public/Google.png';
import Github from '@/app/utils/public/Github.png';

export function GoogleLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={Google}
        alt="None"
        width={50}
        height={50}
      />
    </div>
  );
}

export function GithubLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={Github}
        alt="None"
        width={50}
        height={50}
      />
    </div>
  );
}