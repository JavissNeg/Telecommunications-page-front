import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {

  @Input() data!: any[];
  @Input() tyoe!: string;

  subjects: any[] = [
    { 
      subject_id: 1,
      subject_name: 'Telecommunications',
      subject_description:  'Is the transmission of signs, signals, messages, words, writings, images and sounds or information of any nature by wire, radio, optical or other electromagnetic systems.',
      subject_date: '2020-01-01',
    },
  ];

  units: any[] = [
    { 
      unit_id: 1,
      unit_name: 'Telecommunications',
      unit_description:  'Is the transmission of signs, signals, messages, words, writings, images and sounds or information of any nature by wire, radio, optical or other electromagnetic systems.',
      unit_date: '2020-01-01',
      unitsubject_id: 1,
    },
  ]

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.tyoe);
    
  }

}
