import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { BusinessDetailsComponent } from './components/bussiness/business-details.component';
import { BaseModal } from './components/modals/base.modal';
import { BusinessPreviewComponent } from './components/bussiness/preview/business-preview.component';
import { BusinessFormComponent } from './components/bussiness/form/business-form.component';
import { ModalModule } from 'ng2-bootstrap';


var config = {
  apiKey: "AIzaSyBjT8X4ftJ5gyrhJCCTG4bKqIMLpdpk7P0",
  authDomain: "businesscontacts-c0d8c.firebaseapp.com",
  databaseURL: "https://businesscontacts-c0d8c.firebaseio.com",
  storageBucket: "businesscontacts-c0d8c.appspot.com",
  messagingSenderId: "949683068429"
};


@NgModule({
  entryComponents: [
    BusinessPreviewComponent,
    BusinessFormComponent
  ],
  declarations: [
    AppComponent,
    BusinessDetailsComponent,
    BusinessPreviewComponent,
    BaseModal,
    BusinessFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
