import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity, Type } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private socket: Socket;
  private activity$ = new BehaviorSubject<Activity>({
    name: 'Sleep',
    details: 'In bed',
    state: 'Zzzz',
    type: Type.Sleeping,
    imageUrl: 'https://i.ibb.co/yBqP25z5/good-night.gif',
  });

  constructor() {
    this.socket = io('wss://portfolio-62924394999.asia-south1.run.app');

    this.socket.on('activity', (res: Activity) => {
      console.log(res);
      this.activity$.next(res);
    });
  }

  getActivity(): Observable<Activity> {
    return this.activity$.asObservable();
  }
}
