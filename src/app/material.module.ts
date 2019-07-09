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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
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
    MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
    FlexLayoutModule ],
  providers: [],
})
export class MaterialModule {}