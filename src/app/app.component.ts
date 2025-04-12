import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClassLogger, LogField, Required } from './decorator';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'webworker';

  // @LogMethod()
  logger(): string {
    return 'Hello decorator!';
  }

  @LogField() myName = 'Alien';

  @Required myRequiredField = undefined;

  constructor() {
    this.myRequiredField = undefined;
  }
}

if (typeof Worker !== 'undefined') {
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(data);
  };
  worker.postMessage(100000000000);
}

@ClassLogger()
class MyClass {
  private myName = 'Alien';
}
