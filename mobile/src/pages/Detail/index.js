import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostariad e ajudar no CASO ${incident.title} com o VALOR de ${formatedIncidentValue}`;
  const formatedIncidentValue = Intl
  .NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
  .format(incident.value);


  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5548991507060&text=${message}`)

  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={30} color="#E02041"></Feather>
        </TouchableOpacity>
      </View>
      {/* End Header */}

      {/* incidents */}

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{
          formatedIncidentValue
        }</Text>
      </View>

      {/*End incidents */}

      {/*End contact Box */}

      <View style={styles.contactBox}>

        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
        <Text style={styles.heroDescription}>entre em contato:</Text>
        <View style={styles.actions}>

          <TouchableOpacity
            style={styles.actionsButton}
            onPress={sendWhatsapp}>
            <Text style={styles.actionsButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionsButton}
            onPress={sendMail}
          >
            <Text style={styles.actionsButtonText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*End contact Box */}
    </View>
  )
}