import { Component, OnInit } from '@angular/core';
import { GridData } from 'src/app/interfaces/grid.interfaces';
import { Subjects } from 'src/app/interfaces/subject.interfaces';
import { SubjectService } from '../../../services/subject/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  subject: Subjects[] = [
    {
      subject_id: 1,
      subject_name: 'Matemáticas',
      subject_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      subject_date: '2021-09-01'
    }
  ];
  
  data: GridData[] = [];
  
  constructor( public subjectService: SubjectService ) { }

  ngOnInit(): void {
    
    this.subjectService.getSubjects().subscribe( res => {

      res.success ? this.subject = res.data! : this.subject = [];
      
      this.subject.forEach(item => {
        this.data.push({
          id_router_subject: item.subject_id,
          name: item.subject_name,
          description: item.subject_description
        })
      });
    }); 
    
  }

}
