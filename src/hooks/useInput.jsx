import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  // eslint-disable-next-line no-unused-vars
  function handleValueChange({ target }) {
    setValue(target.value);
  }

  return [value, setValue];
}

export default useInput;
