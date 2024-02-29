import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, Alert } from "react-native";
import { SysData, WeatherData, mainData } from "./TelaHome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const TelaInformacoes = ({ route }: any) => {

    const { cidade } = route.params;



    const [getTempo, setTempo] = useState<WeatherData[]>([]);
    const [getSys, setSysData] = useState<SysData>();
    const [getMain, setMain] = useState<mainData>();
    const [getCidade, setCidade] = useState('')
    const navigation = useNavigation();
    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca';


    const goBack = () => {
        navigation.goBack()
    }

    const getTempoApi = async () => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&lang=pt_br&units=metric`);
            const { sys, weather, main, name } = res.data;
            setTempo(weather);
            setSysData(sys);``
            setMain(main)
            setCidade(name)
        } catch (error) {
            Alert.alert("Cidade nao Encontrada !!!")
           goBack()
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

                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <FontAwesome5 name="temperature-high" size={20} color="black" />
                        <Text style={{ fontWeight: "900", fontSize: 50,marginLeft:5 }}>{getMain?.temp ? getMain?.temp .toFixed(0) + "°C" : "N/A"}</Text>
                        </View>
                       

                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <Text style={styles.textos}>{item.main}</Text>
                        <Image style={{ height: 60,width:50 }} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />

                        </View>
                        <Text style={{fontSize:25,textTransform:"capitalize",marginBottom:10}}>{item.description}</Text>


                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <FontAwesome5 name="temperature-low" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Temp Max: {getMain?.temp_max ? getMain?.temp_max .toFixed(0) + "°C" : "N/A"}</Text>
                        </View>



                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <FontAwesome5 name="temperature-low" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Temp Min: {getMain?.temp_min ? getMain?.temp_min.toFixed(0) + "°C" : "N/A"}</Text>
                        </View>

                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <FontAwesome6 name="temperature-three-quarters" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Feels Like: {getMain?.feels_like ? getMain.feels_like.toFixed(0) + "°C" : "N/A"}</Text>
                        </View>

                        <View style={{flexDirection:"row",alignItems:'center'}}>

                        <MaterialCommunityIcons name="air-humidifier" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Humidity: {getMain?.humidity} %</Text>
                        </View>

                        
    
                        
                        <View style={{flexDirection:"row",alignItems:'center'}}>

                        <MaterialCommunityIcons name="car-brake-low-pressure" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Pressure: {getMain?.pressure} Pa</Text>
                        </View>

                        
                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <Feather name="sunrise" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Sunrise: {getSys ? new Date(getSys.sunrise * 1000).toLocaleTimeString() : ''}</Text>
                        </View>
                       
                       
                        <View style={{flexDirection:"row",alignItems:'center'}}>
                        <Feather name="sunset" size={20} color="black" />
                        <Text style={{marginLeft:5}}>Sunset: {getSys ? new Date(getSys.sunset * 1000).toLocaleTimeString() : ''}</Text>
                        </View>

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
     
    }

});

export default TelaInformacoes


