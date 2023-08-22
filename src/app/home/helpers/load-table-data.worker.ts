/// <reference lib="webworker" />

import {FakeSocket} from './fake-socket';
import {timer} from 'rxjs';

addEventListener('message', ({data}) => {
  const time = data.time;
  const quantity = data.quantity;
  createFakeSocketConnection(time, quantity)
});

function createFakeSocketConnection(time: number, quantity: number) {
  timer(0, time).subscribe(() =>
    postMessage(FakeSocket.mockData(quantity))
  );
}
