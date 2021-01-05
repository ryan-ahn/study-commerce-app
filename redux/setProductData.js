let productDetailData = {
  id: '',
  category: 0,
  name: '',
  descriptin: '',
  image: '',
  price: 0,
  discount: 0,
  discountPrice: 0,
  recommend: false,
  newProduct: false,
  bestProduct: false,
  tagName: '',
  typeOfDelivery: '',
  review: [
    {
      _addImage: [],
      _bodyText: '',
      _title: '',
      _writer: '',
      _date: '',
    },
  ],
};

export default setProductData = (state = productDetailData, action) => {
  if (action.type === 'setDetailData') {
    let copyState = { ...state };
    copyState = action.payload;
    return copyState;
  } else if (action.type === 'addReview') {
    let copyState = { ...state };
    let reviewState = [...state.review].concat(action.payload);
    copyState.review = reviewState;
    return copyState;
  }
};
