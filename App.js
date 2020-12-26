import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';

const LIMIT = 10;

export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Image source={{ uri: item.url }} style={styles.image} />
      </View>
    );
  };

  const onEndReached = () => {
    getData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => String(item.id)}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListHeaderComponent={<Text>zzzz</Text>}
        ListFooterComponent={
          loading ? <ActivityIndicator size='large' /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
