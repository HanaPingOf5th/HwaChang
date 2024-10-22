export function NameTag({name}:{name:string}){
  return(
    <>
    <div className="bg-slate-700 m-1 px-2 py-1 rounded-md text-sm text-neutral-100 opacity-80">{name} 님</div>
    </>
  )
}