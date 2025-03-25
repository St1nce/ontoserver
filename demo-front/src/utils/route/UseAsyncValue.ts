import { useAsyncValue as useAsyncValueOriginal } from "react-router-dom";
import { UseDataHook } from "./UseDataHook";

export const useAsyncValue: UseDataHook = () => {
  const useAsyncValueRef = useAsyncValueOriginal as UseDataHook;
  return useAsyncValueRef();
};
