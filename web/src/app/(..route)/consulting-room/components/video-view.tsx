import { NameTag } from "@/app/ui/component/atom/tag/name-tag";
import { Card } from "@/app/ui/component/molecule/card/card";
import { cn } from "@/app/utils/style/helper";
import { forwardRef } from "react";

export interface Profile {
 picture: React.ReactNode;
 name: string;
}
interface VideoViewProps {
  className?: string;
  video: React.ReactNode;
  onCam: boolean;
  onMike?: boolean;
  profile?: Profile;
  isTop?: boolean;
}

interface VideoProps extends React.HTMLAttributes<HTMLVideoElement>{
  isTop?: boolean
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ className, isTop, ...props }, ref)=>(
  <video
    className={cn("rounded-xl aspect-[16/9] object-cover", className, isTop?"h-40 aspect-[16/9]":"aspect-[16/9]")}
    ref={ref}
    autoPlay
    playsInline
    muted
    width="100%"
    height="auto"
    {...props}
  />
));
  
Video.displayName = 'Video';

export const VideoView = ({className, video, onCam, profile, isTop }:VideoViewProps)=>(
  <main className={cn(isTop?"px-6":null)}>
    <Card className={cn('relative -z-10', className)}>
    {
      onCam
      ?
      (<>
        <Card className={cn("rounded-xl object-cover", isTop?'h-40 w-auto':'aspect-[16/9]')}>
          {video}
        </Card>
        <div className="absolute top-100 bottom-0 left-0 text-white">
          <NameTag name={profile?.name as string} />
        </div>
      </>
      )
      :<Card className={cn("rounded-xl object-cover", isTop?'h-40 w-auto':'aspect-[16/9]')}>{profile?.picture}</Card>}
    </Card>
  </main>
)