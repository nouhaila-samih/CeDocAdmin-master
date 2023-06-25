import { ToolbarModule } from "primeng/toolbar";
import { CalendarModule } from "primeng/calendar";
import { NgModule } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DialogModule } from "primeng/dialog";
import { PaginatorModule } from "primeng/paginator";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { InputSwitchModule } from "primeng/inputswitch";
import { GalleriaModule } from "primeng/galleria";
import { AutoCompleteModule } from "primeng/autocomplete";
import { SplitButtonModule } from "primeng/splitbutton";
import { CardModule } from "primeng/card";
import { TabViewModule } from "primeng/tabview";
import { SkeletonModule } from "primeng/skeleton";
import { BlockUIModule } from "primeng/blockui";
import { PanelModule } from "primeng/panel";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { RadioButtonModule } from "primeng/radiobutton";
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";
import { RippleModule } from "primeng/ripple";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CheckboxModule } from "primeng/checkbox";
import { CarouselModule } from "primeng/carousel";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { SelectButtonModule } from "primeng/selectbutton";
import {TooltipModule} from 'primeng/tooltip';


//27-02-2022
import { TabMenuModule } from "primeng/tabmenu";
import { TimelineModule } from "primeng/timeline";
import { AvatarModule } from "primeng/avatar";

//29-05-2022
import { FullCalendarModule } from "primeng/fullcalendar";
//02-06-2022
import { DividerModule } from "primeng/divider";
import { BadgeModule } from "primeng/badge";

@NgModule({
    exports: [
        SelectButtonModule,
        ToolbarModule,
        CalendarModule,
        DynamicDialogModule,
        CarouselModule,
        CheckboxModule,
        InputTextareaModule,
        RippleModule,
        ChartModule,
        TagModule,
        SplitButtonModule,
        AccordionModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        ProgressSpinnerModule,
        DialogModule,
        PaginatorModule,
        FileUploadModule,
        ToastModule,
        ConfirmDialogModule,
        ScrollPanelModule,
        AutoCompleteModule,
        TableModule,
        MultiSelectModule,
        InputSwitchModule,
        CardModule,
        GalleriaModule,
        TabViewModule,
        SkeletonModule,
        BlockUIModule,
        PanelModule,
        BreadcrumbModule,
        RadioButtonModule,
        TabMenuModule, //27-02-2022
        TimelineModule,
        AvatarModule,
        FullCalendarModule,
        DividerModule,
        BadgeModule,
        TooltipModule,
    ],
})
export class PrimeModules {}
