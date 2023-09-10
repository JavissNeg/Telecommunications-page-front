import { Component, OnInit } from '@angular/core';
import { GridData } from '../../../interfaces/grid.interfaces';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { UnitsBySubject } from 'src/app/interfaces/subject.interfaces';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit  {

  units: UnitsBySubject[] = [];

  data: GridData[] = [];
  title = 'Matematicas';

  constructor( public activateRoute: ActivatedRoute, public subjectService: SubjectService ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( ({ subject_id }) => {
      
      this.subjectService.getUnitsBySubjectID( subject_id ).subscribe( (res) => {
        
        if ( res.success ) {
          this.title = res.data![0].subject_name;
          this.units = res.data!;

          this.units.forEach((unit) => {
            this.data.push({
              id_router_unit: unit.unit_id,
              name: unit.unit_name,
              description: unit.unit_description,
              id_router_subject: unit.subject_id
            });
          });
        
        }

      });

    });

  }


}
