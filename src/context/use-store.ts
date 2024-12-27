import { useEffect, useState } from "react";

export const useStore = <T>(selector: () => T): T | undefined => {
  const result = selector();
  const [data, setData] = useState<T>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
