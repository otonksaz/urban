import {Observable} from "@angular/cli/node_modules/rxjs";

export interface IServiceInterface {
  getLists(): any;
  getById(id: any): any;
  save(object: any): any;
  update(id: any, object: any): any;
  delete(id: any): any;
}
