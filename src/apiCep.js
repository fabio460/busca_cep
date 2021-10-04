import React, {  useState } from 'react';
import logo  from './logo.png';
import EnderecoCompleto from './enderecos';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom';
function BuscarCep(){
    const [campo,setCampo]=useState('');
    const [uf,setUf]=useState('');
    const [cidade,setCidade]=useState('');
    const [rua,setRua]=useState('');
    const [Enderecos,setEnderecos]=useState([]);
    

    const buscoEndereco = ()=>{
    fetch(`https://viacep.com.br/ws/${campo}/json/`)
        .then(res=>res.json())
        .then(item=>{
            document.querySelector('.rua').innerHTML='Rua: '+item.logradouro;
            document.querySelector('.bairro').innerHTML='Bairro: '+ item.bairro;
            if(item.complemento){
              document.querySelector('.complemento').innerHTML='Complemento: '+item.complemento;
            }else{document.querySelector('.complemento').innerHTML=''}
            document.querySelector('.localidade').innerHTML='Cidade: '+item.localidade;
            document.querySelector('.ddd').innerHTML='DDD: '+item.ddd;
            document.querySelector('.uf').innerHTML='UF: '+item.uf;
            
        })
        .catch(res=>alert('cep invalido ou campo nulo'));
    }
    
    const buscaCep = ()=>{
        fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
          .then(res=>res.json())
          .then(item=>{ 
            setEnderecos(item);
          })
          .catch(res=>{
            alert('endereço invalido ou campo nulo');
          });
          
    }
   
    return<>
        
        <BrowserRouter>
            <header>  
            
            <a href='https://fabio460.github.io/Portifolio/' target='_blank' rel="noreferrer"><img src={logo} alt=''/></a>  
            <h5>Buscador de endereços</h5>
                <div className='header_right'>
                <Link to='/endereco'>
                  
                  <h4>Por endereço</h4>
                </Link>
                <Link to='/'>
                  <h4>Por cep</h4>
                </Link>
                </div>
            </header>
            <Switch>
                <Route exact='/' path='/'>
                  <div className='mainCep'>
                  
                  <h1>Busca endereço</h1>
                    <div className='headerCep'>
                     
                      <input type='text' placeholder='cep' id='cep' onChange={(e)=>{setCampo(e.target.value.replace("-",""))}}/>
                      <button onClick={buscoEndereco}>buscar</button>
                    </div>
                    <div className='bodyCep'>
                        <div className='rua'></div>
                        <div className='bairro'></div>
                        <div className='complemento'></div>
                        <div className='localidade'></div>
                        <div className='ddd'></div>
                        <div className='uf'></div>
                    </div>
                  </div>
                </Route>
                <Route path='/endereco'>
                    <div className='mainEndereco'>
                        <h1>Buscar Cep</h1>
                        <input type='text' placeholder='uf' value={uf} onChange={(e)=>{setUf(e.target.value)}}/>
                        <input type='text' placeholder='cidade' value={cidade} onChange={(e)=>{setCidade(e.target.value)}}/>
                        <input type='text' placeholder='rua' value={rua} onChange={(e)=>{setRua(e.target.value)}}/>
                        <button onClick={buscaCep}>buscar Cep</button>
                        <div className='bodyEndereco'>
                           {Enderecos.map((item)=>{return <EnderecoCompleto cep={item.cep} logradouro={item.logradouro} localidade={item.localidade} bairro={item.bairro}/>})}
                   
                        </div>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
       

       
        
    </>
}
export default BuscarCep;