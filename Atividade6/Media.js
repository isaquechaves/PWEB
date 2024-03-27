nome = prompt("Qual é o seu nome?");
nota1 = prompt("nota 1");
nota1 = eval(nota1);
nota2 = prompt("nota 2");
nota2 = eval(nota2);
nota3 = prompt("nota 3");
nota3 = eval(nota3);

alert("A média de " + nome + " é " +media(nota1, nota2, nota3));

function media(p1, p2, p3)
{
    media = (p1 + p2 + p3)/3;
    return media.toFixed(2);
}