import { FormControl } from "@angular/forms";

export interface IFormSignUp{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
