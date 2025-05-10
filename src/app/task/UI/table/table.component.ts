import { Component, effect, inject, input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-table',
  imports: [RouterLink, NgClass],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  tasks = input.required<ITask[]>();

  private _taskService = inject(TaskService)

  // constructor(){
  //   effect(()=>{
  //     console.log(this.tasks())
  //   })
  // }


  async delete(id: string){
    //const taskSnapshot = await this._taskService.getTask(id);
    console.log(id)

    try{
      await this._taskService.delete(id);
      toast.success('Task deleted correctly...')

    }catch(error){
      console.log(error)
    }
  }
}
