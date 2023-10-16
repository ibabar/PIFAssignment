import { SocketServiceService } from '../socket-service.service';
import { IMessageSendModel } from '../models/message.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css'],
})
export class PostMessageComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private studentService: StudentService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ) {}
  dropdownSettings: IDropdownSettings = {};
  isFormSubmitted: boolean = false;
  isCoruseFormSubmitted: boolean = false;

  StudentForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    enrolledCourses: [null, Validators.required],
  });

  CoruseForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
  });

  msgText;
  string = '';

  formSubmitted: boolean = false;
  availableCourses: any[];
  allData: any[];

  ngOnInit(): void {
    this.msgText = '';
    this.formSubmitted = false;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.loadAllCourses();
    this.loadAllData();
  }

  loadAllCourses() {
    this.studentService.getAvailabeCourses().subscribe(
      (data) => {
        if (data) {
          var dt = [];
          data.forEach((element) => {
            dt.push({ item_id: element.id, item_text: element.name });
          });

          this.availableCourses = dt;
        } else {
          this.availableCourses = [];
          this.toastr.error('Failed to save .');
        }
      },
      (error) => {
        this.toastr.error('Error on crouses.');
      }
    );
  }

  loadAllData() {
    this.studentService.loadAllData().subscribe(
      (data) => {
        if (data) {
          this.allData = data;
        } else {
          this.allData = [];
          this.toastr.error('Failed to save .');
        }
      },
      (error) => {
        this.toastr.error('Error on crouses.');
      }
    );
  }

  openModal(modal: TemplateRef<NgbModal>): void {
    this.StudentForm.reset();
    this.CoruseForm.reset();
    this.modalService.open(modal);
  }
  AddStudent() {
    this.isFormSubmitted = true;
    if (this.StudentForm.invalid) {
      this.toastr.error('please select atleast one course .');
      return;
    }

    var saveStd = {
      ExternalId: '',
      name: this.StudentForm.value.name,
      enrolledCourses:
        this.StudentForm.value.enrolledCourses?.length > 0
          ? this.StudentForm.value.enrolledCourses.map((item) => {
              return item.item_id;
            })
          : '',
    };

    this.studentService.saveStudent(saveStd).subscribe(
      (data) => {
        if (data) {
          this.toastr.success('student Saved successfully');
          this.loadAllCourses();
          this.loadAllData();
          this.modalService.dismissAll();
        } else {
          this.toastr.error('Failed to save .');
        }
      },
      (error) => {
        this.toastr.error('Erro on save.');
      }
    );
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  AddCourse() {
    this.isCoruseFormSubmitted = true;
    if (this.CoruseForm.invalid) {
      return;
    }
    this.studentService.saveCourse(this.CoruseForm.value).subscribe(
      (data) => {
        if (data) {
          this.loadAllCourses();
          this.toastr.success('New Course added.');
          this.modalService.dismissAll();
        } else {
          this.toastr.error('Failed to save .');
        }
      },
      (error) => {
        this.toastr.error('Error on save.');
      }
    );
  }

  delete(id) {
    if (!id) {
      return;
    }

    var delStd = {
      id: id,
    };



    Swal.fire({
      title: 'Are you sure?',

      text: 'Deleting a Student will Remove all Enrolled Courses.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete the Student.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(delStd).subscribe(
          (data) => {
            if (data) {
              this.loadAllCourses();
              this.loadAllData();
              this.toastr.success('student removed .');
              this.modalService.dismissAll();
            } else {
              this.toastr.error('Failed to remove student .');
            }
          },
          (error) => {
            this.toastr.error('Error on remove student.');
          }
        );
      }
    });
  }
}
