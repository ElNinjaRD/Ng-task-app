import { inject, Injectable, signal } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, getDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ITask, ITaskCreate } from '../models/ITask';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError } from 'rxjs';
import as from '@angular/common/locales/as';


const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _firestore = inject(Firestore)
  private _collection = collection(this._firestore, PATH)


  //Loading que nos ayude a gestionar cuando se cargan los datos
  loading = signal<boolean>(true);


  //Cargar las tareas
  getTasks = toSignal((collectionData(this._collection, {idField: 'id'}) as Observable<ITask[]>).pipe(
    tap(() => {
      this.loading.set(false)
    }),
    catchError((error) => {
      this.loading.set(false)
      return throwError(() => error)
    })

  ), {initialValue: []});




  //Crear una tarea
  create(task: ITaskCreate){
    return addDoc(this._collection, task)
  }

  //Editar tarea

  getTask(id: string){
    const docRef = doc(this._collection, id);
    return getDoc(docRef)
  }

  update(task: ITaskCreate, id: string){
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, task)
  }

}
