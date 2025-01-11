const initialstate = {
  clientservice: [],
  order: [],
};
const Reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "Add":
      return { ...state, clientservice: [action.payload] };
    case "Addorder":
      return { ...state, order: [action.payload] };
    default:
      return state;
  }
};
export default Reducer;
