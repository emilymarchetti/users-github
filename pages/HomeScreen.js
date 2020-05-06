import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

function HomeScreen({ navigation }) {
    const [user, setUser] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const url = `https://api.github.com/users/${user}`;

    const submit = async () => {
        setLoading(true);
        
        try {
            const response = await axios.get(url);
            navigation.navigate('Detail', { user: response.data });
        } catch (error) {
            alert("Usuário não encontrado.")
        }

        setLoading(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={styles.title}>Nome de Usuário: </Text>

            <TextInput value={user} onChangeText={setUser} style={styles.input} />
            <TouchableOpacity 
                style={styles.button} 
                disabled={loading} 
                onPress={() => { submit(); }}>

                {!loading && <Text style={styles.textButton}>Consultar</Text>}
                {loading && <ActivityIndicator color="white" />}
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        width: 200,
        height: 20,
        borderBottomWidth: 2,
        marginBottom: 20,
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        width: 200,
        height: 30,
        borderRadius: 4,
        marginBottom: 20,
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

export default HomeScreen;