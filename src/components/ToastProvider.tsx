import React from "react";
import { isMobile } from "react-device-detect";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ToastContainer
        position={isMobile ? "bottom-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        style={{
          zIndex: 9999, // トーストが他の要素に隠れないようにする
          marginBottom: isMobile ? "1rem" : undefined, // モバイルで下部に余白を追加
        }}
      />
    </div>
  );
};

export default ToastProvider;