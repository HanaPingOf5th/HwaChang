import { getRandomColor } from "@/app/utils/helper";

export function Tag({content}:{content: string}){
  return (
    <div className="m-1 px-2 py-1 rounded-md text-sm text-neutral-100" style={{ backgroundColor: getRandomColor() }}>
      {content}
    </div>
  )
}