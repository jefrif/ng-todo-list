export class Task {
  constructor(name: string, done: boolean, id: number) {
    this.name = name;
    this.done = done;
    this.id = id;
  }

  get done(): boolean {
    return <boolean>this._done;
  }

  set done(value: boolean) {
    this._done = value;
  }

  name: string | undefined;
  private _done: boolean | undefined;
  id: number;
}
