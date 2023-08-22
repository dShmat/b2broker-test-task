import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkerControlService} from '../../services/worker-control.service';
import {filter, Subject, takeUntil} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {SingleElement} from '../../models/single-element.model';
import {DataPreparationService} from '../../services/data-preparation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  destroyed = new Subject<void>();
  result: SingleElement[] = [];
  private readonly INITIAL_TIMER = 300;
  currentTime: number = this.INITIAL_TIMER;
  currentSize: number = this.INITIAL_TIMER;
  private readonly INITIAL_ARRAY_SIZE = 1000;
  paramsForm = this.fb.group({
    timer: [this.INITIAL_TIMER],
    arraySize: [this.INITIAL_ARRAY_SIZE],
    arrayIds: [''],
  });

  constructor(
    private workerControlService: WorkerControlService,
    private dataPreparationService: DataPreparationService,
    private fb: FormBuilder
  ) {
  }

  get arrayIds() {
    return this.paramsForm.controls.arrayIds.value || '';
  }

  ngOnInit(): void {
    this.callWorker(this.INITIAL_TIMER, this.INITIAL_ARRAY_SIZE);
    this.paramsForm.valueChanges
      .pipe(
        filter(value => !!value),
        takeUntil(this.destroyed)
      ).subscribe(
      value => {
        if (value.arrayIds) {
          this.changeIds(value.arrayIds);
        }
        if (value.timer && value.arraySize) {
          if (value.timer !== this.currentTime || value.arraySize !== this.currentSize) {
            this.strop();
            this.currentSize = value.arraySize;
            this.currentTime = value.timer;
            return this.callWorker(value.timer, value.arraySize);
          }
        }
      }
    )
  }

  callWorker(timer: number, arraySize: number) {
    this.workerControlService.callWorker({time: timer, quantity: arraySize})
      .subscribe(
        res => {
          if (!res) {
            return;
          }
          this.result = (res as Array<SingleElement>).map((row) => new SingleElement(row)).slice(-10);
          this.changeIds(this.arrayIds);
        }
      )
  }

  changeIds(arrayIds: string) {
    this.dataPreparationService.extractIdsFromString(arrayIds).forEach((newId, index) => {
      if (index > 9) {
        return
      }
      this.result[index].setNewId(newId);
    })
  }

  strop() {
    this.workerControlService.terminateWorker();
  }

  ngOnDestroy(): void {
    this.strop();
    this.destroyed.next();
    this.destroyed.complete();
  }

}
