import { FormArray, FormGroup, FormControl } from '@angular/forms';

declare global {
  type Unpacked<T> = T extends Array<infer U> ? U : T;
  type ToForm<OriginalType> = {
    [key in keyof OriginalType]: OriginalType[key] extends Array<any>
      ? FormArray<
          Unpacked<OriginalType[key]> extends object
            ? FormGroup<ToForm<Unpacked<OriginalType[key]>>>
            : FormControl<Unpacked<OriginalType[key]> | null>
        >
      : OriginalType[key] extends object
      ? FormGroup<ToForm<OriginalType[key]>>
      : FormControl<OriginalType[key] | null>;
  };
}

export {};
