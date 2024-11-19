export function MyChat({ chat }: { chat: string }) {
  const formattedChat = chat.length > 30 ? chat.match(/.{1,15}/g)?.join('\n') : chat;

  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="bg-emerald-50 p-4 rounded-md shadow-md whitespace-pre-wrap h-10 flex justify-center items-center">
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
          <div className="bg-emerald-50 p-4 rounded-md shadow-md whites pace-pre-wrap h-10 flex justify-center items-center">
            {formattedChat}
          </div>
        </div>
      </div>
    </>
  );
}
