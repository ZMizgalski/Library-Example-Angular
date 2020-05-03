import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Content/home/home.component';
import {ContactComponent} from './Content/contact/contact.component';
import {ProductsComponent} from './Content/products/products.component';
import {AboutusComponent} from './Content/aboutus/aboutus.component';
import {DeliveryComponent} from './Content/delivery/delivery.component';
import {NewsComponent} from './Content/news/news.component';
import {RegulationsComponent} from './Content/regulations/regulations.component';
import {RegisterComponent} from './User/register/register.component';
import {LoginComponent} from './User/login/login.component';
import {ShoppingcardComponent} from './Content/shoppingcard/shoppingcard.component';
import {ForgotpasswordComponent} from './User/forgotpassword/forgotpassword.component';
import {AccountComponent} from './User/account/account.component';
import {LibraryComponent} from './User/library/library.component';
import {AuthguardService} from './User/servieces/auth/authguard.service';
import {AddProductComponent} from './User/add-product/add-product.component';
import {ProductListComponent} from './User/product-list/product-list.component';

const routes: Routes = [
  {path: 'addProduct', component: AddProductComponent, canActivate: [AuthguardService]},
  {path: 'productList', component: ProductListComponent, canActivate: [AuthguardService]},
  {path: 'library', component: LibraryComponent, canActivate: [AuthguardService]},
  {path: 'account', pathMatch: 'full', component: AccountComponent, canActivate: [AuthguardService]},
  {path: 'reset-password', component: ForgotpasswordComponent},
  {path: 'shoppindcard', component: ShoppingcardComponent, canActivate: [AuthguardService]},
  {path: 'register', component: RegisterComponent, data: {title: 'register'}},
  {path: 'login', component: LoginComponent, data: {title: 'login'}},
  {path: 'news', component: NewsComponent},
  {path: 'delivery', component: DeliveryComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'regulations', component: RegulationsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
