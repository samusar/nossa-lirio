import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../Services/api';


export default function NewEvent(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [address, setAddress] = useState('');
    
    const ministrieId = localStorage.getItem('ministrieId');

    const history = useHistory();


    async function handleRegister(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
            address,
        };

        try {
            await api.post('event', data, {
                headers: {
                    Authorization: ministrieId,
                }
            });

            history.push('/profile');

        } catch (e) {
            alert('Erro ao armazenar os dados, tente novamente.')
        }
    }

    return (
        <div className="new-events-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Nossa Lirio"/>

                    <h1>Cadastrar novo evento</h1>
                    <p>Descreva as principais informações sobre seu evento para visualização dos membros.</p>

                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Titulo" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea  
                        placeholder="Descrição do evento"
                        value={description}
                        onChange={e => setDescription(e.target.value)}

                    />
                    <input 
                        placeholder="Valor em R$"
                        value={value}
                        onChange={e => setValue(e.target.value)}

                    />
                    <input 
                        placeholder="Endereço"
                        value={address}
                        onChange={e => setAddress(e.target.value)}

                    />
                    
                    <button 
                        className="button" 
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}