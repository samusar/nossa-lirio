import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Events(){
    const [events, setEvents] = useState([]);
    const [total, setTotal] = useState(0);
    
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    function navigateToDetail(event){
        navigation.navigate('Detail', {event});
    }

    async function loadEvents(){
        if(loading){
            return;
        }

        if(total > 0 && events.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('event', {
            params: {
                page
            }
        });
        //setEvents(response.data);
        setEvents([... events, ... response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} eventos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Participe de nossas programações:</Text>
        
            <FlatList 
                data={events}
                style={styles.eventList}
                keyExtractor={event => String(event.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadEvents}
                onEndReachedThreshold={0.2}
                renderItem={( { item: event } ) => (
                    <View style={styles.event}>
                        <Text style={styles.eventProperty}>Responsável:</Text>
                        <Text style={styles.eventValue}>{event.name}</Text>
                        
                        <Text style={styles.eventProperty}>Evento:</Text>
                        <Text style={styles.eventValue}>{event.title}</Text>

                        <Text style={styles.eventProperty}>Valor:</Text>
                        <Text style={styles.eventValue}>
                            {Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(event.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(event) }
                        >
                            <Text style={styles.detailsButonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}