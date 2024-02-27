import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

interface WeatherData {
    id: number;
    description: string;
    icon: string;
    main: string;
}

interface SysData {
    country: string;
    sunrise: number;
    sunset: number;
}

const TelaHome = () => {
    const [getNomeCidade, setNomeCidade] = useState('');
    const [getTempo, setTempo] = useState<WeatherData[]>([]);
    const [getSys, setSysData] = useState<SysData | null>(null);


    console.log(getTempo)
    console.log(getSys)
    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca';
    const getTempoApi = async () => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${getNomeCidade}&appid=${apikey}`);
            const { sys, weather } = res.data;
            setTempo(weather);
            setSysData(sys);
        } catch (error) {
            console.error('Erro', error);
        }
    };

    const login = () => {
        getTempoApi();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setNomeCidade}
                value={getNomeCidade}
                placeholder='Nome da Cidade'
            />
            <Button onPress={login} title='Pesquisar' />

            <FlatList
                data={getTempo}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description}</Text>
                        <Image style={{ height: 50 }} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />
                        <Text>{item.main}</Text>
                        <Text>Sunrise: {getSys ? new Date(getSys.sunrise * 1000).toLocaleTimeString() : ''}</Text>
                        <Text>Sunset: {getSys ? new Date(getSys.sunset * 1000).toLocaleTimeString() : ''}</Text>
                    </View>
                )}
                keyExtractor={(item) => String(item.id)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#000080',
        borderRadius: 50,
        backgroundColor: 'white',
    },
});

export default TelaHome;
