let cartData = [];

export default setCart = (state = cartData, action) => {
  if (action.type === 'setCart') {
    let copyState = { ...state };
    copyState = action.payload;
    return copyState;
  }
};
