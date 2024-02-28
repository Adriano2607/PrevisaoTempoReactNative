import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View,StyleSheet } from "react-native";
import { SysData, WeatherData, mainData } from "./TelaHome";
import axios from "axios";

const TelaInformacoes = ({ route }: any) => {

    const { cidade } = route.params;



    const [getTempo, setTempo] = useState<WeatherData[]>([]);
    const [getSys, setSysData] = useState<SysData>();
    const [getMain, setMain] = useState<mainData>();
    const[getCidade,setCidade] = useState('')

    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca';


    const getTempoApi = async () => {

       
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}`);
            const { sys, weather ,main, name} = res.data;
            setTempo(weather);
            setSysData(sys);
            setMain(main)
            setCidade(name)
        } catch (error) {
            console.error('Erro', error);
        }
    };

    

    useEffect(() => {
        getTempoApi();
    }, []);

    return (

        <View style={styles.container}>
            <FlatList
                data={getTempo}
                renderItem={({ item }) => (
                    <View>
                         
                            <View>
                            <Text>Cidade: {getCidade}</Text>
                            <Text>Pais: {getSys?.country}</Text>
                            </View>

                            <View>
                            <Image style={{ height: 50 }} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />
                            <Text>{getMain?.temp ? (getMain?.temp - 273.15).toFixed(0) + "°C" : "N/A"}</Text>
                            </View>
                         
                         
                         
                         
                         
                       
                     
                         <Text>Temperatura Maxima:{getMain?.temp_max ? (getMain?.temp_max - 273.15).toFixed(0) + "°C" : "N/A"}</Text>
                         <Text>Temperatura Minima: {getMain?.temp_min ? (getMain?.temp_min - 273.15).toFixed(0) + "°C" : "N/A"}</Text>
                         <Text>Feels Like: {getMain?.feels_like ? (getMain.feels_like - 273.15).toFixed(0) + "°C" : "N/A"}</Text>

                        <Text>Humidity: {getMain?.humidity} %</Text>
                        <Text>Pressure: {getMain?.pressure} Pa</Text>
                        <Text>Main: {item.main}</Text>
                        <Text>Description: {item.description}</Text>
                       
                       
                        
                      
                    
                      
                       
                        <Text>Sunrise: {getSys ? new Date(getSys.sunrise * 1000).toLocaleTimeString() : ''}</Text>
                        <Text>Sunset: {getSys ? new Date(getSys.sunset * 1000).toLocaleTimeString() : ''}</Text>
                    </View>
                )}
                keyExtractor={(item) => String(item.id)}
            />
        </View>

    )
}

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

export default TelaInformacoes