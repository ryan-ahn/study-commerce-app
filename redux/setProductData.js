let productDetailData = {
  id: '',
  category: 0,
  name: '',
  descriptin: '',
  image: '',
  price: 11900,
  discount: 20,
  discountPrice: 9520,
  recommend: false,
  newProduct: false,
  bestProduct: false,
  tagName: '',
  typeOfDelivery: '',
  review: [],
};

export default setProductData = (state = productDetailData, action) => {
  if (action.type === 'setDetailData') {
    let copyState = { ...state };
    copyState = action.payload;
    return copyState;
  } else if (action.type === 'addReview') {
    let copyState = { ...state };
    copyState.review.push(action.payload);
    return copyState;
  }
};
