import { Component, Input, OnInit } from '@angular/core';
import { GridData } from '../../../interfaces/grid.interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {

  @Input() data!: GridData[];
  @Input() type!: string;  
  
  constructor( public router: Router ) { }

  ngOnInit(): void { }

  goToLink( id: number ) {
    const subject_id = this.data[id].id_router_subject;

    if ( this.type === 'subject' ) 
      
      this.router.navigate(
        [ `/home/subject/${subject_id}`  ],
      );

    else {

      if ( this.type === 'unit' ) {
        const unit_id = this.data[id].id_router_unit;

        this.router.navigate(
          [
            `/home/test/`
          ],
          {
            queryParams: {
              subject: subject_id,
              unit: unit_id
            }
          }
        );

      }

    }
  }

}
