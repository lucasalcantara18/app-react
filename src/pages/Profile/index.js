import React, {useEffect, useState} from 'react';
import './styles.css';
import logoimg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash} from 'react-icons/fi';
import api from '../../services/api';


export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const histiry = useHistory();

    useEffect(() => {
    
        api.get('incidentsOne', {
            headers: {
                auth: localStorage.getItem('ongId')
            }
        }).then(response => {
            setIncidents(response.data);
        })

    }, [localStorage.getItem('ongId')]);


    async function handleDeletionIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    auth: localStorage.getItem('ongId')
                }
            });
            setIncidents(incidents.filter(incidnet => incidnet.id !== id));
        }catch(err){
            alert(err);
        }
    }

    function logout(){
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        histiry.push('/');
    }

    return (
      <div className="profile-container">
          <header>
            <img src={logoimg} alt="Be the Hero"/>
            <span>Bem Vindo, {localStorage.getItem('ongName')}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
            <button type="button" onClick={logout}>
                <FiPower size={18} color="#e02041"></FiPower>
            </button>
          </header>

          <h1>Casos Cadastrados</h1>

          <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>
                                    
                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeletionIncident(incident.id)}>
                        <FiTrash size={20} color="#a8a8b3"/>
                    </button>
                </li>
            ))}
          </ul>

      </div>
    );

}