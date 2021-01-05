import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

export default HomeRecipeFlatList = (props) => {
  const [eventDate, setEventDate] = useState(
    moment.duration().add({ days: 0, hours: 3, minutes: 40, seconds: 50 })
  );
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    updateTimer();
  }, []);

  const updateTimer = () => {
    const x = setInterval(() => {
      if (eventDate <= 0) {
        clearInterval(x);
      } else {
        setEventDate(eventDate.subtract(1, 's'));
        setDays(eventDate.days());
        setHours(eventDate.hours());
        setMins(eventDate.minutes());
        setSecs(eventDate.seconds());
      }
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return (
      <FlatContainer>
        <DiscountSticky
          style={{
            position: 'absolute',
            opacity: item.name === '시금치 페스토 파스타 만들기' ? '0.5' : '0',
          }}>
          <Countdown>{`${hours}:${mins}:${secs}`}</Countdown>
          <SaleText>남음</SaleText>
        </DiscountSticky>
        <FlatImage source={{ uri: item.image }} />
        <FlatText>{item.name}</FlatText>
      </FlatContainer>
    );
  };

  return (
    <StyledSafeAreaView>
      <HeaderView>
        <HeaderText>{props.title}</HeaderText>
      </HeaderView>
      <FlatList
        data={props.data}
        onEndReached={props.onEndReached}
        keyExtractor={(product) => String(product.id)}
        onEndReachedThreshold={0.8}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={
          props.loading ? <ActivityIndicator size='large' /> : null
        }
      />
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 310px;
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-start', 'column')};
  width: 100%;
  height: 50px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.fontColors.headerColor};
`;

const FlatContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'column')};
  margin-left: 10px;
`;

const DiscountSticky = styled(View)`
  ${Mixin.flexSet('center', 'center', 'row')};
  top: 125px;
  width: 100%;
  height: 25px;
  background-color: purple;
  z-index: 1;
`;

const Countdown = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: white;
`;

const SaleText = styled(Text)`
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

const FlatImage = styled(Image)`
  width: 250px;
  height: 150px;
`;

const FlatText = styled(Text)`
  width: 150px;
  margin-top: 8px;
  color: ${Theme.fontColors.mainColor};
  font-size: 13px;
`;
