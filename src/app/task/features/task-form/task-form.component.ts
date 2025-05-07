import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITaskCreate } from '../../models/ITask';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html'
})
export default class TaskFormComponent {

  private _formBuilder = inject(FormBuilder)
  private _taskService = inject(TaskService)

  loading = signal(false);

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required)
  })

  async submit(){
    if(this.form.invalid) return;

    console.log(this.form.value)


    try{
      this.loading.set(true)

      const {title, completed} = this.form.value;

      const task: ITaskCreate = {
        title: title ?? '',
        completed: !!completed
      };

      await this._taskService.create(task);

      toast.success('Task created correctly...')

      this.form.reset()

    }catch(erro){
      toast.success('Error to create the task...')
    }finally{
      this.loading.set(false);
    }
  }


}
