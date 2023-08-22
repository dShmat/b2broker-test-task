import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SingleElement} from '../../models/single-element.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() tableData: SingleElement[] = [];
}
