import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogField, LogMethod } from './decorator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'webworker';

  @LogMethod()
  logger(): string {
    return 'Hello decorator!';
  }

  @LogField()
  private readonly myName = 'Alien';

  ngOnInit(): void {
    this.logger();
    this.myName;
  }
}

if (typeof Worker !== 'undefined') {
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(data);
  };
  worker.postMessage(100000000000);
}
