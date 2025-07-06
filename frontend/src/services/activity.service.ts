import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity, Type } from '../models/activity';
import { environment } from '../environments/environment';
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

  private readonly socketBaseApiUrl = environment.socketBaseApiUrl;

  constructor() {
    this.socket = io(this.socketBaseApiUrl);

    this.socket.on('connect', () => {
      this.socket.emit('ready');
    });

    this.socket.on('activity', (res: Activity) => {
      console.log(res);
      this.activity$.next(res);
    });
  }

  getActivity(): Observable<Activity> {
    return this.activity$.asObservable();
  }
}
