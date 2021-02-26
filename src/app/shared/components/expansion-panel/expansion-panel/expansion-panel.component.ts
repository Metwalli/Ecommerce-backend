import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ElementRef, 
  AfterViewInit,
  ViewChild, 
  AfterViewChecked,
  AfterContentChecked
} from '@angular/core';

@Component({
  selector: 'expansion-panel-header',
  template: `
              <ng-content></ng-content>                                    
  `,
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelHeaderComponent implements OnInit {
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {  }
}

@Component({
  selector: 'expansion-panel-content',
  template: `    
      <ng-content></ng-content>    
  `,
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelContentComponent implements OnInit {
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {  }
}

@Component({
  selector: 'expansion-panel-footer',
  template: `    
      <hr class="footer-line">
      <ng-content></ng-content>    
  `,
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelFooterComponent implements OnInit {
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {  }
}

@Component({
  selector: 'expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
  isExpanded: boolean = false;
  details: any;
  @Input() title: string; 
  @Input() expanded: boolean = false;
  @Input() showRemove: boolean = true; 
  @Output() onChange = new EventEmitter<boolean>();
  @Output() removeClick = new EventEmitter<number>();
  constructor(private _elementRef: ElementRef) { }

  ngOnInit() { 
    this.details = this._elementRef.nativeElement.querySelector('details');   
    this.details.open = this.expanded;
   }
  onClick(){    
    this.expanded = this.details.open;
    this.onChange.emit(this.expanded);
  }  

  expand() {
    this.details.open = true;
    this.expanded = true;
  }

  collapse() {
    this.details.open = false;
    this.expanded = false;
  }   

  onRemoveClick() {
    this.removeClick.emit();
  } 
}

@Component({
  selector: 'expansion-panel-group',
  template: `  
    <div class="panel">  
      <ng-content></ng-content> 
    </div>
  `,
  styleUrls: ['./expansion-panel.component.scss'],  
})
export class ExpansionPanelGroupComponent implements AfterViewChecked {
  @Input() expandedIndex: number = -1;
  @ContentChildren(ExpansionPanelComponent) panels: QueryList<ExpansionPanelComponent>;
  constructor() { }

  ngAfterViewChecked() {
    /**
     * Expand the panel and collapse previously
     * expanded panel.
     * Save the new expanded panel.
     */
    this.panels.forEach((panel, i) => {
      panel.onChange.subscribe((expanded: boolean) => {
        if (expanded) {
          if (i !== this.expandedIndex && this.expandedIndex >= 0) {
            this.panels.toArray()[this.expandedIndex].collapse();
          }
          this.expandedIndex = i;
        }
        if (!expanded && i === this.expandedIndex) {
          this.expandedIndex = -1;
        }
      });
    });    
  }
  

  getExpanded(): number {
    return this.expandedIndex;
  }

  getPanel(index: number): ExpansionPanelComponent {
    return this.panels.toArray()[index];
  }

}