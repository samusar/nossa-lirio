import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';


import logoImg from '../../assets/logo.png';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const event = route.params.event;

    const message = `Olá ${event.leader}, estou entrando em contato para informar que desejo participar do evento *${event.title}*, você pode me informar o próximo passo?`

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Contato sobre Evento IBLV: ${event.title}`,
            recipients: [event.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${event.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>  

            <View style={styles.event}>
                <Text style={[styles.eventProperty, {marginTop: 0}]}>Equipe Responsável:</Text>
                <Text style={styles.eventValue}>{event.name}</Text>
                
                <Text style={styles.eventProperty}>Evento:</Text>
                <Text style={styles.eventValue}>{event.title}</Text>
                
                <Text style={styles.eventProperty}>Líder Responsável:</Text>
                <Text style={styles.eventValue}>{event.leader}</Text>
                
                <Text style={styles.eventProperty}>Local:</Text>
                <Text style={styles.eventValue}>{event.address}</Text>

                <Text style={styles.eventProperty}>Valor:</Text>
                <Text style={styles.eventValue}>
                {Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(event.value)}
                </Text>
            </View>
            <View style={ styles.contactBox }>
                <Text style={styles.contactTitle}>Participe deste evento!</Text>
                <Text style={styles.contactDescription}>Entre em Contato direto com os organizadores do evento e saiba mais:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}