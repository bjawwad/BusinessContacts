import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs'
import { Business } from '../models/business.model';
import { Category } from '../models/category.model';

@Injectable()
export class FirebaseService {
    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private _af: AngularFire) {
    }

    getBusinesses(category: string = null) {
        if (category == null || category == 'All') {
            this.businesses = this._af.database.list('/businesses') as FirebaseListObservable<Business[]>;
        }
        else {
            this.businesses = this._af.database.list('/businesses', {
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as FirebaseListObservable<Business[]>;
        }

        return this.businesses;
    }

    getCategories() {
        this.categories = this._af.database.list('/categories') as FirebaseListObservable<Category[]>;
        return this.categories;
    }

    saveBusiness(business: Business) {
        this._af.database.list('/businesses').map((list) => list.length)
            .subscribe(
            (length) => {
                var index = '';
                if (business.id < 0 || business.id == null) {
                    business.id = length + 1;
                    index = business.id.toString();
                } else {
                    index = business.id.toString();
                }
                this.businesses.update(index, business);
            }
            );
    }

    deleteBusiness(index: number) {
        var _index = index + 1;
        this.businesses.remove(_index.toString());
    }
}