$(document).ready(function(){

    let slideAtual = 1
    let listaSlides = ["banner-promocao", "banner-mouse", "banner-kit", "banner-cadeira"]

    setInterval(mudarSlide, 2500)

    function mudarSlide() {

        // remover slide anterior
        if (slideAtual > 0) {

        $("#carrossel").removeClass(listaSlides[slideAtual-1])

        }else{

            $("#carrossel").removeClass(listaSlides[listaSlides.length-1])
            
        }

        //exibir slide atual 
        $("#carrossel").addClass(listaSlides[slideAtual])

        //indicar qual slide atual
        slideAtual++

        if (slideAtual > 3) {
            slideAtual = 0
        }

        if (slideAtual != 0) {
            $("#carrossel").removeClass("#conteudo-do-banner");
        }
    }
    
    $("#barras").click(function(){
       if ($("hamburger-menu").hasClass("menu-ativo")) {
            $("hamburger-menu").removeClass("menu-ativo")
       }else{
            $("hamburger-menu").addClass("menu-ativo")
       }
    })
})

function cadastrarNewsletter() {
    let email = document.getElementById("campo-email").value 
    console.log(email)
}

function mostrarMenu() {
    //Identificar o elemento MENU
    let menu = document.getElementById("menu") 

    if(getComputedStyle(menu).display == "none") {
        menu.style.display = "flex"
    }else{
        menu.style.display = "none"
    }

    //Mudar visualização do menu
   
}