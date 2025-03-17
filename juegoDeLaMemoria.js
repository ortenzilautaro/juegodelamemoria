// Declaro variables, constantes y arrays

const tablero = document.getElementById("tablero")
const boton = document.getElementById("boton")
const comentario = document.createElement("p")
let turno = 0
const cartasAdivinadas = []
let cartaElegida = []
const nombres = []
const ranking = JSON.parse(localStorage.getItem(`ranking`)) || []

// Objeto que almacena el nombre y las imágenes de las cartas
const imagenesCartas = [
    {nombre: "Homero", src: "https://e7.pngegg.com/pngimages/899/333/png-clipart-homer-simpson-bart-simpson-lisa-simpson-maggie-simpson-sideshow-bob-bart-simpson-homer-simpson-bart-simpson.png"},
    {nombre: "Marge", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodKaiI3rnAE6_nVUr8wMnExj85RAnDf-fVA&s"},
    {nombre: "Maggie", src: "https://i.pinimg.com/474x/96/33/1b/96331b3790fa4d64549374cab5670209.jpg"},
    {nombre: "Lisa", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpaJZquLmxh8KFoAQRcRU5FYmkivBcgwvt9Q&s"},
    {nombre: "Bart", src: "https://w7.pngwing.com/pngs/506/281/png-transparent-bart-simpson-s-guide-to-life-homer-simpson-marge-simpson-maggie-simpson-bart-simpson-bart-simpson-illustration-kids-funny-fictional-character-thumbnail.png"},
    {nombre: "Homero", src: "https://e7.pngegg.com/pngimages/899/333/png-clipart-homer-simpson-bart-simpson-lisa-simpson-maggie-simpson-sideshow-bob-bart-simpson-homer-simpson-bart-simpson.png"},
    {nombre: "Marge", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodKaiI3rnAE6_nVUr8wMnExj85RAnDf-fVA&s"},
    {nombre: "Maggie", src: "https://i.pinimg.com/474x/96/33/1b/96331b3790fa4d64549374cab5670209.jpg"},
    {nombre: "Lisa", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpaJZquLmxh8KFoAQRcRU5FYmkivBcgwvt9Q&s"},
    {nombre: "Bart", src: "https://w7.pngwing.com/pngs/506/281/png-transparent-bart-simpson-s-guide-to-life-homer-simpson-marge-simpson-maggie-simpson-bart-simpson-bart-simpson-illustration-kids-funny-fictional-character-thumbnail.png"}
];

// Creo funcion que me edite el parrafo en el juego (ejemplo: "Ese nombre no es válido")
const CrearComentario = (elemento, texto, colorElegido)=>{
    comentario.textContent=`${texto}`
    comentario.style.color=`${colorElegido}`
    comentario.classList.add("parrafo")
    elemento.appendChild(comentario)
}

// Creo funcion para la eleccion de las cartas
const elegirCarta = (eleccion) => {
    // Borro comentario si es que existe
    if (comentario){
    comentario.remove()}

    let cartaDiv = eleccion.currentTarget

    // Pongo un IF para que si el div NO tiene una img haga lo que está debajo
    if(!cartaDiv.querySelector("img")){
    let nroCarta = cartaDiv.getAttribute("data-index")

    // Verifico si ya hay una imagen, si no, se crea
    let img = cartaDiv.querySelector("img")
    if (!img) {
        img = document.createElement("img")
        img.src = imagenesCartas[nroCarta].src; // Obtengo la img del array
        img.alt = imagenesCartas[nroCarta].nombre // Obtengo el alt del array
        cartaDiv.appendChild(img)
        img.classList.add("imagen-cartas-visibles")
    }

    cartaElegida.push(img); //Pusheo al array la imagen para que quede guardado y cuando haga la 2da eleccion sepa cual elegí primero

    // Este IF es para cuando ya se escogen las 2 cartas
    if (cartaElegida.length === 2) {
        tablero.classList.add("bloqueo") //Agrego una clase para bloquear el evento en el tablero y no puedan hacer más clicks
        // Comparo las cartas por medio del ALT que fue agregado anteriormente
        let carta1 = cartaElegida[0].getAttribute("alt")
        let carta2 = cartaElegida[1].getAttribute("alt")
        turno+=1

        let turnoActual = document.getElementById("turno-dato")
        turnoActual.textContent = `TURNO: ${turno}`

        // Si las 2 cartas tienen el mismo ALT se ejecuta el código (es imposible q las 2 sean la misma carta, ya que antes verifique que no se pueda proceda el código sin clickear una que no sea visible)
        if (carta1 === carta2) {
            CrearComentario(tablero, `Muy bien! acertaste un par de cartas`, `white`)
            cartasAdivinadas.push(carta1)
            cartasAdivinadas.push(carta2)
            cartaElegida = [];
            tablero.classList.remove("bloqueo") //Elimino el bloqueo del tablero así se puede clickear
        } else { // Si no son iguales se ejecuta otro código
            CrearComentario(tablero, `Las cartas no son iguales`, `red`)
            setTimeout(() => {
                cartaElegida.forEach(carta => {
                    carta.remove(); // Eliminamos la imagen si no coinciden
                });
                cartaElegida = [];
                tablero.classList.remove("bloqueo") //Elimino el bloqueo del tablero así se puede clickear
            }, 1000);
        }
    }
    // Por último si ya tengo las 10 cartasAdivinadas con 10 elementos se ejecuta el siguiente código
    if(cartasAdivinadas.length=== 10){
        setTimeout(()=>{
        ranking.push({nombre:nombres[nombres.length-1],turno:turno}) //Pusheo en ranking para dsp añadirlo
        tablaRanking() //Ejecuto función de ranking
        localStorage.setItem(`ranking`, JSON.stringify(ranking)) // Guardo el localstorage
        volverAJugar() // Ejecuto funcion de volver a jugar
        // Vuelvo el array y los turnos a 0 para una nueva partida
        cartasAdivinadas.length=0 
        turno=0
        }, 1000)
    }
}
// Acá esta lo que sigue del código anterior, si el div tiene una img, se ejecuta este código
else{
    CrearComentario(tablero, `No puede elegir una carta visible`, `red`)}
};

// Creo funcion donde se crean las cartas una vez que se apreta el botón JUGAR
const crearCartas = ()=>{
    imagenesCartas.sort(()=>Math.random() - 0.5) //Hago que el array se mezcle cada vez q inicie una partida

    const tableroChico = document.createElement("div")
    imagenesCartas.forEach((elemento, index) => { //Por cada elemento del array quiero que se cree un DIV y añadirle el atributo data-index para identificarlos
    const cartaUnica = document.createElement("div")

        cartaUnica.classList.add("div-imagen-cartas-escondidas")
        cartaUnica.setAttribute("data-index", index)

        tableroChico.appendChild(cartaUnica)
        tableroChico.classList.add("organizacion")
        tablero.appendChild(tableroChico)

        cartaUnica.addEventListener("click", elegirCarta) // Le agrego a los div que cree el evento elegirCarta, así se crean imagenes dentro del div y son visibles las imagenes

    });
}

// Creo funcion jugar que me crea el inicio del juego, donde el usuario ingresa su nombre y hace click en JUGAR para iniciar partida
const jugar = ()=>{
        const tableroInicial = document.createElement("div")
        const tableroInicialTexto = document.createElement("label")
        const tableroInicialInput= document.createElement("input")
        const tableroInicialBoton = document.createElement("button")
        const datos =document.createElement("div")
        const datosDelJuego = document.createElement("div")

        tableroInicialTexto.textContent=`Ingrese su nombre:`
        tableroInicialInput.textContent=`Ingrese su nombre`
        tableroInicialBoton.textContent=`Jugar`
        tableroInicial.classList.add("inicio")
        tableroInicial.id="datos-ingresados"
        tableroInicialInput.id="nombre"
        tableroInicialInput.type="text"
        tableroInicialInput.placeholder="Ingrese su nombre"
        tableroInicialBoton.id="boton"
        datos.id="tablero"
        datos.class="mesa"
        datosDelJuego.classList.add("datos")
        datosDelJuego.id="datos-del-juego"

        tablero.appendChild(datosDelJuego)
        tablero.appendChild(tableroInicial)
        tableroInicial.appendChild(tableroInicialTexto)
        tableroInicial.appendChild(tableroInicialInput)
        tableroInicial.appendChild(tableroInicialBoton)
        tableroInicial.appendChild(datos)

        tableroInicialBoton.addEventListener("click",()=>{
        const nombre = tableroInicialInput.value.toUpperCase().trim() //Añadi métodos para que el nombre siempre sea en mayuscula y trim para que no acepte espacio como nombre
        if(nombre !== `` && !ranking.some((e)=>e.nombre === nombre)){ //Puse un IF para que no me acepte nombres vacios y que no haya 2 nombres iguales
        comentario.remove()
        nombres.push(nombre)

        const datosIngresados = document.getElementById("datos-ingresados")
        let nombreIngresado = document.createElement("h2")
        let turnoActual = document.createElement("h3")

        nombreIngresado.id="nombre-dato"
        turnoActual.id= "turno-dato"

        datosDelJuego.appendChild(nombreIngresado)
        datosDelJuego.appendChild(turnoActual)

        nombreIngresado.textContent = `NOMBRE: ${nombre}`
        turnoActual.textContent = `TURNO: ${turno}`

        datosIngresados.remove() // Elimino el div de datos ingresados

        crearCartas()
        } else {
        CrearComentario(tablero, `Ese nombre ya está en uso ó usaste un nombre vacio`, `red`)
        }
    })
}

// Creo funcion para volver a jugar
const volverAJugar= ()=>{
    while(tablero.querySelector("div")){ //Elimino todo lo que está dentro del div "tablero", ya que no se utiliza más
        tablero.firstChild.remove()
    }

    comentario.remove()

    const divBotonYTexto = document.createElement("div")
    const textoFinalPartida = document.createElement("h2")
    const botonOtraPartida = document.createElement("button")

    // Agrego un texto al final de la partida de que ganó el juego con x cantidad de turnos
    textoFinalPartida.textContent=`Muy bien ${nombres[nombres.length-1]}!!! Ganaste la partida con ${turno} turnos`
    botonOtraPartida.textContent=`Otra partida`

    divBotonYTexto.classList.add("inicio")

    tablero.appendChild(divBotonYTexto)
    divBotonYTexto.appendChild(textoFinalPartida)
    divBotonYTexto.appendChild(botonOtraPartida)

    botonOtraPartida.addEventListener("click", ()=>{ // Al botón le agrego el evento que al hacerle click, primero me borre todo el div de pantalla final y luego inicie otra vez la funcion jugar
        divBotonYTexto.remove()
        jugar()
    })
}

// Creo funcion que me cree la tabla de ranking (profes, corrijanme si la semántica que usé para crear el ranking esta bien, porque no sabía si usar parrafos o si se usaba otra etiqueta)
const tablaRanking = ()=>{
    const tablaJugadores = document.getElementById("tabla-jugadores")

    while (tablaJugadores.children.length > 1) { //Pongo que sea mayor a 1 para que no me elimine donde dice "Posicion, Nombre, Turnos"
        tablaJugadores.removeChild(tablaJugadores.lastChild);
    }

    ranking.sort((a,b)=> a.turno -b.turno) // Ordeno los jugadores por menor cantidad de turnos a mayor cantidad de turnos

    ranking.forEach((elemento, index)=>{ // Por cada jugador quiero que me cree un div, y 3 parrafos para poner sus datos dentro del div
        const nroIndex = document.createElement("p")
        const nombreTabla = document.createElement("p")
        const turnoTabla = document.createElement("p")
        const jugador = document.createElement("div")

        nroIndex.textContent=`${index+1}`
        nombreTabla.textContent=`${ranking[index].nombre}`
        turnoTabla.textContent=`${ranking[index].turno}`

        jugador.classList.add("jugador")

        tablaJugadores.appendChild(jugador)
        jugador.appendChild(nroIndex)
        jugador.appendChild(nombreTabla)
        jugador.appendChild(turnoTabla)
    })
    
}

// Creo función donde se ejecuta el juego y la tabla de ranking
const juegoDeLaMemoria = ()=>{
    jugar()
    tablaRanking()
}

// Ejecución de código
juegoDeLaMemoria()