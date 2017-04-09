import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, Output, EventEmitter, ComponentRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap'

@Component({
    selector: 'base-modal',
    templateUrl: './base.modal.html',
    // template: '{{message}}',
    exportAs: 'businessModal'

})
export class BaseModal implements OnInit {

    public message: string = "Hello World";

    public title: string;

    public modalTemplate: string;

    @ViewChild('staticModal') private modal: ModalDirective;

    @ViewChild('modalBody', { read: ViewContainerRef }) modalBody: ViewContainerRef;

    @Output()
    private onHidden: EventEmitter<string> = new EventEmitter();

    private componentRef: ComponentRef<any>;

    constructor() { }

    ngOnInit() { }

    public showModal(componentRef: ComponentRef<any>): void {
        this.componentRef = componentRef;
        this.modal.show();
    }

    public hideModal(): void {
        this.onHidden.emit('hidden');
        this.modal.hide();
    }

    onClick() {
        if (this.componentRef.instance.submit) {
            this.componentRef.instance.submit();
        }

        this.hideModal();
    }


}