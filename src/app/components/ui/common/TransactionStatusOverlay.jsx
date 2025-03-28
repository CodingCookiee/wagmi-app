import React, { useEffect } from "react";
import { Text } from "./";
import { Loader } from "./";

export const TransactionStatusOverlay = ({ 
  isWritePending, 
  isConfirming, 
  isConfirmed,
  pendingMessage = "Transaction pending...",
  confirmingMessage = "Waiting for confirmation...",
  confirmedMessage = "Transaction confirmed!"
}) => {
  // Add this useEffect to automatically hide the success message after a delay
  useEffect(() => {
    let timer;
    if (isConfirmed) {
      timer = setTimeout(() => {
        // The animation will handle the fade out
      }, 2000); // Show success message for 2 seconds
    }
    return () => clearTimeout(timer);
  }, [isConfirmed]);

  if (isWritePending) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-blue-100/70">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
          <Loader />
          <Text variant="body1" color="primary">
            {pendingMessage}
          </Text>
        </div>
      </div>
    );
  }
  
  if (isConfirming) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-yellow-100/70">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
          <Loader />
          <Text variant="body1" color="warning">
            {confirmingMessage}
          </Text>
        </div>
      </div>
    );
  }
  
  if (isConfirmed) {
    // Show success message briefly then fade out
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-green-100/70 animate-fadeOut">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <Text variant="body1" color="success">
            {confirmedMessage}
          </Text>
        </div>
      </div>
    );
  }
  
  return null;
};
