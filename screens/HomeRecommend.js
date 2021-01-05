import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeEventFlatList from '../components/HomeEventFlatList';
import HomeProductFlatList from '../components/HomeProductFlatList';
import HomeRecipeFlatList from '../components/HomeRecipeFlatList';
import HomeSwiper from '../components/HomeSwiper';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';

const LIMIT = 4;

export default HomeRecommend = ({ navigation }) => {
  const [productData, setProductData] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [recipeData, setRecipeData] = useState();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const scrollLocation = useRef();

  useEffect(() => {
    getProductData();
    getSwiperData();
    getEventData();
    getUserData();
    getRecipeData();
  }, []);

  const getProductData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/46154f43cac6427be56955d7cdd0a6ab/raw/e5f918f5a20953b6cb6146c39f366b3fe98ad89c/productList.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setProductData([
          ...productData,
          ...result.slice(offset, offset + LIMIT),
        ]);
        setOffset(offset + LIMIT);
      });
    setLoading(false);
  };

  const getSwiperData = () => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/8bada8b057954b4c9b8b127c17328fd7/raw/c4b9e38e71615169ba70c07687172f73221d0ae8/slideUrl.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setSlideData(result);
      });
  };

  const getRecipeData = () => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/f166d981985808017c73e885ae01bef0/raw/17ccb09298588db4e3dfc2376a1b2a27f7cf06b0/recipe.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setRecipeData(result);
      });
  };

  const getEventData = () => {
    fetch(
      'https://gist.githubusercontent.com/Xednicoder/58675c056b96fda86286e35604070d04/raw/b70fe7fa06112b74062a5989546887d2342e03b6/event.json',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((result) => {
        setEventData(result);
      });
  };

  const getUserData = async () => {
    try {
      const userName = await AsyncStorage.getItem('USER_NAME');
      if (userName !== null) {
      }
    } catch (e) {}
  };

  const onEndReached = () => {
    getProductData();
  };

  const onUpPage = () => {
    scrollLocation.current.scrollTo({ y: 0 });
  };

  const showButton = (e) => {
    if (e.nativeEvent.contentOffset.y - 0 > 400) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const goToProductDetail = () => {
    navigation.navigate('productDetail');
  };

  return (
    <ViewContainer>
      <StyledScrollView
        ref={scrollLocation}
        bounces={false}
        onScrollEndDrag={showButton}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StickyView
          style={{ position: 'absolute', opacity: toggle ? '1' : '0' }}>
          <StickyButton style={{ position: 'sticky' }} onPress={onUpPage}>
            <AntDesign name='arrowup' size={17} color={'#444444'} />
          </StickyButton>
        </StickyView>
        <HomeSwiper data={slideData} />
        <HomeProductFlatList
          title={'이 상품 어때요?'}
          data={productData.filter((product) => product.recommend === true)}
          offset={offset}
          loading={loading}
          onEndReached={onEndReached}
          goToDetail={goToProductDetail}
        />
        <HomeEventFlatList title={'이벤트 소식'} data={eventData} />
        <HomeProductFlatList
          title={'오늘의 신규 상품'}
          data={productData.filter((product) => product.newProduct === true)}
          offset={offset}
          loading={loading}
          onEndReached={onEndReached}
          goToDetail={goToProductDetail}
        />
        <HomeRecipeFlatList
          title={'홀리의 레시피'}
          data={recipeData}
          offset={offset}
          loading={loading}
          onEndReached={onEndReached}
        />
        <Footer />
      </StyledScrollView>
    </ViewContainer>
  );
};

const ViewContainer = styled(View)`
  ${Mixin.flexSet('center', 'center', 'column')};
  width: 390px;
  height: 100%;
`;

const StyledScrollView = styled(ScrollView)`
  background-color: #f9f9f9;
`;

const StickyView = styled(View)`
  top: 570px;
  left: 330px;
`;

const StickyButton = styled(Pressable)`
  ${Mixin.flexSet('center', 'center', 'row')};
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-radius: 50px;
`;
