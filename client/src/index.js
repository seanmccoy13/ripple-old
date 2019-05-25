import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './app/App';
import client from './graphql/client';

injectGlobal`
*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
body {
	color: #fffce1;
	font-family: 'Raleway', Arial, sans-serif;
  background: #50a3a2;
	margin: 0;
	-webkit-print-color-adjust: exact;
}

@media screen and (max-width: 40em) {
	main {
		font-size: 80%;
	}
	h1 {
		padding-top: 1em;
		font-size: 2.5em;
	}
}
.axis path{fill:none;stroke:#777;shape-rendering:crispEdges}.tick text{font-family:Lato;font-size:13px}.svg-line-chart-point{fill:#fff;stroke-width:2px;cursor:pointer}div.svg-line-chart-tooltip{position:fixed;text-align:center;width:100px;padding-top:5px;padding-bottom:5px;font:12px sans-serif;background:#f5f5f5;border:0;pointer-events:none;opacity:0}.svg-line-chart-label{text-anchor:middle;font-weight:700;font-size:18px;font-family:Ubuntu,sans-serif}
`;

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

render(<Root />, document.querySelector('#root'));
registerServiceWorker();
