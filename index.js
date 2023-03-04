class Alumno {
    constructor(nombre,sexo,edad,notas){
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
        this.notas = notas;
    }
}

class Nota {
    constructor(matematica,lenguaje,historia){
        this.matematica = matematica;
        this.lenguaje = lenguaje;
        this.historia = historia;
    }

    promedio(){
        sumatotal = this.matematica + this.lenguaje + this.historia;
        promedio = sumatotal / 3;
        return promedio;
    }
}


alert("Bienvenido!!");
let continuar = true;
while (continuar)
{
    const nombre = prompt("Ingrese el nombre del alumno:");
    const matematica = parseInt(prompt("Ingrese la nota en matematicas:"));
    const lenguaje = parseInt(prompt("Ingrese la nota en lenguaje:"));
    const historia = parseInt(prompt("Ingrese la nota de historia:"));
    if (isNaN(matematica) || isNaN(lenguaje) || isNaN(historia))
    {
        alert("Una de las notas fue ingresada de manera incorrecta");
        continue;
    }
    if(matematica<0 || matematica>10) {
        alert("La nota de matematica esta fuera de rango");
        continue;
    }
    if(lenguaje<0 || lenguaje>10) {
        alert("La nota de lenguaje esta fuera de rango");
        continue;
    }
    if(historia<0 || historia>10) {
        alert("La nota de historia esta fuera de rango");
        continue;
    }
    const promedio = (matematica+lenguaje+historia)/3
    alert(`El/La alumno/a ${nombre} tiene un promedio de ${promedio}`);
    let opcion = "";
    while (opcion!=="SI" && opcion!=="NO")
    {
        opcion = prompt("Desea continuar? (SI/NO):");
        opcion = opcion.toUpperCase();
        if (opcion==="NO")
            continuar = false;
        else if (opcion!=="SI")
            alert("Ingrese una opcion valida!");
    }
}
alert("Muchas gracias! Vuelva pronto!");