import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef, Type } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Business } from '../../models/business.model';
import { Category } from '../../models/category.model';
import { BaseModal } from '../modals/base.modal';
import { BusinessPreviewComponent } from '../bussiness/preview/business-preview.component';
import { BusinessFormComponent } from '../bussiness/form/business-form.component';


@Component({
    selector: 'business-details',
    templateUrl: './business-details.component.html',
    providers: [FirebaseService],
    viewProviders: []

})
export class BusinessDetailsComponent implements OnInit {

    @ViewChild(BaseModal) staticModal: BaseModal;
    businesses: Business[];
    categories: Category[];


    private componentRef: ComponentRef<any>;
    private componentFactory: ComponentFactory<any>;


    constructor(private _firebaseService: FirebaseService, private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {

        this.getBusiness();

        this._firebaseService.getCategories().subscribe(
            (categories) => {
                this.categories = categories;
            }, (error) => {
                console.log('error occured ->' + error);
            }
        );
    }

    getBusiness(category: string = null): void {
        this._firebaseService.getBusinesses(category).subscribe(
            (businesses) => {
                this.businesses = businesses;
            }
            , (error) => {
                console.log('error occured ->' + error);
            }
        );
    }

    showDetails(business: Business) {
        this.staticModal.title = business.company;
        this.showModal(business, BusinessPreviewComponent);
    }

    addBusiness(business: Business = null) {
        this.showModal(business, BusinessFormComponent);
    }

    showModal(business: Business = null, component: Type<{}>) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.componentRef = this.staticModal.modalBody.createComponent(this.componentFactory);

        if (business != null) {
            this.componentRef.instance.business = business;
        }

        this.componentRef.changeDetectorRef.detectChanges();

        setTimeout(() => {
            this.staticModal.showModal(this.componentRef);
        }, 0)
    }

    onFilterCategory(category: string): void {
        this.getBusiness(category);
    }

    deleteBusiness(index: number) {
        this._firebaseService.deleteBusiness(index);
    }

    onModalHidden(event): void {
        this.componentFactory = null;
        this.componentRef.destroy();
    }

}