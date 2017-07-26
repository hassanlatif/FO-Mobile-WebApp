import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';
import { MarkerClusterDirective } from './marker-cluster.directive';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AlarmsService } from './services/alarms.service';
import { MapService } from './services/map.service';
import { TrendSignPipe } from './trendSign.pipe';


import { AppComponent } from './app.component';
import { AlarmWidgetComponent } from './alarm-widget/alarm-widget.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmWidgetComponent,
    MapComponent,
    TrendSignPipe,
    MarkerClusterDirective,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDp5VocapFO3PkFuhfXzDtzv-F71up1VRE'}),
    Ng2GoogleChartsModule


  ],
  providers: [AlarmsService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
