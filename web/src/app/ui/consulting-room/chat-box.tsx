export function MyChat({ chat }: { chat: string }) {
  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="bg-emerald-50 p-4 rounded-md shadow-md">{chat}</div>
      </div>
    </>
  );
}

export function OtherChat({ name, chat }: { name: string; chat: string }) {
  return (
    <>
      <div className="flex justify-start mb-2">
        <div className="flex flex-col">
          <div className="text-sm text-gray-600 mb-1">{name}</div>
          <div className="bg-emerald-50 p-4 rounded-md shadow-md">{chat}</div>
        </div>
      </div>
    </>
  );
}
