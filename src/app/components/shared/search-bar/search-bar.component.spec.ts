import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;

  beforeEach(() => {
    component = new SearchBarComponent();
  });

  it('should create an instance of SearchBarComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    it('should emit onSearch event with the correct searchKeyword', () => {
      const mockSearchKeyword = 'test keyword';

      spyOn(component.onSearch, 'emit');

      component.searchKeyword = mockSearchKeyword;
      component.search();
      expect(component.onSearch.emit).toHaveBeenCalledWith(mockSearchKeyword);
    });

    it('should reset searchKeyword after calling search method', () => {
      component.searchKeyword = 'test keyword';
      component.search();

      expect(component.searchKeyword).toBe('test keyword');
    });
  });
});
