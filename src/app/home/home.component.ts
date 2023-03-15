import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { MessierService } from '../services/messier.service';
import { DataUtil } from '@syncfusion/ej2-data';
import { Tooltip } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  dropdata: any;

  @ViewChild('grid') 
  grid!: GridComponent;

  filterOptions: FilterSettingsModel = {
    type: 'Excel'
  };

  constructor(private messierService: MessierService) {
  }

  ngOnInit(): void {
    this.messierService.getObjects().subscribe(o => {
      this.data = o,
      this.dropdata = DataUtil.distinct(this.data, 'id') as number[];
    });
  }

  getRa(ra: number): string {
    const hours = Math.floor(ra/60);
    const minutes = ra - (hours * 60);
    return `${hours.toString().padStart(2,'0')}<sup>h</sup> ${minutes.toFixed(2).toString().padStart(5,'0')}<sup>m</sup>`;
  }

  getDec(dec: number): string {
    const abs = Math.abs(dec);
  
    const deg = Math.floor(abs/60);
    const sec = abs - (deg * 60);
    return `${dec<0?'-':'+'}${deg.toString().padStart(2,'0')}&deg; ${sec.toString().padStart(2,'0')}'`
  }

  openWindow(url: string) {
    window.open(url);
  }

  headerCellInfo(args: any) { 
    const toolcontent = args.cell.column.headerText; 
    const tooltip: Tooltip = new Tooltip({ 
      content: toolcontent 
    }); 
    tooltip.appendTo(args.node); 
  }
}
