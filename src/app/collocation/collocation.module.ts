import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollocationComponent } from './collocation.component';
import { IndexCollocationComponent } from './index/index.component';
import { CollocationFormComponent } from './form/form.component';
import { EditCollocationComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [CollocationComponent, IndexCollocationComponent, CollocationFormComponent, EditCollocationComponent],
    exports: [CollocationComponent, IndexCollocationComponent, CollocationFormComponent, EditCollocationComponent]
})
export class CollocationModule {
}
