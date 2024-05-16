
function infos(){
    event.preventDefault()
    if(confirm("Abrir nova janela?")){
        if(event.target.value == "ADS"){
            window.open("https://www.fatecsorocaba.edu.br/curso_ads.asp", "_blank")    
        }
        if(event.target.value == "fabmecanica"){
            window.open("https://www.fatecsorocaba.edu.br/curso_fm.asp", "_blank")    
        }
        if(event.target.value == "projmecanicos"){
            window.open("https://www.fatecsorocaba.edu.br/curso_proj.asp", "_blank")    
        }
        if(event.target.value == "polimeros"){
            window.open("https://www.fatecsorocaba.edu.br/curso_pol.asp", "_blank")    
        }
    }
}