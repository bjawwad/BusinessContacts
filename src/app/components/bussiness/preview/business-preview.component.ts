import { Component, OnInit } from '@angular/core';
import { BaseModal } from '../../modals/base.modal';
import { Business } from '../../../models/business.model';

@Component({
    selector: 'business-preview',
    template: `
    <div class="row">
                        <div class="col-sm-7">
                            <p>Category: {{business.category}}</p>
                            <p>Years In Business: {{business.years_in_business}} </p>
                            <p>Description: {{business.description}}</p>
                        </div>

                        <div class="col-sm-5">
                            <h4>Contact Info</h4>
                            <ul>
                                <li>Phone: {{business.phone}}</li>
                                <li>Email: {{business.email}}</li>
                                <li>Street: {{business.street_address}}</li>
                                <li>City: {{business.city}}</li>
                                <li>State: {{business.state}}</li>
                                <li>Zipcode: {{business.zipcode}}</li>
                            </ul>
                        </div>
                    </div>
    `

})
export class BusinessPreviewComponent implements OnInit {

    business: Business;
    message: string;


    constructor() {
        
    }

    ngOnInit() {

    }
}