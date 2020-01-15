import { $, createComponent } from '../src';
import { Div, H1, P, render } from '../src/platforms/dom';

const App = createComponent(() => [$(Div, {}, [$(H1, {}, ['App']), $(P, {}, ['Hello, world!'])])]);

render(document.getElementById('root')!, $(App, {}, []));
