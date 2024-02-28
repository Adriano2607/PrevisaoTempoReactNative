import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { Button, theme } from 'galio-framework';
import { Input, Block } from 'galio-framework';



export interface WeatherData {
    id: number;
    description: string;
    icon: string;
    main: string;
}

export interface SysData {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface mainData {
    temp: number 
    humidity: number
    pressure: number 
    temp_max: number
    temp_min: number
    feels_like:number
 
}


const TelaHome = ({ navigation }: any) => {
    const [getNomeCidade, setNomeCidade] = useState('');



    const navigateToOutraTela = () => {
        if (getNomeCidade) navigation.navigate('TelaInformacoes', { cidade: getNomeCidade });
        else    Alert.alert("Informe os dados GENIO!!!")
    };



    return (
        <View style={styles.container}>
          
                <Input placeholder="Cidade" rounded right
                    icon="map-pin"
                    family="Feather"
                    iconSize={15}
                    iconColor="blue"
                    style={styles.input}
                    onChangeText={setNomeCidade}
                    value={getNomeCidade}
                />

         

            <Button round size="large" color="info" onPress={navigateToOutraTela}>Pesquisar</Button>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }, input: {
        width: '90%'
    }
});

export default TelaHome;
