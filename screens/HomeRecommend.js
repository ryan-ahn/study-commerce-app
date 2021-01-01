import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { Mixin } from '../styles/Mixin';

const LIMIT = 3;

export default HomeRecommend = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((result) => {
        setData([...data, ...result.slice(offset, offset + LIMIT)]);
        setOffset(offset + LIMIT);
        setLoading(false);
      });
  };

  const onEndReached = () => {
    getData();
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <FlatImage source={{ uri: item.url }} />
        <Text>{item.title}</Text>
      </View>
    );
  };

  const renderPagination = (index, total) => {
    return (
      <StyledPagination>
        <Text style={{ color: 'grey' }}>
          <StyledPaginationText>{index + 1}</StyledPaginationText>/{total}
        </Text>
      </StyledPagination>
    );
  };

  return (
    <ViewContainer>
      <ScrollView>
        <Swiper
          renderPagination={renderPagination}
          autoplay={true}
          autoplayTimeout={3}
          loop={false}
          showsButtons={false}>
          <SlideContainer>
            <SlideImage source={require('../images/banner_market1.png')} />
          </SlideContainer>
          <SlideContainer>
            <SlideImage source={require('../images/banner_market3.png')} />
          </SlideContainer>
          <SlideContainer>
            <SlideImage source={require('../images/banner_market2.png')} />
          </SlideContainer>
        </Swiper>
      </ScrollView>
      <StyledSafeAreaView>
        <Text>헤더</Text>
        <FlatList
          horizontal
          keyExtractor={(item) => String(item.id)}
          data={data}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          ListFooterComponent={
            loading ? <ActivityIndicator size='large' /> : null
          }
        />
      </StyledSafeAreaView>
    </ViewContainer>
  );
};

const ViewContainer = styled.View`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
`;
const SlideContainer = styled(View)`
  width: 100%;
  height: 390px;
`;

const SlideImage = styled(Image)`
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledPagination = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  position: absolute;
  top: 360px;
  right: 20px;
  width: 40px;
  background-color: black;
  border-radius: 10px;
  opacity: 0.6;
`;

const StyledPaginationText = styled(Text)`
  color: white;
  font-size: 14px;
`;

const StyledSafeAreaView = styled(SafeAreaView)`
  height: 500px;
  ${Mixin.flexSet('center', 'center', 'column')};
`;

const FlatImage = styled(Image)`
  width: 50px;
  height: 50px;
`;
