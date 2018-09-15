import Header from './Header';
import { layoutStyle } from '../Style/common';

const LayoutHOC = (WrappedComponent) => {
  return baseProps => <WrappedComponent {...baseProps} />
};

const LayoutBase = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default LayoutHOC(LayoutBase);