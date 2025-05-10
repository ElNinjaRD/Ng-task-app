import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask, ITaskCreate } from '../../models/ITask';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  providers: [TaskService],
})
export default class TaskFormComponent {

  private _formBuilder = inject(FormBuilder)
  private _taskService = inject(TaskService)

  loading = signal(false);

  idTask = input.required<string>();


  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required)
  })

  async submit(){
    if(this.form.invalid) return;

    //console.log(this.form.value)


    try{
      this.loading.set(true)

      const {title, completed} = this.form.value;

      const task: ITaskCreate = {
        title: title ?? '',
        completed: !!completed
      };

      //Si existe el idTask, significa que es una edicion
      const id = this.idTask()
      if(id){
        await this._taskService.update(task, id)
      }else {
        await this._taskService.create(task);
      }

      toast.success(`Task ${id ? 'edited' : 'created'} correctly...`)
      this.form.reset()

    }catch(erro){
      toast.success('Error to create the task...')
    }finally{
      this.loading.set(false);
    }
  }


  //Edit task

  constructor() {
    effect(() => {
      //console.log(this.idTask())

      const id = this.idTask()
      if(!id) return;

      this.getTask(id);
    })
  }


  async getTask(id: string){
    const taskSnapshot = await this._taskService.getTask(id);

    if(!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as ITask;

    this.form.patchValue(task)
  }

}
