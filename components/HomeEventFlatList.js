import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import { Mixin } from '../styles/Mixin';
import { Theme } from '../styles/Theme';

export default HomeEventFlatList = (props) => {
  return (
    <StyledContainer>
      <HeaderView>
        <HeaderText>{props.title}</HeaderText>
      </HeaderView>
      {props.data
        .filter((product) => product.id < 3)
        .map((product) => (
          <EventContainer key={product.id}>
            <EventImage source={{ uri: product.coverImage }} />
            <EventText>
              <EventTitle>{product.title}</EventTitle>
              <EventDescription>{product.description}</EventDescription>
            </EventText>
          </EventContainer>
        ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(View)`
  width: 390px;
  height: 420px;
  background-color: ${Theme.colors.containerColor};
`;

const HeaderView = styled(View)`
  ${Mixin.flexSet('flex-end', 'flex-start', 'column')};
  width: 390px;
  height: 50px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.fontColors.headerColor};
`;

const EventContainer = styled(View)`
  ${Mixin.flexSet('flex-start', 'center', 'row')};
  margin-left: 10px;
`;

const EventImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const EventText = styled(View)`
  width: 100%;
  margin-left: 15px;
`;

const EventTitle = styled(Text)`
  color: ${Theme.fontColors.headerColor};
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 5px;
`;

const EventDescription = styled(Text)`
  color: ${Theme.fontColors.descriptionColor};
  font-size: 12px;
`;
