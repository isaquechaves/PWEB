const prompt = require('prompt-sync')();

function entradaNome(callback){
    var nome = prompt('Digite seu nome:');
    callback(nome);
}

entradaNome(saudacao);

function saudacao(nome){
    console.log("Oi " + nome);
}