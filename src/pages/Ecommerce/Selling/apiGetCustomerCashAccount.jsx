import httpService from "services/httpService";

export const apiGetCustomerCashAccount = async customerId => {
  try {
    const url = "/parse/classes/Account";
    const params = {
      where: {
        customer: {
          __type: "Pointer",
          className: "Customer",
          objectId: customerId,
        },
        type: "cash",
      },
      limit: 1,
    };
    const response = await httpService.get(url, { params });
    if (response?.results[0]) return response?.results[0];
    try {
      const url = "/parse/classes/Account";
      const createdAccount = {
        customer: {
          __type: "Pointer",
          className: "Customer",
          objectId: customerId,
        },
        type: "cash",
        balance: 0,
        useMasterKey: true,
        isGroup: false,
      };
      const response = await httpService.post(url, createdAccount);
      return response.results.objectId;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
