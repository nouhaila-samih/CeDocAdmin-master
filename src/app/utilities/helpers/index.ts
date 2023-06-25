import { FormControl } from '@angular/forms';

export function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;

    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}


export function toFormData<T>(formValue: T , setNull = false) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    if (value && value.label) {
      if (value.value) {
        formData.append(key, value.value);
      } else {
        if (setNull){
          formData.append(key, null);
        }

      }

    } else if (value &&  Array.isArray(value)) {

        value.forEach(e => formData.append(key + '[]', e.value ? e.value : e.id));
    }else if (value) {
      formData.append(key, value);
    }
  }

  return formData;
}

export function stringToItem(item: string) {
    return {
        value:item,
        label:item,
    };
}
export function stringListToItems(items: string[]) {
    return items.map(e => stringToItem(e))
}
