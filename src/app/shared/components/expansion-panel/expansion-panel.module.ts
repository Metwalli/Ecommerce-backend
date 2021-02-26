import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { IonicModule } from 'ionic-angular';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { 
  ExpansionPanelGroupComponent,
  ExpansionPanelComponent, 
  ExpansionPanelHeaderComponent,
  ExpansionPanelContentComponent,
  ExpansionPanelFooterComponent 
} from './expansion-panel/expansion-panel.component';

@NgModule({
  imports: [
    NoopAnimationsModule,
    CommonModule,
    FormsModule,    
    // IonicModule
  ],
  declarations: [    
    ExpansionPanelGroupComponent,
    ExpansionPanelComponent, 
    ExpansionPanelHeaderComponent,
    ExpansionPanelContentComponent,
    ExpansionPanelFooterComponent 
  ],
  exports:[
    ExpansionPanelGroupComponent,
    ExpansionPanelComponent, 
    ExpansionPanelHeaderComponent,
    ExpansionPanelContentComponent,
    ExpansionPanelFooterComponent 
  ]
})
export class ExpansionPanelModule { }
