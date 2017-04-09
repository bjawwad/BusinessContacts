import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from '../../../models/business.model';
import { Category } from '../../../models/category.model';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
    selector: 'business-form',
    templateUrl: './business-form.component.html'
})
export class BusinessFormComponent implements OnInit {

    businessForm: FormGroup;
    business: Business;
    categories: Category[];

    constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService) {
        this.createForm();
    }

    ngOnInit() {

        this.firebaseService.getCategories().subscribe(
            (categories) => {
                this.categories = categories;
                this.setFormValues();
            },
            (error) => {
                console.log('category not found');
            }
        );

    }

    createForm(): void {
        this.businessForm = this.formBuilder.group({
            businessName: ['', Validators.required],
            category: [''],
            yearsInBusiness: [null, Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    setFormValues() {
        if (this.business) {
            this.businessForm.setValue({
                businessName: this.business.company,
                category: this.business.category,
                yearsInBusiness: this.business.years_in_business,
                email: this.business.email,
                phone: this.business.phone,
                street: this.business.street_address,
                city: this.business.city,
                state: this.business.state,
                zipcode: this.business.zipcode,
                description: this.business.description
            });
        }
        else {
            this.business = new Business();
        }
    }

    addBusiness(): void {
        var obj = this.businessForm.getRawValue();
        this.business.company = obj.businessName;
        this.business.category = obj.category;
        this.business.years_in_business = obj.yearsInBusiness;
        this.business.email = obj.email;
        this.business.phone = obj.phone;
        this.business.street_address = obj.street;
        this.business.city = obj.city;
        this.business.state = obj.state;
        this.business.zipcode = obj.zipcode;
        this.business.description = obj.description;


        // business.id = 
        // business.company = business.businessName;
        this.firebaseService.saveBusiness(this.business);
    }

    submit() {
        this.addBusiness();
    }
}