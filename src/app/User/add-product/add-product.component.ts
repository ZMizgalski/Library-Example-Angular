import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../servieces/auth/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

// tslint:disable-next-line:class-name
export interface category {
  value: string;
  viewValue: string;
}

// tslint:disable-next-line:class-name
export interface type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: category[] = [
    {value: 'Przygodowe', viewValue: 'Przygodowe'},
    {value: 'Podróżnicze', viewValue: 'Podróżnicze'},
    {value: 'Historyczne', viewValue: 'Historyczne'},
    {value: 'Postapo', viewValue: 'Postapo'},
    {value: 'Fantasy', viewValue: 'Fantasy, science fiction'},
    {value: 'Horror', viewValue: 'Horror'},
    {value: 'Bajki', viewValue: 'Bajki'},
    {value: 'Lektury', viewValue: 'Lektury'}
  ];
  // selectedMatType: boolean = false;
  registerForm: FormGroup;
  base64Img: string;
  // @ts-ignore
  @ViewChild('fileUploader') fileUploader: ElementRef;
  submitted = false;
  productAdded = false;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private matSnackBar: MatSnackBar, private authService: AuthService, private sanitizer: DomSanitizer, private cd: ChangeDetectorRef, private router: Router) {
  }


  types: type[] = [
    {value: 'Beletrystyka', viewValue: 'Beletrystyka'},
    {value: 'Literatura Dziecięca', viewValue: 'Literatura Dziecięca'},
    {value: 'Komiksy', viewValue: 'Komiksy'}
  ];

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      file: [null, Validators.required],
      productName: [null, Validators.required],
      category: [null, Validators.required],
      bookType: [null, Validators.required],
      author: [null, Validators.required]
    });
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Img);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerForm.patchValue({
          file: reader.result
        });
        if (typeof reader.result === 'string') {
          this.base64Img = reader.result;
        }
        this.submitted = true;
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSubmit(form: NgForm) {
    this.productAdded = true;
    this.authService.addNewProduct(form)
      .subscribe((error: HttpErrorResponse) => {
        if (!error) {
          this.matSnackBar.open('Something is Wrong', 'Close', {
            verticalPosition: 'top'
          });
          this.productAdded = false;
        } else {
          this.matSnackBar.open('Product added successfully', 'Close', {
            verticalPosition: 'top'
          });
          this.productAdded = false;
          this.router.navigate(['productList']);
        }
      });
  }

  /*
    selectedType($event: MatOptionSelectionChange) {
      this.selectedMatType = $event.isUserInput === true;
    }
   */
}
