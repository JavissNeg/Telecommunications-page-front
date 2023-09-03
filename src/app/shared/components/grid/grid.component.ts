import { Component, Input, OnInit } from '@angular/core';
import { GridData } from '../../interfaces/grid.interfaces';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {

  @Input() data!: GridData[];
  @Input() type!: string;  

  ngOnInit(): void {
    
  }

}
