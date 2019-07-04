import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'


@NgModule({
  declarations: [],
  imports: [ MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, FlexLayoutModule ],
  exports: [ MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, FlexLayoutModule ],
  providers: [],
})
export class MaterialModule {}