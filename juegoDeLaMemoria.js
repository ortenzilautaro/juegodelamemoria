//Declaro variables y constantes
const cantidadDeParesDeFicha = 5
let contadorDeIntentos = 0
let seleccionarFicha
let confirmacion = true

//Declaro arrays
const fichas = [`Homero`,`Marge`,`Bart`,`Lisa`,`Maggie`,`Homero`,`Marge`,`Bart`,`Lisa`,`Maggie`]
const fichasAcertadas= [0, 1, 2, 3, 4, 5 , 6, 7 , 8, 9] //Acá estan las fichas que va acertando el jugador
const jugadores =[] //Acá estan los jugadores que terminaron el juego con los intentos que tuvieron cada uno

//--Declaro funciones--

//Declaro una funcion donde ingresa el nombre del jugador
const datosJugador= (nombre)=>{
    nombre = prompt(`Ingrese su nombre`).toLocaleUpperCase()
    alert (`Bienvenido al juego de la memoria ${nombre}`)
    return nombre
}

//Declaro una funcion donde el jugador elige una ficha y luego otra
const elegirFicha = (elegirFicha1, elegirFicha2)=>{
    do{
        elegirFicha1 = parseInt(prompt(`Escribí uno de los siguientes números para elegir una ficha:\n${fichasAcertadas.join(` | `)}`))
    }
    while(isNaN(elegirFicha1) || elegirFicha1<0 || elegirFicha1>9 || typeof fichasAcertadas[elegirFicha1] !== "number")
    fichasAcertadas[elegirFicha1]=fichas[elegirFicha1]
alert(`Tablero actual:\n${fichasAcertadas.join(` | `)}`)
    do{
        elegirFicha2 = parseInt(prompt(`Escribí uno de los siguientes números para elegir una ficha:\n${fichasAcertadas.join(` | `)}`))
    }
    while(isNaN(elegirFicha2) || elegirFicha2<0 || elegirFicha2>9 || elegirFicha1 === elegirFicha2 || typeof fichasAcertadas[elegirFicha2] !== "number")
fichasAcertadas[elegirFicha2]=fichas[elegirFicha2]
    alert(`Tablero actual:\n${fichasAcertadas.join(` | `)}`)
    return [elegirFicha1, elegirFicha2]
}

//Declaro una funcion donde las fichas elegidas anteriormente se comparan para ver si se acerto o no, en caso de que falle tiene que elegir nuevamente las fichas
//Además que tiene un for() para que una vez que haya acertado 5 pares se termine el juego
const jugar= ()=>{
    for(let paresAcertados = 0; paresAcertados<cantidadDeParesDeFicha; paresAcertados++){
        do{
            seleccionarFicha = elegirFicha()
            contadorDeIntentos= contadorDeIntentos+1 //Este contador me suma uno por cada intento que haga (sea acertado o no)
            if(fichas[seleccionarFicha[0]]!==fichas[seleccionarFicha[1]]){
                alert(`La ficha ${seleccionarFicha[0]} y la ficha ${seleccionarFicha[1]} no son iguales, intentelo nuevamente`)
                fichasAcertadas[seleccionarFicha[0]]=seleccionarFicha[0] //Acá hice que si la ficha seleccionada no era igual al numero del array de ficha acertada, entonces volvian a darse vuelta
                fichasAcertadas[seleccionarFicha[1]]=seleccionarFicha[1]
            }
        } while (fichas[seleccionarFicha[0]]!==fichas[seleccionarFicha[1]])
        if(paresAcertados== cantidadDeParesDeFicha-1){
            alert(`Muy bien! ganaste el juego, con ${contadorDeIntentos} turnos jugados!`)
        } else{
            alert(`Muy bien! Acertaste un par de fichas!`)
        }
    }
    return contadorDeIntentos
}

//Acá declaro una funcion para que se genere el ranking y que confirmen si quieren jugar nuevamente.
const ranking = ()=>{
    while(confirmacion===true){
        fichas.sort(()=>Math.random() - 0.5) //Además pusimos para que se mezclen las fichas aleatoriamente por cada partida
    const jugador ={ //Declare un objeto donde va a estar guardado el nombre y los intentos que tuvo cada participante
        nombre: datosJugador(),
        intentos: jugar()
    }
    jugadores.push (jugador)
    jugadores.sort((a,b)=> a.intentos - b.intentos) // Se ordena de menor a mayor respecto los intentos de cada participante
    confirmacion = confirm(`Volver a jugar?`)
    if (confirmacion ===true){
        contadorDeIntentos = 0
        for (let i = 0; i<fichas.length; i++){ //Acá puse un for() para que si vuelven a jugar, las fichas se den vuelta
            fichasAcertadas[i]= i
        }
    }
    let rankingTexto = "-- Ranking --\n";
    jugadores.forEach((j, index) => {
        rankingTexto += `${index + 1}. ${j.nombre} - ${j.intentos} intentos\n`})
    alert(rankingTexto)
}
}

ranking()