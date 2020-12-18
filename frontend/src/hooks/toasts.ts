import { useToasts } from 'react-toast-notifications';

const useCustomToasts = () => {
  const { addToast } = useToasts();

  function addErrorToast(message: string) {
    addToast(message, {
      appearance: 'error',
      autoDismiss: true,
    });
  }

  function addSuccessToast(message: string) {
    addToast(message, {
      appearance: 'success',
      autoDismiss: true,
    });
  }

  return { addErrorToast, addSuccessToast };
};

export default useCustomToasts;
