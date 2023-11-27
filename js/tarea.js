export class Tarea {

    constructor(id, descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    editar(descripcion){
        this.descripcion = descripcion;
    }
}
