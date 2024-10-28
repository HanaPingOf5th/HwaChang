'use client'

import { cn } from "@/app/utils/style";
import { useEffect, useState } from "react";
import Switch from "./switch";


type ToggleButtonProps = {
  text: string;
  disabled?: boolean;
  onToggle?: (active: boolean) => void;
};

export default function ToggleButton({text, disabled = false, onToggle }: ToggleButtonProps): JSX.Element {
  const [active, setActive] = useState(false);

  useEffect(()=>{
    onToggle?.(active);
  }, [active, onToggle]);

  const handleToggleChange = (state: boolean) => {
    setActive(state);
  };

  return (
    <div className="flex items-center">
      <Switch checked={active} disabled={disabled} onCheckedChange={handleToggleChange} />
        <div className={cn('pl-3 text-sm', {'font-semibold text-black': active,})}>
          {text}
        </div>
    </div>
  )
}