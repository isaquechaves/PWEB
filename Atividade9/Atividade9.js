let idade = [];
let sexo = [];
let opiniao = [];

for (let i = 0; i < 5; i++) {
    idade.push(parseInt(prompt("Digite sua idade")));
    sexo.push(parseInt(prompt("Digite seu sexo, 1 para homem e 2 para mulher")));
    opiniao.push(parseInt(prompt("Digite sua opinião")));
}

function survey(idade, sexo, opiniao) {
    const soma = idade.reduce((acumulador, elemento) => acumulador + elemento, 0);
    const media = soma / idade.length;

    const maiorIdade = Math.max(...idade);
    const menorIdade = Math.min(...idade);

    const qtdePessimo = opiniao.filter(a => a == 1).length;

    const qtdeOtimoBom = opiniao.filter(a => a == 4 || a == 3).length / (opiniao.length) * 100;

    const qtdeHomens = sexo.filter(a => a == 1).length;
    const qtdeMulheres = sexo.filter(a => a == 2).length;

    return `A média das idades é: ${media} 
     \n A idade da pessoa mais velha é: ${maiorIdade}
     \n A Idade da pessoa mais nova é: ${menorIdade}
     \n A quantidade de pessoas que responderam péssimo é: ${qtdePessimo}
     \n A porcentagem de pessoas que responderam ótimo e bom é: ${qtdeOtimoBom}
     \n O número total de mulheres é: ${qtdeMulheres}
     \n O número total de homens é: ${qtdeHomens}`
}

alert(survey(idade, sexo, opiniao));
