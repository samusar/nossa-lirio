import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import {FiPower,FiTrash2 } from 'react-icons/fi';
import api from '../../Services/api';
import { parseISO, format } from 'date-fns';


import './styles.css';

export default function Profile(){
    const [events, setEvents] = useState([]);
    
    const ministrieId = localStorage.getItem('ministrieId');
    const ministrieName = localStorage.getItem('ministrieName');

    const history = useHistory();
    useEffect(() => {
        api.get('profile/ministrie', {
            headers: {
                Authorization: ministrieId,
            }
        }).then(response => {
            setEvents(response.data)
        })
    }, [ministrieId]);

    async function handleDeleteEvent(id){
        try {
            await api.delete(`event/${ id }`,{
                headers:{
                    Authorization: ministrieId,
                }
            });

            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            alert('Erro ao deletar evento, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Nossa Lirio"/>
                <span>Bem Vindo, {ministrieName}</span>

                <Link className="button" to="/events/new">Cadastrar novo Evento</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Eventos Cadastrados</h1>
            
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>EVENTO:</strong>
                        <p>{ event.title }</p>

                        <strong>Data:</strong>
                        <p>{ format(parseISO(event.date),"dd'/'MM'/'yyyy") }</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ event.description }</p>

                        <strong>ENDEREÇO:</strong>
                        <p>{ event.address }</p>

                        <strong>VALOR:</strong>
                        <p>{ ((event.value !== 0)?Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.value):'Grátis')}</p>

                        <button onClick={() => handleDeleteEvent(event.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    ); 
}