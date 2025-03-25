import { useLoaderData as useLoaderDataOriginal } from "react-router-dom";
import { UseDataHook } from "./UseDataHook";

export const useLoaderData: UseDataHook = () => {
  const useLoaderDataRef = useLoaderDataOriginal as UseDataHook;
  return useLoaderDataRef();
};
