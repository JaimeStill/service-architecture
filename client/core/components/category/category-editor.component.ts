import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Category,
  GenerateCategoryForm
} from '../../models';

import { CategoryApi } from '../../apis';

@Component({
  selector: 'category-editor',
  templateUrl: 'category-editor.component.html',
  providers: [ CategoryApi ]
})
export class CategoryEditorComponent implements OnInit {
  form: FormGroup;

  @Input() category: Category;
  @Input() label = 'Category';
  @Input() size: number = 360;
  @Input() cardStyle = 'p8';
  @Output() saved = new EventEmitter<Category>();

  constructor(
    private fb: FormBuilder,
    public categoryApi: CategoryApi
  ) { }

  ngOnInit() {
    this.form = GenerateCategoryForm(this.category, this.fb);
  }

  save = async () => {
    if (this.form?.valid) {
      const res = await this.categoryApi.save(this.form.value);
      res && this.saved.emit(res);
    }
  }
}
