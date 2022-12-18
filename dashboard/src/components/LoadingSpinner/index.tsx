import React, { useState } from "react";

export default function LoadingSpinner() {
  return (
    <div className="absolute inset-1/2">
      <div className="loading-spinner"></div>
    </div>
  );
}
