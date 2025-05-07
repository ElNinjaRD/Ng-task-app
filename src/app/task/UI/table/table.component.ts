import { Component, effect, input } from '@angular/core';
import { ITask } from '../../models/ITask';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  tasks = input.required<ITask[]>()

  constructor(){
    effect(()=>{
      console.log(this.tasks())
    })
  }
}
