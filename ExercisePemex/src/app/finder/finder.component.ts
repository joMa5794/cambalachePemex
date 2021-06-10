import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, MaxLengthValidator } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {
  dataSource: any;
  formFilters = new FormGroup({
    name: new FormControl(''),
    typeP: new FormControl(''),
    min: new FormControl(''),
    max: new FormControl('')
  });
  types = [
    { id: 1, description: 'Autos' },
    { id: 2, description: 'Casas' },
    { id: 3, description: 'Motos' },
    { id: 4, description: 'Electronicos' },
  ];
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onFilterChange();
  }
  onFilterChange() {
    let obj: any = {};
    if (this.formFilters.controls['name'].value != '') { obj.name = this.formFilters.controls['name'].value }
    if (this.formFilters.controls['min'].value != '') { obj.min = this.formFilters.controls['min'].value }
    if (this.formFilters.controls['max'].value != '') { obj.max = this.formFilters.controls['max'].value }
    if (this.formFilters.controls['typeP'].value != '') { obj.type = this.formFilters.controls['typeP'].value }

    const httpParams = new HttpParams({ fromObject: obj })

    this.http.get<any>('http://localhost:5000/api/products', { params: httpParams }).subscribe(data => {
      this.dataSource = data; 
      console.log(this.dataSource);
    });
  }
  sendMail(){}
}
