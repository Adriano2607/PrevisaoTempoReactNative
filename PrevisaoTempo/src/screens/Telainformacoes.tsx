import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, Alert } from "react-native";
import { SysData, WeatherData, mainData } from "./TelaHome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TelaInformacoes = ({ route }: any) => {

    const { cidade } = route.params;



    const [getTempo, setTempo] = useState<WeatherData[]>([]);
    const [getSys, setSysData] = useState<SysData>();
    const [getMain, setMain] = useState<mainData>();
    const [getCidade, setCidade] = useState('')
    const navigation = useNavigation();
    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca';


    const getTempoApi = async () => {



        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}`);
            const { sys, weather, main, name } = res.data;
            setTempo(weather);
            setSysData(sys);
            setMain(main)
            setCidade(name)
        } catch (error) {
            Alert.alert("Cidade nao Encontrada !!!")
            navigation.goBack()
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
                    <View style={styles.content}>

                        <View style={styles.primeiro}>
                            <Text style={{ fontWeight: "700", fontSize: 20 }}>{getCidade}</Text>
                            <Text style={{ fontWeight: "700", fontSize: 20 }}>, {getSys?.country}</Text>
                        </View>


                        <Text style={{ fontWeight: "900", fontSize: 50 }}>{getMain?.temp ? (getMain?.temp - 273.15).toFixed(0) + "°C" : "N/A"}</Text>

                        <Text style={styles.textos}>{item.main}</Text>
                        <Text>Description: {item.description}</Text>



                        <Text>Temp Max: {getMain?.temp_max ? (getMain?.temp_max - 273.15).toFixed(0) + "°C" : "N/A"}</Text>
                        <Text>Temp Min: {getMain?.temp_min ? (getMain?.temp_min - 273.15).toFixed(0) + "°C" : "N/A"}</Text>
                        <Text>Feels Like: {getMain?.feels_like ? (getMain.feels_like - 273.15).toFixed(0) + "°C" : "N/A"}</Text>

                        <Text>Humidity: {getMain?.humidity} %</Text>
                        <Text>Pressure: {getMain?.pressure} Pa</Text>
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
    }, primeiro: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"


    }, content: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: '#9CDDFF',
        padding: 20,
        borderRadius: 10
    }, textos: {
        fontSize: 25,
        marginBottom: 5
    }

});

export default TelaInformacoes

// <Image style={{ height: 50 }} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />
