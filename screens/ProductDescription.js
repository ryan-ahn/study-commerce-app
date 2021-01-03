import React from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ProductDescription = (props) => {
  return (
    <ViewContainer>
      <Text>여기 페이지는 사실 안만들거에요</Text>
      <Button
        title='hihihi'
        onPress={() =>
          props.dispatch({ type: 'setDetailData', payload: { blabla: 0 } })
        }
      />
    </ViewContainer>
  );
};

function aa(state) {
  return {
    state: state,
  };
}

export default connect(aa)(ProductDescription);

const ViewContainer = styled(View)`
  top: 200px;
  height: 200px;
  width: 200px;
  border: 1px solid red;
`;
