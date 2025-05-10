import { inject, Injectable, signal } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, getDoc, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { ITask, ITaskCreate } from '../models/ITask';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError } from 'rxjs';
import as from '@angular/common/locales/as';
import { authState } from '@angular/fire/auth';
import { AuthStateservice } from '../../shared/data-access/auth-state.service';


const PATH = 'tasks';

//Debemos quitar el injectable para que se cree cada vez se navega dentro
@Injectable(
  {
  providedIn: 'root'
  }
)
export class TaskService {

  private _firestore = inject(Firestore)
  private _collection = collection(this._firestore, PATH)
  private _authState = inject(AuthStateservice)


  //Query para filtrar las tareas por el id del usuario
  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );



  //Loading que nos ayude a gestionar cuando se cargan los datos
  loading = signal<boolean>(true);


  //Cargar las tareas
  getTasks = toSignal((collectionData(this._query, {idField: 'id'}) as Observable<ITask[]>).pipe(
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
    return addDoc(this._collection, {
      ...task,
      userId: this._authState.currentUser?.uid,
    })
  }

  //Editar tarea

  getTask(id: string){
    const docRef = doc(this._collection, id);
    return getDoc(docRef)
  }

  update(task: ITaskCreate, id: string){
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {
      ...task,
      userId: this._authState.currentUser?.uid,
    })
  }


  //eliminar tarea
  delete(id: string){
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef)
  }

}
