import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatCheckboxModule, 
  MatTabsModule, 
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'


@NgModule({
  declarations: [],
  imports: 
  [ MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCheckboxModule, 
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule ],
  exports: 
  [ MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCheckboxModule, 
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule ],
  providers: [],
})
export class MaterialModule {}