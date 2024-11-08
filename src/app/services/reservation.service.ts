import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Reservation {
  id: number;
  reservedFor: string;  // Date of reservation
  peopleCount: number;  // Number of people
}
export interface Table{
    id: number,
    betriebId: number,
    status: string,
    gastId: number,
    peopleCount: number,
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3000/restaurants'; // backend API URL

  constructor(private http: HttpClient) {}

  // Method to get reservation data
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }
  // Method to get Table data
  getTable(){
    return this.http.get<Table[]>(this.apiUrl);
  }
}
