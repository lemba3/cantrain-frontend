import { useEffect } from 'react';
import { useToastStore } from '../page';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {

  const { isOpen, openToast, closeToast } = useToastStore();
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeToast();
    }, 3000); // Adjust the time as needed (e.g., 5000 for 5 seconds)

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    isOpen &&
    <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg fixed bottom-4 right-4 z-50">
      {message}
    </div>
  );
};

export default Toast;
