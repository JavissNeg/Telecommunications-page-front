import { Component, OnInit } from '@angular/core';
import { GridData } from 'src/app/shared/interfaces/grid.interfaces';
import { Subject } from 'src/app/shared/interfaces/subject.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  subject: Subject[] = [
    {
      subject_id: 1,
      subject_name: 'Matemáticas',
      subject_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      subject_date: '2021-09-01'
    }
  ];
  
  data: GridData[] = [];

  constructor() { }

  ngOnInit(): void {

    this.subject.forEach(item => {
      this.data.push({
        id: item.subject_id,
        name: item.subject_name,
        description: item.subject_description
      })
    });
    
  }

}
