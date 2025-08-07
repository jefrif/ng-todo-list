import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {TaskService} from './task.service';
import {Task} from "../domain/task";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should return a value from a promise', fakeAsync(() => {
    const expectedData = [];
    expectedData.push(new Task('Taking a bath', false, 1));
    expectedData.push(new Task('Wearing clothes', false, 2));
    expectedData.push(new Task('Combing my hair', false, 3));
    spyOn(service, 'fetchData').and.returnValue(Promise.resolve(expectedData));

    let result: any = [];
    service.fetchData().then(value => {
      result = value;
    });

    // Advance the virtual clock to resolve the promise
    tick();

    expect(result.length).toBe(expectedData.length);
  }));

/*
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
*/
});
