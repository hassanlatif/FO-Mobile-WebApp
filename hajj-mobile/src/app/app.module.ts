import { AlarmsService } from './services/alarms.service';
import { MapService } from './services/map.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AlarmWidgetComponent } from './alarm-widget/alarm-widget.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmWidgetComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDp5VocapFO3PkFuhfXzDtzv-F71up1VRE'})

  ],
  providers: [AlarmsService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
