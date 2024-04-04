setInterval(() => {
    console.log("dnv");
    const escolha = parseInt(
        prompt("Insira a sua escolha: \n 1 - Pedra \n 2 - Papel \n 3 - Tesoura")
        );
    
    const pcEscolha = getRandomArbitrary();
    function getRandomArbitrary() {
        return Math.floor(Math.random() * (3) + 1);
    }
    
    switch (true) {
        case (escolha === pcEscolha):
            alert("Empate! A sua escolha foi: " + escolha + " a escolha do pc foi: " + pcEscolha)
            break;
        case (escolha == 1 && pcEscolha == 3):
            alert("Você ganhou! Sua escolha foi: " + escolha + " a escolha do pc foi: " + pcEscolha);
            break;
        case (escolha == 2 && pcEscolha == 1):
            alert("Você ganhou! Sua escolha foi: " + escolha + " a escolha do pc foi: " + pcEscolha);
            break;
        case (escolha == 3 && pcEscolha == 2):
            alert("Você ganhou! Sua escolha foi: " + escolha + " a escolha do pc foi: " + pcEscolha);
            break;
        default:
            alert("O pc ganhou! Sua escolha foi: " + escolha + " a escolha do pc foi: " +pcEscolha)
            break;
    }
}, 1000)
   

