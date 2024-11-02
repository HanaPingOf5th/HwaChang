import { getRandomColor } from "@/app/utils/helper";

export function NameTag({name}:{name:string}){
  return(
    <div className="p-3">
    <div className="bg-slate-700 m-1 px-2 py-1 rounded-md text-sm text-neutral-100 opacity-80">{name} 님</div>
    </div>
  )
}

export function Tag({content}:{content: string}){
  return (
    <div className="m-1 px-2 py-1 rounded-md text-sm text-neutral-100" style={{ backgroundColor: getRandomColor() }}>
      {content}
    </div>
  )
}