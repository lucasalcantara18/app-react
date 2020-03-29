import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';


export default function Logout(){
    const [id, setId] = useState('');
    const histiry = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try{
            const response = await api.post('sessionIni', {id});
            console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            histiry.push('/profile');
        }catch(err){
            alert(err);
        }


        
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoimg} alt="Be the Hero" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input  placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>


                    <Link className="back-link" to="/register"><FiLogIn size={16} color="#e02041" />  Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesimg} alt="Heroes"/>
        </div>

    );

}