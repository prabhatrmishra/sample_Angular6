import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ce_base_routes_config } from 'src/app/app.routes';
import { HeaderComponent } from './components/header/header.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { TrainComponent } from './pages/train/train.component';
import { TrainProfileComponent } from './pages/train-profile/train-profile.component';
import { TrainEntityComponent } from './pages/train-entity/train-entity.component';
import { MatchPipe } from './pipes/match.pipe';
import { DragulaModule } from 'ng2-dragula';
import { ExtractComponent } from './pages/extract/extract.component';
import { InspectComponent } from './pages/inspect/inspect.component';
import { InspectLandingComponent } from './pages/inspect-landing/inspect-landing.component';
import { InspectTagsComponent } from './pages/inspect-tags/inspect-tags.component';
import { TagComponent } from './components/tag/tag.component';
import { AddTagComponent } from './components/add-tag/add-tag.component';
import { UrlServices } from './urlService'
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler }     from './http.error-handler.service';
import {MessageService} from './message.service'

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ReportsComponent,
    TrainComponent,
    TrainProfileComponent,
    TrainEntityComponent,
    MatchPipe,
    ExtractComponent,
    InspectComponent,
    InspectLandingComponent,
    InspectTagsComponent,
    TagComponent,
    AddTagComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ce_base_routes_config,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      backgroundPadding: -50,
      outerStrokeColor:'#006262',
      radius: 20,
      space: -20,
      toFixed: 0,
      maxPercent: 100,
      unitsFontSize: "14",
      outerStrokeWidth: 2,
      innerStrokeWidth: 0,
      titleFontSize: "14",
      showBackground: false,
      showInnerStroke: false,
      showSubtitle: false,
      
    })
  ],
  providers: [UrlServices,HttpErrorHandler,MessageService],
  bootstrap: [AppComponent,]
})
export class AppModule { }
