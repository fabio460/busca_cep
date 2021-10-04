import React from "react";
function EnderecoCompleto({logradouro,cep,bairro,localidade}){
    return<>
       <h1>{cep}</h1>
       <div className='BlocoEndereco'>
            <div className='logradouro'>Rua: {logradouro}</div>
            <div className='bairro'>Bairro: {bairro}</div>
            <div className='localidade'>UF: {localidade}</div>
       </div>
       
    </>
}
export default EnderecoCompleto;