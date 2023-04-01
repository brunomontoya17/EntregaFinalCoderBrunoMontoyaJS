class Alumno {

    static idReg = 0;
    constructor(nombre, sexo, edad, materias) {
        this.idAlumno = Alumno.getIdAlumno();
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

    static getIdAlumno ()
    {
        Alumno.idReg++;
        return Alumno.idReg;
    }
}

class MateriaAlumno {
    constructor(nombreMateria, nota) {
        this.nombreMateria = nombreMateria;
        this.nota = nota;
    }
}

class Materia {
    constructor(id,nombreMateria) {
        this.id = id;
        this.nombreMateria = nombreMateria;
    }
}

const materias = 
["Matematica","Literatura","NTICX","Biologia",
"Historia","Geografia","Fisica","Ingles","Salud y Adolescencia",
"Ed. Fisica"];
const listadoAlumnos = Array();
const listadoMaterias = Array();
for (let i=0;i<materias.length;i++){
    listadoMaterias.push(new Materia(i+1,materias[i]));
}
function agregarAlumno() {
    const nombre = document.querySelector("#nombreAlumno").value;
    const edad = parseInt(document.querySelector("#edadAlumno").value);
    const sexo = document.querySelector('input[name="Sexo"]:checked').value;
    listadoAlumnos.push(new Alumno(nombre,sexo,edad,Array()));
}
function listarAlumnos(){
    const tablaAlumnos = document.querySelector('#tableContent');
    tablaAlumnos.innerHTML = '';
    listadoAlumnos.forEach((alumno) => 
    {
        tablaAlumnos.innerHTML += `<tr>
                            <td>${alumno.idAlumno}</td>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.edad}</td>
                            <td>${alumno.sexo}</td>
                            <td><input type=button id=${"alumno"+alumno.id} value="Ver Materias"></td>
                        </tr>`;
    })
}
const agregarAlumnoEvento = document.querySelector('#agregarAlumno');
agregarAlumnoEvento.addEventListener("click",()=>{
    agregarAlumno();
    listarAlumnos();
})
const guardarProgreso = document.querySelector('#saveWork');
guardarProgreso.addEventListener("click",()=>{
    listadoAlumnos.forEach((alumno) =>{
        localStorage.setItem(alumno.idAlumno,JSON.stringify(alumno,
            ['idAlumno','nombre','sexo','edad','materias','nombreMateria','nota']));
    })
})
/*
let divSelector = document.querySelector("#content");
for (let mat of listadoMaterias)
{
    divSelector.innerHTML +=   `<div class="maters">
                                    <form id="form:${mat.id}">
                                        <p>${mat.nombreMateria}:</p>
                                        <input type="number" step=1 min=1 max=10 value=7 id="${mat.id}" />
                                        <input type="button" value="Agregar" id="${mat.id}+${mat.nombreMateria}" />
                                    </form>
                                </<div>`;

}*/


/*
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
*/