import { useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Text, TextInput, Pressable,StyleSheet } from 'react-native';
import axios from 'axios'




const TelaHome = () => {
    const [getNomeCidade, setNomeCidade] = useState('')
    const [getTempo, setTempo] = useState('')


    //preciso da funcao login

    const apikey = 'ad6a89d002b639e8b62203e0b3bc40ca'
        const getTempoApi = async () => {

            await axios.get(`hhtp://api.openweathermap.org/data/3.0/weather?q=${getNomeCidade}&appid=${apikey}`)
            .then(function (res){
                console.log(res.data)
            })
        }

        useEffect(() => {
        getTempoApi()},
        [])

    return (


        <View style={styles.container}>
            <TextInput style={styles.input}
                onChangeText={setNomeCidade}
                value={getNomeCidade}
                placeholder='Nome da Cidade'
            />

            <Pressable>
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