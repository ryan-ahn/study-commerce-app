let productDetailData = {};

export default setProductData = (state = productDetailData, action) => {
  if (action.type === 'setDetailData') {
    let copyState = { ...state };
    copyState = action.payload;
    return copyState;
  }
};
