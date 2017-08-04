import <%= namePascal %>Module from './<%= nameKebab %>'
import <%= namePascal %>Controller from './<%= nameKebab %>.controller';
import <%= namePascal %>Component from './<%= nameKebab %>.component';
import <%= namePascal %>Template from './<%= nameKebab %>.html';

describe('<%= namePascal %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= namePascal %>Module.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= namePascal %>Controller();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(<%= namePascal %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = <%= namePascal %>Component;

      it('includes the intended template',() => {
        expect(component.template).to.equal(<%= namePascal %>Template);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(<%= namePascal %>Controller);
      });
  });
});
