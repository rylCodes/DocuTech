import React from "react";

export default function CardLoader() {
  return (
    <div className="animate-pulse border shadow-lg rounded-md p-4 w-full mx-auto">
      <div className="flex space-x-4">
        <div className="rounded-full bg-slate-200 size-12"></div>
        <div className="flex-1 flex flex-col gap-3 w-full">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-2 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
