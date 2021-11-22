import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



const materialComponents = [
  MatToolbarModule,
  MatIconModule
]


@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
