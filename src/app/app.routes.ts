import { Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    { 
        path: 'statistic', component: StatisticsComponent 
    },
    { 
        path: 'reservation', component: ReservationComponent 
    },
    { path: 'overview', component: AppComponent },

];
