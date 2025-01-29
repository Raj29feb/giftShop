import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

const modulesArr = [
  MatSlideToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  FormsModule,
  MatSliderModule,
  MatExpansionModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [],
  imports: modulesArr,
  exports: modulesArr,
})
export class MaterialModule {}
