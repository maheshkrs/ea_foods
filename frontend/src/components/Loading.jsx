import React from "react";

export default function Loading() {
  return (
    <div data-testid="loading-spinner" className="p-8 text-center">
      <div className="inline-block animate-pulse rounded-md bg-gray-200 px-6 py-3 text-gray-600">
        Loading...
      </div>
    </div>
  );
}
