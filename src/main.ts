import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RouterOutletComponent } from './app/components/router-outlet/router-outlet.component';

bootstrapApplication(RouterOutletComponent, appConfig)
  .catch((err) => console.error(err));
