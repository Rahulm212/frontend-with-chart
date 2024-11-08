import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/reservation.service';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartOptions, registerables, ChartDataset, ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(...registerables)

interface Reservation {
  id: number;
  reservedFor: string;
  peopleCount: number;
  status?: string; // Make 'status' optional in case it's missing or null
  // Add other properties as needed
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [BaseChartDirective,MatCardModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = { responsive: true };


  chartDataPie: ChartDataset[] = [];
  chartLabelsPie: string[] = [];
  chartOptionsPie: ChartOptions = { responsive: true };

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getReservations().subscribe(data => {
      // Process the data to extract reservation count by date
      const reservationsPerDay = this.processReservationsByDate(data);

      // Prepare data for the chart
      this.chartData = [{
        data: reservationsPerDay.map(d => d.count),
        label: 'Reservations'
      }];
      this.chartLabels = reservationsPerDay.map(d => d.date);


      // Process the data to extract reservation count by date
      const reservationsPerStatus = this.processReservationsByStatus(data);

      // Prepare data for the chart
      this.chartDataPie = [{
        data: reservationsPerStatus.map(d => d.count),
        label: 'Reservations'
      }];
      this.chartLabelsPie = reservationsPerStatus.map(d => d.status);
    });
  }


  // Function to process the reservations data and group by date
  processReservationsByDate(reservations: Reservation[]): { date: string, count: number }[] {
    const grouped = reservations.reduce((acc: { [key: string]: { date: string, count: number } }, reservation: Reservation) => {
      const date = reservation.reservedFor.split(' ')[0]; // Extract the date part (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = { date, count: 0 };
      }
      acc[date].count += 1;  // Increment count for the same date

      return acc;
    }, {});

    // Convert the grouped data into an array and return it
    return Object.values(grouped);
  }


  // Function to process the reservations data and group by status
  processReservationsByStatus(reservations: Reservation[]): { status: string, count: number }[] {
    const grouped = reservations.reduce((acc: { [key: string]: { status: string, count: number } }, reservation: Reservation) => {
      const status = reservation.status ?? ""; //

      if (!acc[status]) {
        acc[status] = { status, count: 0 };
      }
      acc[status].count += 1;  // Increment count for the same status

      return acc;
    }, {});

    // Convert the grouped data into an array and return it
    return Object.values(grouped);
  }

}