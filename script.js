const BUSCADOR = document.querySelector('.texbusq');
const FOTOC = document.querySelector('#subirfoto');
const IMAGEN = document.querySelector('.imagencentral');
const IMGNAV = document.querySelector('.imagenusuario');
const TITULO = document.querySelector('.titulo');
const SUBTITULO = document.querySelector('.subtitulo');
const NOMBRE = document.querySelector('.leernom');
const BOTPR = document.querySelector(".subb2");
const PEDIDO = document.querySelector('.descpe');
var sel = -1;
const CONFIRM = document.querySelector('.confirm');
const NUBLAR = document.querySelector('.nublar');
const ULTFORM = document.querySelector('.formcnmod');
const TLULTFORM = document.querySelector('.conftx');
const DESCEMP = document.querySelector('.empresadesc');
var lupaact;

const CNT = document.querySelector('#cnt');
const BSD = document.querySelector('#bsdato');
const DSP = [document.querySelector('#dispo1'),
    document.querySelector('#dispo2'),
    document.querySelector('#dispo3')
];
const DSC = document.querySelector('.testodes');
const MR = [document.getElementById('st1') ,
     document.getElementById('st2'),
     document.getElementById('st3'),
     document.getElementById('st4'),
     document.getElementById('st5')
];
const CHE = [
    document.querySelector('#chk1'),    
    document.querySelector('#chk2'),
    document.querySelector('#chk3'),
    document.querySelector('#chk4')
]
var nombre;
const PEDIDODE = document.querySelector('#pedidode');
const CNTMENU = document.querySelector('.formcn');

FOTOC.addEventListener('blur',function(){
    if(FOTOC.files[0]){
        cargarfoto();
    }
})
BUSCADOR.addEventListener('blur',function(){
    if(BUSCADOR.value == ""){
        BUSCADOR.value="Buscar en tu cuenta de WEB DDI";
    }
    BUSCADOR.style.color = '#777777';
})




function buscar(){
    BUSCADOR.value = "";
    BUSCADOR.style.color='black' ;
}

function cargarfoto(){
    const archivo = FOTOC.files[0];
    if (!archivo) {
        alert('Por favor, selecciona un archivo.');
        return;
    }
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif'];
    if (!tiposPermitidos.includes(archivo.type)) {
        alert('Por favor, selecciona un archivo de imagen válido (JPEG, PNG, GIF).');
        return;
    }
    const lector = new FileReader();
    lector.onload = function(evento) {
        const urlImagen = evento.target.result;
        localStorage.setItem("fotouser",urlImagen);
        mostrarVistaPrevia(urlImagen);
        consultarfoto();
    };
    lector.readAsDataURL(archivo);
}

function mostrarVistaPrevia(urlImagen) {
    IMAGEN.style.backbackgroundColor = "transparent";
    IMAGEN.style.backgroundImage = `url(${urlImagen})`;
}

function consultarfoto(){
    if(localStorage.getItem("fotouser") != null){
        let urlImagen = localStorage.getItem("fotouser");
        IMGNAV.style.backbackgroundColor = "transparent";
        IMGNAV.style.backgroundImage = `url(${urlImagen})`;
    }
}

function test(){
    //localStorage.clear();
}
var guardados = false;
function guardardatos(){
    if(guardados){
        window.location.replace('Informacion.html');
    }
    
    if(NOMBRE.value!="" && !guardados){
        nombre = NOMBRE.value;
        localStorage.setItem("nom",nombre);
        SUBTITULO.innerHTML = "¿Qué quieres hacer?";
        TITULO.innerHTML = `Bienvenido ${NOMBRE.value} `;
        NOMBRE.style.display = 'none';
        BOTPR.innerHTML = "Ver información del pedido";
        BOTPR.style.height = '100px';
        guardados=true;
    }
}

function nombrepedido(){
    PEDIDODE.innerHTML= `Información del pedido de ${localStorage.getItem("nom")}`;
}
function resetmem(){
    localStorage.clear();
}
function restart(){
    localStorage.clear();   
}
var cntmost=false;
function contraseña(){
    if(!cntmost){
        CNTMENU.style.top = '320px';
        cntmost=true;
    }else{
        CNTMENU.style.top = '260px';
        cntmost=false;

    }
}


