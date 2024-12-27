import { Profile } from "../components/video-view";
import Minji from "@/app/utils/public/Minji.jpeg";
import Cameraoff from "@/app/utils/public/Cameraoff.svg";
import Image from "next/image";

export const mockProfile: Profile = {
  picture: (
    <div className="flex justify-center items-center rounded-xl overflow-hidden">
      <Image src={Minji} alt="Minji" />
    </div>
  ),
  name: "상대방",
};

export const createMockMyProfile = (isFullHeight: boolean, name: string): Profile => ({
  picture: (
    <div
      className={`flex justify-center items-center ${isFullHeight ? "h-[160px]" : "h-[545px]"
        } bg-gray-200 rounded-xl`}
    >
      <Image src={Cameraoff} alt="Cameraoff" width={50} height={50} />
    </div>
  ),
  name: name,
});

export const mockOtherProfile: Profile = {
  picture: (
    <div className="flex justify-center items-center h-[160px] bg-gray-200 rounded-xl ">
      <Image src={Cameraoff} alt="Cameraoff" width={50} height={50} />
    </div>
  ),
  name: "참여자",
};
