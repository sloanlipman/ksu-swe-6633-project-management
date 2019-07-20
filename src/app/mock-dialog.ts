import { of } from 'rxjs';

export class MockDialogRef {
  componentInstance: any = {};
  constructor() { }
  close(){
    return true;
  }
  afterClosed(bundle) {
    return {
      subscribe: new Promise((resolve, reject) => {
        resolve({});
      })
    };
  }
}


export class MockDialog {
  constructor() { }
  open() {
    return {
      afterClosed: () => {
        return of('NewProject');
      }
    };
  }
}
