'use client'
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from '@/app/utils/style';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content>
    & { title?: string; description?: string; titleClassName?:string; descriptionClassName?:string }
  >(({ children, className, title, description, titleClassName, descriptionClassName, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      {...props}
      ref={forwardedRef}
      className={cn("fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md", className)}
    >
      {
        title
        ?<DialogPrimitive.Title className={cn("text-lg text-center font-bold mb-2", titleClassName)}>{title}</DialogPrimitive.Title>
        :<DialogPrimitive.Title></DialogPrimitive.Title>
      }
      {
        description
        ?<DialogPrimitive.Description className={cn("text-sm mb-4", descriptionClassName)}>{description}</DialogPrimitive.Description>
        :<DialogPrimitive.Description></DialogPrimitive.Description>
      }
      {children}
      <DialogPrimitive.Close aria-label="Close" className="absolute top-4 right-4">

      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;
