import React, { useState } from 'react';
import './styles.css';
import logoimg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft, FiTrash} from 'react-icons/fi';
import api from '../../services/api';


export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title, 
            description,
            value
        };

        try{
            const response = await api.post('incidents', data, {
                headers: {
                    auth: localStorage.getItem('ongId')
                }
            });
            history.push('/profile');
        }catch(err){
            alert(err);
        }


        
    }
   

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>

                    <img src={logoimg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente e encontre um heroi para resolver isso</p>
                    <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#e02041" /> Voltar para home</Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
    </div>
    );
}