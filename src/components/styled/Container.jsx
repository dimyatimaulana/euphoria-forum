import styled from 'styled-components';

const Container = styled.div`
  max-width: ${(props) => props.maxWidth};
  maxHeight: ${(props) => props.maxHeight}
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

Container.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%',
  margin: '0',
  padding: '1rem',
};

export default Container;
