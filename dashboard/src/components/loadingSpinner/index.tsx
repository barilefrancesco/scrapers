import React, { useState } from "react";

export default function LoadingSpinner() {
  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center backdrop-blur-sm">
      <div className="loading-spinner"></div>
    </div>
  );
}
