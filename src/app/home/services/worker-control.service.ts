import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {FakeSocket} from '../helpers/fake-socket';

@Injectable({
  providedIn: 'root'
})
export class WorkerControlService {

  private worker?: Worker;

  public callWorker<R>(data: { time: number, quantity: number }): Observable<R> {
    const subject = new ReplaySubject<R>(1);
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../helpers/load-table-data.worker', import.meta.url));
      this.worker.onmessage = ({data}) => {
        subject.next(data);
      };
      this.worker.postMessage(data);
    } else {
      subject.next(FakeSocket.mockData(data.quantity) as unknown as R);
    }
    return subject;
  }

  public terminateWorker() {
    if (this.worker) {
      this.worker.terminate();
    }
  }


}
