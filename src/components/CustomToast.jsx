import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

const icons = {
  success: <CheckCircle className="w-5 h-5 text-white" />,
  error: <XCircle className="w-5 h-5 text-white" />,
  warning: <AlertTriangle className="w-5 h-5 text-white" />,
};

const bgColors = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500",
};

const CustomToast = ({
  type = "success",
  message = "heloooooo",
  duration = 4000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out transform ${
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      } flex items-center max-w-xs rounded-lg shadow-lg text-white gap-4 ${
        bgColors[type]
      } px-4 py-3`}
      style={{ padding: "20px 16px" }}
    >
      {icons[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <div
        className="p-1"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
      >
        <X className="size-4 ml-2 text-white hover:text-gray-200" />
      </div>
    </div>
  );
};

export default CustomToast;
