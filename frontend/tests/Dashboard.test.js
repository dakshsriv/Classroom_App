import renderer from 'react-test-renderer';
import Dashboard from '../components/Dashboard';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Dashboard></Dashboard>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});