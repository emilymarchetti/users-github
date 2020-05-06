import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

function DetailScreen({ navigation, route }) {
    const { user } = route.params;
    const { login, company, avatar_url } = user;
    const [loading, setLoading] = React.useState(false);

    const urlFollowers = `https://api.github.com/users/${login}/followers`;

    const submit = async () => {
        setLoading(true);

        try {
            navigation.navigate('ListFollowersScreen', { url: urlFollowers });
        } catch (error) {
            alert(`Seguidores do usuário ${user.login} não encontrado.`)
        }

        setLoading(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.image} source={{ uri: avatar_url }}></Image>
            <Text style={styles.text}>{ login }</Text>
            <Text>{ company }</Text>

            <TouchableOpacity
                style={styles.button}
                disabled={loading}
                onPress={() => { submit(); }}>

                {!loading && <Text style={styles.textButton}>Seguidores</Text>}
                {loading  && <ActivityIndicator color="white" />}
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 5,
        borderColor: 'white'
    },
    text: {
        fontSize: 20
    },
    button: {
        width: 200,
        height: 30,
        borderRadius: 4,
        marginTop: 20,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default DetailScreen;