import { LoadingComponent } from './loading.component';

/**
 * we are not using the TestBed anymore.
 * we prefer to create an instance from the component, service, etc. and test only the functionality for the methods.
 * also we create mocks for all the services to use them in the test files.
 */
describe('LoadingComponent', () => {
  let component: LoadingComponent;

  beforeEach(() => {
    component = new LoadingComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
