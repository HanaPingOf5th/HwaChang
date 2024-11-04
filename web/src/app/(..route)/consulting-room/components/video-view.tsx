import { NameTag } from "@/app/ui/component/atom/tag/name-tag";
import { Card } from "@/app/ui/component/molecule/card/card";
import { cn } from "@/app/utils/style/helper";
import { forwardRef } from "react";

export interface Profile {
 picture: React.ReactNode;
 name: string;
}
interface VideoView {
  className?: string;
  video: React.ReactNode;
  isCam: boolean;
  onMike?: boolean;
  profile?: Profile
}

export const Video = forwardRef<HTMLVideoElement, React.HTMLAttributes<HTMLVideoElement>>(({ className, ...props }, ref)=>(
  <video
    className={cn("rounded-xl aspect-[16/9] object-cover", className)}
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

export const VideoView = ({className, video, isCam, profile}:VideoView)=>(
  <main>
    <Card className={cn('relative -z-10', className)}>
    {
      isCam
      ?
      (<>
        <Card className="rounded-xl aspect-[16/9] object-cover">
          {video}
        </Card>
        <div className="absolute top-100 bottom-0 left-0 text-white">
          <NameTag name={profile?.name as string} />
        </div>
      </>
      )
      :<Card className="rounded-xl aspect-[16/9] object-cover">{profile?.picture}</Card>}
    </Card>
  </main>
)