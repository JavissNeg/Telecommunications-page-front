import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/interfaces/unit.interfaces';
import { GridData } from '../../../interfaces/grid.interfaces';

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

  constructor() { }

  ngOnInit(): void {

    this.units.forEach((unit) => {
      console.log(unit);
      this.data.push({
        id_router: unit.unit_id,
        name: unit.unit_name,
        description: unit.unit_description
      });
    });

  }


}
