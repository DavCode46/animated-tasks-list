import { Tarea } from "./tarea.js";


/**
 * Clase que representa un administrador de tareas.
 */
export class TareasManager {
  /**
   * Constructor de la clase TareasManager.
   * @param {HTMLElement} listaTareas - Elemento HTML donde se mostrarán las tareas.
   */
  constructor(listaTareas) {
    this.arrayTareas = [];
    this.contador = 0;
    this.listaTareas = listaTareas;
  }

  /**
   * Agrega una nueva tarea al administrador de tareas.
   * @param {string} descripcion - Descripción de la tarea.
   */
  agregarTarea(descripcion) {
    this.contador++;
    const nuevaTarea = new Tarea(this.contador, descripcion);
    this.arrayTareas.push(nuevaTarea);
    
    this.setContador();
    this.setArrayTareas();
  }

  /**
   * Lista todas las tareas en el elemento HTML especificado.
   */
  listarTareas() {
    this.listaTareas.innerHTML = "";
    // Si hay información en el localStorage, la carga
    if(localStorage.getItem('arrayTareas') != null) {
        this.arrayTareas = this.getArrayTareas();
    }
    this.arrayTareas.reverse().forEach((tarea) => {
      this.listaTareas.innerHTML += `
                <li class="animated fadeIn" id="${tarea.id}">
                    <input type="text" class="input-tarea" value="${tarea.descripcion}" placeholder="Tarea nueva...">
                    <button class="boton-eliminar">X</button>
                </li>
            `;

            /* setTimeout(() => {
                document.getElementById(tarea.id).classList.remove('animated', 'fadeIn');
            }, 1000); */
    });
  }

  /**
   * Edita la descripción de una tarea existente.
   * @param {number} idTarea - ID de la tarea a editar.
   * @param {string} descripcion - Nueva descripción de la tarea.
   */
  editarTarea(idTarea, descripcion) {
    const tarea = this.arrayTareas.find((t) => (t.id == idTarea));
    if(tarea){
        tarea.editar(descripcion);
        this.setArrayTareas();
    }
  }

  /**
   * Elimina una tarea del administrador de tareas.
   * @param {number} idTarea - ID de la tarea a eliminar.
   */
  eliminarTarea(idTarea){
    this.arrayTareas = this.arrayTareas.filter((t) => (t.id != idTarea));
    this.setArrayTareas();
  }

  /**
   * Limpia todas las tareas del administrador.
   */
  limpiarTodo(){
    this.arrayTareas = [];
    this.contador = 0;
    this.setArrayTareas();
    this.setContador();
  }

  /**
   * Obtiene el valor del contador almacenado en el localStorage.
   * @returns {number} - Valor del contador.
   */
  getContador(){
    const cont = localStorage.getItem('contador');
    return cont;
  }

  /**
   * Almacena el valor del contador en el localStorage.
   */
  setContador(){
    localStorage.setItem('contador',this.contador);
  }

  /**
   * Inicializa el contador con el valor almacenado en el localStorage.
   */
  inicializarContador(){
    if(this.getContador() != null) {
        this.contador = this.getContador();
    }
  }

  /**
   * Obtiene el array de tareas almacenado en el localStorage.
   * @returns {Array} - Array de tareas.
   */
  getArrayTareas(){
    this.setContador();
    const array = JSON.parse(localStorage.getItem('arrayTareas'));
    // Convertir objetos genéricos en instancias de Tarea
    const tareasConvertidas = array.map((tarea) => new Tarea(tarea.id, tarea.descripcion));
    // Se puede hacer en una sola línea
   /*  JSON.parse(localStorage.getItem('arrayTareas')).map((tarea) => new Tarea(tarea.id, tarea.descripcion)); */
    return tareasConvertidas || [];
  }

  /**
   * Almacena el array de tareas en el localStorage y actualiza la lista de tareas.
   */
  setArrayTareas(){
    localStorage.setItem('arrayTareas', JSON.stringify(this.arrayTareas));
    this.listarTareas();
  }
}
