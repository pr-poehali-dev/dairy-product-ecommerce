
import React, { createContext, useContext, useState } from "react";

interface OrderContextType {
  isOrderFormOpen: boolean;
  setOrderFormOpen: (open: boolean) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <OrderContext.Provider
      value={{
        isOrderFormOpen,
        setOrderFormOpen,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
