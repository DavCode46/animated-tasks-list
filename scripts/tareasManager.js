import { Tarea } from "./tarea.js"; 

export class tarreasManager{
    constructor(listaTareas){
        this.arregloTareas = [];
        this.contador = 0;
        this.listaTareas = listaTareas;
    }

    agregarTarea(descripcion){
        this.contador++;
        const nuevaTarea = new Tarea(this.contador, descripcion);
        this.arregloTareas.push(nuevaTarea);
        this.setContador();
        this.setAreegloTareas();
    }

    listarTareas(){
        this.listaTareas.innerHTML = "";
        this.arregloTareas.reverse().forEach((tarea) => {
            this.listaTareas.innerHTML += `
                <li id='${tarea.id}'>
                    <input type='text' class='input-tarea' value='${tarea.descripcion}'>
                    <button class='boton-eliminar'>X</button> 
                </li>`;
        });
    }
    
    editarTarea(id, descripcion){
        const indice = this.arregloTareas.find((tarea) => tarea.id === id);
        if(indice){
            indice.editar(descripcion);
            this.setAreegloTareas();
        }
    }

    eliminarTarea(id){
        this.arregloTareas = this.arregloTareas.filter((tarea) => tarea.id !== id);
        this.setArregloTareas();
        /* const indice = this.arregloTareas.findIndex((tarea) => tarea.id === id);
        this.arregloTareas.splice(indice, 1); */
    }

    limpiarTodo(){
        this.arregloTareas = [];
        this.contador = 0;
        this.setArregloTareas();
        this.setContador();
    }


    getContador(){
        const cont = localStorage.getItem('contador');
        return cont;
    }

    setContador(){
        localStorage.setItem('contador', this.contador);
    }

    getArregloTareas(){
        const arregloTareas = localStorage.getItem('arregloTareas');
        return arregloTareas;
    }

    setArregloTareas(){
        localStorage.setItem('arregloTareas', JSON.stringify(this.arregloTareas));
    }
}