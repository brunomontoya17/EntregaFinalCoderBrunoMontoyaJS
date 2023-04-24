class Alumno {
    constructor(idAlumno, nombre, curso, sexo, edad, materias) {
        this.idAlumno = idAlumno;
        this.nombre = nombre;
        this.curso = curso;
        this.sexo = sexo;
        this.edad = edad;
        this.materias = materias;
    }
    /*
    getStringMaterias() {
        let listaString = "";
        for (let mat of this.materias)
            listaString = listaString + `[${mat.nombreMateria}: ${mat.nota} ] `;
        return listaString;
    }*/

    getPromedio() {
        let sumas = 0;
        for (let mat of this.materias) {
            sumas += mat.nota;
            console.log(mat.nota);
        }
        //console.log(this.materias.length)
        const promedio = sumas / this.materias.length;
        return promedio;
    }
}

class Materia {
    constructor(id, nombreMateria) {
        this.id = id;
        this.nombreMateria = nombreMateria;
    }
}

class MateriaAlumno {
    constructor(nombreMateria, nota) {
        this.nombreMateria = nombreMateria;
        this.nota = nota;
    }
}

const listadoAlumnos = Array();
let listadoMaterias = Array();
/*
const materias =
    ["Matematica", "Literatura", "NTICX", "Biologia",
        "Historia", "Geografia", "Fisica", "Ingles", "Salud y Adolescencia",
        "Ed. Fisica"];
for (let i = 0; i < materias.length; i++) {
    listadoMaterias.push(new Materia(i + 1, materias[i]));
}*/

let ClaveAlumnos = parseInt(localStorage.getItem("ClaveAlumnos"));
console.log(ClaveAlumnos);
let alumnoSelect = null;
if (isNaN(ClaveAlumnos)) {
    ClaveAlumnos = 0;
    localStorage.setItem("ClaveAlumnos", ClaveAlumnos);
}

cargarAlumnos();
listarAlumnos();
cargarCursos();

