import { inject, Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { ITask, ITaskCreate } from '../models/ITask';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import as from '@angular/common/locales/as';


const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _firestore = inject(Firestore)
  private _collection = collection(this._firestore, PATH)


  getTasks = toSignal(
    collectionData(this._collection, {idField: 'id'}) as Observable<ITask[]>,
    {initialValue: []}
  )


  create(task: ITaskCreate){
    return addDoc(this._collection, task)
  }


}
