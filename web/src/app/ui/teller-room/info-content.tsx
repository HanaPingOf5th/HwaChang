import React from "react";

interface PropInfo {
  status: string;
  count: number;
}

export default function InfoContent({ status, count }: PropInfo) {
  return (
    <div>
      <div className="bg-secondary">
        <span className="text-white ml-2 text-lg">{status}</span>
        <div className="bg-white flex rounded-xl justify-start items-end md:w-36 py-2 mt-2">
          <span className="text-2xl font-bold ml-3">{count}</span>
          <span className="text-xl font-semibold mx-2">명</span>
        </div>
      </div>
    </div>
  );
}