import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ServerConfig } from './config';
import { Components } from './components';
import { Dialogs } from './dialogs';
import { Forms } from './forms';

@NgModule({
  declarations: [
    ...Components,
    ...Dialogs,
    ...Forms
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ...Components,
    ...Dialogs,
    ...Forms,
    MaterialModule
  ],
  providers: []
})
export class CoreModule {
  static forRoot(config: ServerConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: ServerConfig, useValue: config }
      ]
    };
  }
}
