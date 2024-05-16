
function validar(){
    event.preventDefault()
    var textoAlert = "";
    if(document.formulario.elements[0].value.length < 10){
        textoAlert += "Nome não pode ter menos de 10 caracteres \n"
    }
    console.log("teste")
    if(!document.getElementById("email").value.includes("@")){
        textoAlert += "Email tem que conter @ \n"
    }
    if(document.getElementById("comentario").value.length <= 20){
        textoAlert += "O comentário deve conter pelo menos 20 caracteres \n"
    }
    if((document.getElementById("sim").checked)){
        textoAlert += "Que bom que você voltou a visitar esta página!\n"
    }else if(document.getElementById("não").checked){
        textoAlert += "Volte sempre à esta página  \n"
    }
    alert(textoAlert);
}