const agregarAlumnoEvento = document.querySelector('#agregarAlumno');
agregarAlumnoEvento.addEventListener("click", () => {
    agregarAlumno();
    listarAlumnos();
})
const guardarProgreso = document.querySelector('#saveWork');
guardarProgreso.addEventListener("click", () => {
    Swal.fire({
        title: '¿Desea guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
        cancelButtonText: `Cancelar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.setItem("ClaveAlumnos", ClaveAlumnos);
            listadoAlumnos.forEach((alumno) => {
                localStorage.setItem(`alumno:${alumno.idAlumno}`, JSON.stringify(alumno,
                    ['idAlumno', 'nombre', 'curso', 'sexo', 'edad', 'materias', 'nombreMateria', 'nota']));
            });
            Swal.fire('El progreso ha sido guardado', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Los cambios no se han guardado', '', 'info')
        }
    })
})

function cargarAlumnos() {
    for (let i = 0; i < localStorage.length; i++) {
        //console.log("Entro al for");
        let clave = localStorage.key(i);
        const re = new RegExp('alumno:\\d+');
        //console.log (clave,re.test(clave),re.source);
        if (re.test(clave)) {
            //console.log("entro al if");
            const obj = localStorage.getItem(clave);
            const alumnobj = JSON.parse(obj);
            const alumnoload = new Alumno();
            alumnoload.idAlumno = parseInt(alumnobj.idAlumno);
            alumnoload.nombre = alumnobj.nombre;
            alumnoload.curso = alumnobj.curso;
            alumnoload.edad = parseInt(alumnobj.edad);
            alumnoload.sexo = alumnobj.sexo;
            alumnoload.materias = new Array();
            for (let matobj of alumnobj.materias) {
                const matload = new MateriaAlumno(matobj.nombreMateria, parseInt(matobj.nota));
                alumnoload.materias.push(matload);
            }
            listadoAlumnos.push(alumnoload);
        }
    }
}
async function cargarCursos() {
    const path = window.location.pathname;
	console.log(path);
    const finalpath = path.split('index.html');
    console.log(finalpath);
    const resp = await fetch(finalpath[0]+"materias.json");
    const dataJson = await resp.json();

    dataJson.forEach((curso) => {
        const selectCurso = document.querySelector("#curso");
        const elementCurso = document.createElement("option");
        elementCurso.innerHTML = curso.curso;
        elementCurso.setAttribute("id", curso.curso);
        selectCurso.append(elementCurso);
    })
}
function agregarAlumno() {
    ClaveAlumnos++;
    const nombre = document.querySelector("#nombreAlumno").value;
    const curso = document.querySelector("#curso").value;
    const edad = parseInt(document.querySelector("#edadAlumno").value);
    const sexo = document.querySelector('input[name="Sexo"]:checked').value;
    listadoAlumnos.push(new Alumno(ClaveAlumnos, nombre, curso, sexo, edad, Array()));
}
function listarAlumnos() {
    const tablaAlumnos = document.querySelector('#tableContent');
    tablaAlumnos.innerHTML = '';
    listadoAlumnos.forEach((alumno) => {
        tablaAlumnos.innerHTML += `<tr>
                            <td>${alumno.idAlumno}</td>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.curso}</td>
                            <td>${alumno.edad}</td>
                            <td>${alumno.sexo}</td>
                            <td><input type=button id="ver-${alumno.idAlumno}" value="Ver Materias"></td>
                        </tr>`;
    });
    listadoAlumnos.forEach((alumno) => {
        document.querySelector(`#ver-${alumno.idAlumno}`).addEventListener("click", async (evt) => {
            alumnoSelect = alumno;
            listarAlumnoSelect();
            //console.log(alumnoSelect.idAlumno, alumnoSelect.nombre);
            await cargarMateriasXCurso();
            cargarEventosMaterias();
            console.log("Finish");
        });
    });

}
function listarAlumnoSelect() {
    document.querySelector("#currentAlumno").innerHTML = `<div class="card flex-row">
                                                                    <div class="card-body">
                                                                        <p>Alumno: ${alumnoSelect.nombre}</p>
                                                                        <p>Curso: ${alumnoSelect.curso}</p>
                                                                        <p>Edad: ${alumnoSelect.edad}</p>
                                                                        <p>Sexo: ${alumnoSelect.sexo}</p>
                                                                    </div>
                                                                </div>
                                                                <table class="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Materia:</th>
                                                                            <th>Nota:</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="currentMaterias">
                                                                        
                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <td>Promedio:</td>
                                                                            <td>${alumnoSelect.getPromedio()}</td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>`;
    alumnoSelect.materias.forEach((mat) => {
        document.querySelector('#currentMaterias').innerHTML += `<tr>
                                                                            <td>${mat.nombreMateria}</td>
                                                                            <td>${mat.nota}</td>
                                                                        </tr>`;
    });

}
async function cargarMateriasXCurso() {
	const path = window.location.pathname;
	console.log(path);
    const finalpath = path.split('index.html');
    console.log(finalpath);
    const response = await fetch(finalpath[0]+"materias.json");
    const dataJson = await response.json();

    const arrayMaterias = dataJson.find((curso) => curso.curso === alumnoSelect.curso).materias;
    let idMateria = 0;
    listadoMaterias = [];
    arrayMaterias.forEach((mat) => {
        idMateria++;
        listadoMaterias.push(new Materia(idMateria, mat));
    });
    const divSelector = document.querySelector("#materiasAlumno");
    divSelector.innerHTML = '';
    listadoMaterias.forEach((mat2) => {
        divSelector.innerHTML += `<div class="card flex-row">
                                            <div class="card-body">
                                                <form id="form:${mat2.id}">
                                                    <p>${mat2.nombreMateria}:</p>
                                                    <input type="number" step=1 min=1 max=10 value=7 id="number-mat-${mat2.id}" />
                                                    <input type="button" value="Agregar" id="btn-mat-${mat2.id}" />
                                                </form>
                                            </div>
                                        </div>`;
    });
}

function cargarEventosMaterias() {
    console.log("Cargar Eventos Materias");
    listadoMaterias.forEach((mat2) => {
        console.log("Recorrido");
        document.querySelector(`#btn-mat-${mat2.id}`).addEventListener("click", (evt) => {
            const notaAgg = document.querySelector(`#number-mat-${mat2.id}`).value;
            const MatAlum = new MateriaAlumno(mat2.nombreMateria, parseInt(notaAgg));
            //console.log("Evento ejecutado");
            if (alumnoSelect !== null) {
                console.log(MatAlum.nombreMateria);
                console.log(alumnoSelect.materias);
                const findMat = alumnoSelect.materias.find((mat1) => mat1.nombreMateria === MatAlum.nombreMateria);
                if (findMat === undefined) {
                    alumnoSelect.materias.push(MatAlum);
                    Toastify({
                        text: `La materia ${MatAlum.nombreMateria} se agrego con la nota: ${MatAlum.nota}`,
                        duration: 3000,
                        }).showToast();
                    listarAlumnoSelect();
                }
                else {
                    findMat.nota = MatAlum.nota;
                    Toastify({
                        text: `La materia ${MatAlum.nombreMateria} se modifico con la nota: ${MatAlum.nota}`,
                        duration: 3000,
                        }).showToast();
                    listarAlumnoSelect();
                }
                
            }
        });
    });
}





/*
*/


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