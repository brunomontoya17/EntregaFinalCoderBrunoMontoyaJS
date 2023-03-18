class Alumno {
    constructor(nombre, sexo, edad, materias) {
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
        this.materias = materias;
    }

    getStringMaterias() {
        let listaString = "";
        for (let mat of this.materias)
            listaString = listaString + `[${mat.nombreMateria}: ${mat.nota} ] `;
        return listaString;
    }

    getPromedio() {
        let sumas = 0;
        for (let mat of this.materias) {
            sumas += mat.nota;
            console.log(mat.nota);
        }
        console.log(this.materias.length)
        const promedio = sumas / this.materias.length;
        return promedio;
    }
}

class Materia {
    constructor(nombreMateria, nota) {
        this.nombreMateria = nombreMateria;
        this.nota = nota;
    }
}

function cargarMaterias() {
    let continuar = true;
    const listaMaterias = Array();
    while (continuar) {
        const nombreMateria = prompt("Ingrese el nombre de la materia:");
        const Nota = parseInt(prompt("Ingrese la nota obtenida"));
        if (isNaN(Nota) || Nota < 0 || Nota > 10) {
            alert(`La nota ingresada para ${nombreMateria} no es valida`);
            alert("La materia no pudo ser creada!");
            continue;
        }
        const _materia = new Materia(nombreMateria, Nota);
        listaMaterias.push(_materia);
        let opcion = "";
        while (opcion.toUpperCase() !== "SI" && opcion.toUpperCase() !== "NO") {
            opcion = prompt("Desea agregar mas materias??");
            if (opcion.toUpperCase() === "NO")
                continuar = false;
            else if (opcion.toUpperCase() !== "SI")
                alert("Opcion no valida!!!");
        }
    }
    return listaMaterias;
}

alert("Bienvenido!!");
let continuar = true;
const listaAlumnos = Array();
while (continuar) {
    const nombre = prompt("Ingrese el nombre del alumno:");
    let edad = parseInt(prompt("Ingrese la edad:"));
    while (isNaN(edad)){
        edad = parseInt(prompt("Ingrese una edad valida:"));
    }
    const sexo = prompt("Ingrese sexo de la persona:");
    const listaMaterias = cargarMaterias();

    let _alumno = new Alumno(nombre, sexo, edad, listaMaterias);
    alert(`El/La alumno/a ${_alumno.nombre}, de edad ${_alumno.edad}, tiene un
            promedio de ${_alumno.getPromedio()} 
            en las siguientes materias: ${_alumno.getStringMaterias()}`);
    listaAlumnos.push(_alumno);
    let opcion = "";
    while (opcion !== "SI" && opcion !== "NO") {
        opcion = prompt("Desea continuar? (SI/NO):");
        opcion = opcion.toUpperCase();
        if (opcion === "NO")
            continuar = false;
        else if (opcion !== "SI")
            alert("Ingrese una opcion valida!");
    }
}
let stringAlert = "Lista de alumnos ordenados por promedio: ";
listaAlumnos.sort((a, b) => b.getPromedio() - a.getPromedio());
for (let alum of listaAlumnos)
    stringAlert = stringAlert + `\n${alum.nombre}: ${alum.getPromedio()}`;
alert(stringAlert);
alert("Muchas gracias! Vuelva pronto!");