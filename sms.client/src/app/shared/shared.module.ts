import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidityStyleDirective } from './directives/validity-style.directive';
import { TruncatePipe } from './pipes/truncate-pipe.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DocumentUploadItemComponent } from './components/document-upload-item/document-upload-item.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FeatherIconDirective } from './directives/feather-icon.directive';

import { LogoComponent } from './components/logo/logo.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { TrueOrFalsePipe } from './pipes/true-or-false.pipe';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { YesOrNoPipe } from './pipes/yes-or-no.pipe';
import { DocumentUploadViewComponent } from './components/document-upload-view/document-upload-view.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelInputDirective } from './directives/tel-input.directive';
import { TelInputComponent } from './components/tel-input/tel-input.component';
import { NumberInputDirective } from './directives/number-input.directive';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { BannerComponent } from './components/banner/banner.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AppVersionComponent } from './components/app-version/app-version.component';
import { NumericInputDirective } from './directives/numeric-input.directive';
import { LettterHeadUploadComponent } from './components/lettter-head-upload/lettter-head-upload.component';
import { UserSignatureComponent } from './components/user-signature/user-signature.component';
import { PdfDocumentPreviewDirective } from './directives/pdf-document-preview.directive';
import { PdfPreviewModalComponent } from './components/pdf-preview-modal/pdf-preview-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IntlTelInputComponent } from './components/intl-tel-input/intl-tel-input.component';


@NgModule({
  declarations: [
    
    ValidityStyleDirective,
    NumberInputDirective,
    ErrorDisplayComponent,
    TruncatePipe,
    SafePipe,
    SpinnerComponent,
    ErrorPageComponent,
    DocumentUploadItemComponent,
    DocumentUploadComponent,
    FeatherIconDirective,
    LogoComponent,
    ForbiddenComponent,
    TrueOrFalsePipe,
    ProfilePictureComponent,
    YesOrNoPipe,
    DocumentUploadViewComponent,
    
    TelInputDirective,
    TelInputComponent,
    
    PagetitleComponent,
    BannerComponent,
    AppVersionComponent,
    NumericInputDirective,
    LettterHeadUploadComponent,
    UserSignatureComponent,
    PdfDocumentPreviewDirective,
    PdfPreviewModalComponent,
    IntlTelInputComponent
  ],
  imports: [CommonModule, FileUploadModule,ReactiveFormsModule, FormsModule,NgbCarouselModule,PdfViewerModule ],
  exports: [
    
    ValidityStyleDirective,
    ErrorDisplayComponent,
    TruncatePipe,
    SafePipe,
    SpinnerComponent,
    ErrorPageComponent,
    DocumentUploadItemComponent,
    DocumentUploadComponent,
    FeatherIconDirective,
    LogoComponent,
    BannerComponent,
    TrueOrFalsePipe,
    ProfilePictureComponent,
    YesOrNoPipe,
    DocumentUploadViewComponent,
    
    TelInputDirective,
    TelInputComponent,
    NumberInputDirective,
    
    PagetitleComponent,
    AppVersionComponent,
    NumericInputDirective,
    LettterHeadUploadComponent,
    UserSignatureComponent,
    PdfDocumentPreviewDirective,
    IntlTelInputComponent
  ],
})
export class SharedModule {}
