export function MyChat({ chat }: { chat: string }) {
  const formattedChat = chat.length > 30 ? chat.match(/.{1,15}/g)?.join('\n') : chat;

  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="bg-slate-100 px-4 py-2 rounded-lg shadow-md whitespace-pre-wrap flex justify-center items-center">
          {formattedChat}
        </div>
      </div>
    </>
  );
}

export function OtherChat({ name, chat }: { name: string; chat: string }) {
  const formattedChat = chat.length > 30 ? chat.match(/.{1,15}/g)?.join('\n') : chat;

  return (
    <>
      <div className="flex justify-start mb-2">
        <div className="flex flex-col">
          <div className="text-sm text-gray-600 mb-1">{name}</div>
          <div className="bg-slate-100 px-4 py-2 rounded-lg shadow-md whites pace-pre-wrap flex justify-center items-center">
            {formattedChat}
          </div>
        </div>
      </div>
    </>
  );
}
