export const PoPointer = id => {
  return {
    __type: "Pointer",
    className: "PO",
    objectId: id,
  };
};

export const OrderPointer = id => {
  return {
    __type: "Pointer",
    className: "Order",
    objectId: id,
  };
};

export const BranchPointer = id => {
  return {
    __type: "Pointer",
    className: "Branch",
    objectId: id,
  };
};

export const SessionPointer = id => {
  return {
    __type: "Pointer",
    className: "StockChangeSession",
    objectId: id,
  };
};

export const StockCountSessionPointer = id => {
  return {
    __type: "Pointer",
    className: "StockCountSession",
    objectId: id,
  };
};

export const WarehousePointer = id => {
  return {
    __type: "Pointer",
    className: "WareHouse",
    objectId: id,
  };
};
