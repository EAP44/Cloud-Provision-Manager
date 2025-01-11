export const Add = (ClientService) => {
  return {
    type: "Add",
    payload: ClientService,
  };
};
export const Addorder = (order) => {
  return {
    type: "Addorder",
    payload: order,
  };
};
