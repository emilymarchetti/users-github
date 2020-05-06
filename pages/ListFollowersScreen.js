import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const ListFollowersScreen = ({ navigation, route }) => {
  const { url } = route.params;
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(url);
      setFollowers(data);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  const viewProfile = async (login) => {
    setLoading(true);

    try {
      const url = `https://api.github.com/users/${login}`;
      const response = await axios.get(url);
      navigation.navigate('Detail', { user: response.data });
    } catch (error) {
      alert("Usuário não encontrado.")
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: 50,
                backgroundColor: '#f4f4f4',
                justifyContent: 'center',
                paddingLeft: 16,
              }}
            >
              {!loading && <Text>{`Total de seguidores: ${followers.length}`}</Text>}
              {loading && <Text>carregando...</Text>}
            </View>
          );
        }}
        data={followers}
        renderItem={({ item: { login, avatar_url } }) => {
          return (
            <TouchableOpacity onPress={() => { viewProfile(login); }}>
              <View style={styles.row}>
                <Image style={styles.photo} source={{ uri: avatar_url }}></Image>
                <Text>{login}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default ListFollowersScreen;

const styles = StyleSheet.create({
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#DDD',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 200,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F51657',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
