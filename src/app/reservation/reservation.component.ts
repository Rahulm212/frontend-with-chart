import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { StatisticsService } from '../services/reservation.service';
import { Table } from '../services/reservation.service';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MatTableModule,MatCardModule,DataTablesModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  tableList!:Table[]
  dtoptions:Config={}
  dttrigger:Subject<any> = new Subject<any>();
  constructor( private service:StatisticsService){

  }
  ngOnInit(): void {
    this.loadData();
    this.dtoptions ={
      pagingType:'full_numbers'
    }
  }
  loadData(){
    this.service.getTable().subscribe(item=>{
      console.log(item)
      this.tableList = item;
      this.dttrigger.next(null)
    })
  }
}
