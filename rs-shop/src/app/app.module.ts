import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appState } from '@redux/app.state';
import { StateEffects } from '@redux/effects/state.effects';
import { CategoriesEffects } from '@redux/effects/categories.effects';
import { UserEffects } from '@redux/effects/user.effects';

import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { SPINNER_CONTROLLER_INTERCEPTOR_PROVIDE_TOKEN } from './core/interceptors/spinner-controller/spinner-controller.interceptor';
import { ERROR_HANDLER_INTERCEPTOR_PROVIDE_TOKEN } from './core/interceptors/error-handler/error-handler.interceptor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(appState, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([CategoriesEffects, StateEffects, UserEffects]),
  ],
  providers: [
    SPINNER_CONTROLLER_INTERCEPTOR_PROVIDE_TOKEN,
    ERROR_HANDLER_INTERCEPTOR_PROVIDE_TOKEN,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
