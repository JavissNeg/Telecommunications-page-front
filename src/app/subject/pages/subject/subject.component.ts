import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/interfaces/unit.interfaces';
import { GridData } from '../../../interfaces/grid.interfaces';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit  {

  units: Unit[] = [
    {
      unit_id: 1,
      unit_name: 'Unit 1',
      unit_description:  'Description of unit 1',
      subject_id: 1
    },
    {
      unit_id: 2,
      unit_name: 'Unit 2',
      unit_description:  'Description of unit 2',
      subject_id: 1
    }
  ];

  data: GridData[] = [];
  title = 'Matematicas';

  constructor( public activateRoute: ActivatedRoute, public subejctService: SubjectService, public unitService: UnitService ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( ({ id }) => {
      
      this.subejctService.getSubjectByID( id ).subscribe( (res) => {
        res.success ? this.title = res.data![0].subject_name : this.title = '';
      });
      

      this.unitService.getUnitsBySubjectID( id ).subscribe( (res) => {
        
        res.success ? this.units = res.data : this.units = [];
        this.units.forEach((unit) => {
          this.data.push({
            id_router_unit: unit.unit_id,
            name: unit.unit_name,
            description: unit.unit_description,
            id_router_subject: unit.subject_id
          });
        });

      });

    });

  }


}
