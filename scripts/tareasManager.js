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

    eliminarTarea(id){
        const indice = this.arregloTareas.findIndex((tarea) => tarea.id === id);
        this.arregloTareas.splice(indice, 1);
    }

    editarTarea(id, descripcion){
        const indice = this.arregloTareas.findIndex((tarea) => tarea.id === id);
        this.arregloTareas[indice].editar(descripcion);
    }
}