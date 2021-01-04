let productReviewData = {};

export default setReviewData = (state = productReviewData, action) => {
  if (action.type === 'setReviewData') {
    let copyState = { ...state };
    copyState = action.payload;
    return copyState;
  }
};