function mestrella(nest){
    sel = nest;
    nest--;
    for(let i=0;i<5;i++){
        
        MR[i].style.backgroundImage = 'url(img/negstar.png)';
        MR[i].style.filter = 'none';
    }
    for(let i=0;i<=nest;i++){
        MR[i].style.backgroundImage = 'url(img/star.png)';
        MR[i].style.filter = 'drop-shadow(1px 1px 2px #EFB81080)';
    }

} 

var uso = " ";
function guardenTodoQueVolamos(){
    uso="";
    localStorage.setItem("contra",CNT.value);
    for(let i=0;i<4;i++){
        if(CHE[i].checked){
            uso+=CHE[i].value + ", ";    
        }
    }
    localStorage.setItem("uso",uso);
    localStorage.setItem("BaseDeDatos",BSD.value);
    let dispos = "";
    for(let i=0;i<3;i++){
        if(DSP[i].selected){
            dispos+=DSP[i].value + ", ";    
        }
    }
    localStorage.setItem("dispositivo",dispos);
    localStorage.setItem("desc",DSC.value);
    window.location.replace('pedido.html');
}


function RellenarPedido(){
    document.querySelector('.tl3').innerHTML+= localStorage.getItem("nom");
    let contenido = "Pagina Web utilizada para ";
    //Acomodar el uso
    contenido+=localStorage.getItem("uso");
    contenido = contenido.substring(0,contenido.length-2);
    let alta = contenido.lastIndexOf(',');
    let aux = contenido.substring(0,alta-1);
    contenido = contenido.substring(alta-1);
    contenido = contenido.replace(","," y");
    contenido = aux + contenido + ". <br>";
    PEDIDO.innerHTML = contenido;
    //Base de datos
    let based = localStorage.getItem("BaseDeDatos");
    based = "<br>El proyecto "+based;
    based+= " utilizara una Base de datos.<br><br>"
    PEDIDO.innerHTML +=based;
    //Dispositivo
    let disp = "La pagina estara adaptada para leerse en <br>";
    disp+=localStorage.getItem("dispositivo");
    disp = disp.substring(0,disp.length-2);
    let utlcoma = disp.lastIndexOf(',');
    let aux2 = disp.substring(0,utlcoma-1);
    disp = disp.substring(utlcoma-1); 
    disp = disp.replace(","," y");
    disp = aux2 + disp + ". <br>";
    PEDIDO.innerHTML+=disp;
    //Descripcion
    let dec = "<br>La descripción del pedido es: <br>";
    dec+=localStorage.getItem("desc");
    PEDIDO.innerHTML+=dec;
}
 function modificarp(){
    window.location.replace('Informacion.html');
 }
 function enviar(){
    CONFIRM.style.display = 'block';
    NUBLAR.style.display = 'block';
 }
 function cancelar(){
    CONFIRM.style.display = 'none';
    NUBLAR.style.display = 'none';
 }
 function confirmar(){
    if(ULTFORM.value == localStorage.getItem("contra")){
        ULTFORM.style.display = 'none';
        TLULTFORM.innerHTML = "Pedido enviado con exito. <br> Porfavor espere un correo de la empresa para continuar.";
        document.querySelector('.subb5').style.display='none';
    }
 }

 function lupa(){
    let l=lupaact;
    
    if(!l){
        document.querySelector('.consulta').style.backgroundImage = 'url(img/hpcircle.png)';
        DESCEMP.style.display = 'block';
        let DescEmpresa = "WEBDDI es una empresa de desarrollo web especializada en la creacion de sitios personalizados para pequeñas empresas.";
        lupaact=true;
        setTimeout(()=>{
            setTimeout(()=>{
                document.querySelector('.txdescem').innerHTML = DescEmpresa;
            },"200")
            DESCEMP.style.width = '350px';
            DESCEMP.style.left = '965px';
            DESCEMP.style.height = '150px';

        },"10");
    }else{  
        lupaact=false;
        document.querySelector('.consulta').style.backgroundImage = 'url(img/helplogo.png)';
        let DescEmpresa = "";
        document.querySelector('.txdescem').innerHTML = DescEmpresa;
        DESCEMP.style.width = '50px';
        DESCEMP.style.left = '1265px';
        DESCEMP.style.height = '50px';
        setTimeout(()=>{
            DESCEMP.style.display = 'none';

        },"300");
    }
        
 }  