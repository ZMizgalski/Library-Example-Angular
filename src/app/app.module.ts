import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import {HomeComponent} from './Content/home/home.component';
import {ContactComponent} from './Content/contact/contact.component';
import {ProductsComponent} from './Content/products/products.component';
import {MainNavComponent} from './Content/main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutusComponent} from './Content/aboutus/aboutus.component';
import {RegulationsComponent} from './Content/regulations/regulations.component';
import {DeliveryComponent} from './Content/delivery/delivery.component';
import {NewsComponent} from './Content/news/news.component';
import {LoginComponent} from './User/login/login.component';
import {RegisterComponent} from './User/register/register.component';
import {ShoppingcardComponent} from './Content/shoppingcard/shoppingcard.component';
import {ForgotpasswordComponent} from './User/forgotpassword/forgotpassword.component';
import {AccountComponent} from './User/account/account.component';
import {LibraryComponent} from './User/library/library.component';
import {AuthguardService} from './User/servieces/auth/authguard.service';
import {ProductComponent} from './Content/product/product.component';
import {AddProductComponent} from './User/add-product/add-product.component';
import {ProductListComponent} from './User/product-list/product-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {Dialog1Component} from './Order_Dialogs/Checkout_Dialog/1/dialog1/dialog1.component';
import {MatDialogModule} from '@angular/material/dialog';
import {Dialog2Component} from './Order_Dialogs/Checkout_Dialog/2/dialog2/dialog2.component';
import {FilterProducts} from './User/servieces/auth/filterProducts';
import {TextFilterProducts} from './User/servieces/auth/textFilterProducts';
import {ButtonFilterProducts} from './User/servieces/auth/buttonFilterProducts';
import {AdDialogComponent} from './Order_Dialogs/Dialog_Admin_Change/1/ad-dialog/ad-dialog.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {pageFilter} from './User/servieces/pageFilter/pageFilter';
import {JWTInterceptorService} from './User/servieces/auth/interceptors/jwtInter/j-w-t-interceptor.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    FilterProducts,
    pageFilter,
    TextFilterProducts,
    ButtonFilterProducts,
    ProductsComponent,
    MainNavComponent,
    AboutusComponent,
    RegulationsComponent,
    DeliveryComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingcardComponent,
    ForgotpasswordComponent,
    AccountComponent,
    LibraryComponent,
    ProductComponent,
    AddProductComponent,
    ProductListComponent,
    Dialog1Component,
    Dialog2Component,
    AdDialogComponent,

  ],
  entryComponents: [
    Dialog1Component,
    Dialog2Component,
    AdDialogComponent,


  ],
    imports: [
        BrowserModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatChipsModule,
        MatTableModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatTreeModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSelectModule,
        MatBadgeModule,
        MatDialogModule,
        MatPaginatorModule
    ],
  providers: [AuthguardService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
