import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footermini',
  templateUrl: './footermini.component.html',
  styleUrls: ['./footermini.component.css']
})
export class FooterminiComponent implements OnInit {

  currentYear = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
