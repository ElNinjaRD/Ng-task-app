import { Component, effect, input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  tasks = input.required<ITask[]>();

  // constructor(){
  //   effect(()=>{
  //     console.log(this.tasks())
  //   })
  // }
}
