import { createContext, useContext, useState } from "react";

const DiscountContext = createContext();

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error("useDiscount must be used within a DiscountProvider");
  }
  return context;
};

export const DiscountProvider = ({ children }) => {
  const [hasDiscount, setHasDiscount] = useState(false);

  const value = {
    hasDiscount,
    setHasDiscount,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
};
