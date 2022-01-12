import { useEffect, useRef } from "react";

export const useTaskBeforeUnmount = (calback, data) => {
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(
    () => () => {
      if (!mounted.current) {
        calback(data);
      }
    },
    [calback, data]
  );
};

export const showError = (error) => {
  try {
    return error.response.data;
  } catch {
    return "An Error Occurred";
  }
};
