import { useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Text, TextInput, Pressable,StyleSheet } from 'react-native';
import axios from 'axios'




const TelaHome = () => {
    const [getNomeCidade, setNomeCidade] = useState('')
    const [getTempo, setTempo] = useState('')


    //preciso da funcao login

   

    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca'
        const getTempoApi = async () => {

            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${getNomeCidade}&appid=ad6a89d002b639e8b62203e0b3bc40ca`)
            .then(function (res){
                setTempo(res.data)
            })
        }

        //criar uma interface para retorno dos dados

        const login = () => {
   
            getTempoApi()
           };
       

    return (


        <View style={styles.container}>
            <TextInput style={styles.input}
                onChangeText={setNomeCidade}
                value={getNomeCidade}
                placeholder='Nome da Cidade'
            />

            <Pressable onPress={login}>
                <Text style={styles.button}>Confirmar</Text>
            </Pressable>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        alignItems:"center"
      },input:{
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#000080',
        borderRadius: 50,
        backgroundColor: 'white'
      },
      button: {
        height: 50,
        alignSelf: "center",
        borderRadius: 50,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      }
})
export default TelaHome