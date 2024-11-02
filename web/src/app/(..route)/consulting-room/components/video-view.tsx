import { Card } from "@/app/ui/component/molecule/card/card";
import { cn } from "@/app/utils/style/helper";
import { forwardRef } from "react";

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

export const VideoView = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>(
  <>
    <Card className={cn('relative -z-10', className)} {...props} ref={ref}>
    
    </Card>
  </>
))

VideoView.displayName = 'VideoView';