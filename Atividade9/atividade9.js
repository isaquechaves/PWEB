let peso = parseFloat(prompt("Insira o peso, ex.: 55,5").replace(",","."));
let altura = parseFloat(prompt("Insira a altura, ex.: 1,65").replace(",","."));

function calculaImc(peso, altura){
    return peso/Math.pow(altura,2);
}

let imc = calculaImc(peso, altura);
switch (true) {
    case imc < 18.5 :
        alert("Menor que 18,5. Magreza e grau 0");
        break;
    case imc < 24.9 :
        alert("Entre 18,5 e 24,9. Normal e grau 0");
    break;
    case imc < 29.9 :
        alert("Entre 25 e 29,9. Normal e grau 1");
    break;
    case imc < 39.9 :
        alert("Entre 30 e 39,9. Normal e grau 2");
    break;
    default:
        alert("Acima de 40. Obersidade grave e grau 3");
    break;
}