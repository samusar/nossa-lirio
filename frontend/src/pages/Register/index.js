import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../Services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [leader, setLeader] = useState('');
    const [logo, setLogo] = useState('');
    
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp, 
            leader,
            logo
        };

        try {
            const response = await api.post('ministrie', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (e) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Nossa Lirio"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e informe aos membros de nossa Igreja sobre os eventos do seu ministério.</p>

                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do Ministério" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}

                    />

                    <div className="input-group">
                        <input 
                            placeholder="Liredes do Ministério"
                            value={leader}
                            onChange={e => setLeader(e.target.value)}
                            
                        />
                        <input 
                            placeholder="Logo do Ministério" style={{ width: 80 }} 
                            value={logo}
                            onChange={e => setLogo(e.target.value)}

                        />
                    </div>
                    
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}