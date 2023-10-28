let currentListener = undefined;

function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  const getValue = () => {
    if (currentListener !== undefined) {
      subscribers.add(currentListener);
    }
    return value;
  };

  const setValue = (newValue) => {
    value = newValue;
    subscribers.forEach((fn) => fn());
  };

  return [getValue, setValue];
}

function createEffect(callback) {
  currentListener = callback;
  callback();
  currentListener = undefined;
}

function createResource(source, fetcher) {
  const [value, setValue] = createSignal(false);

  async function runfetcher() {
    try {
      setValue("loading");
      const response = await fetcher(source());

      if (response.ok) {
        const jsonData = await response.json();
        setValue(jsonData);
      } else {
        setValue(false);
      }
    } catch (error) {
      setValue(false);
    }
  }

  createEffect(() => {
    runfetcher();
  });

  return [value];
}

export { createSignal, createEffect, createResource };

// apparently fetch if passed a blank string returns an ok response?
// weird
// const [source, setSource] = createSignal('');
// const [data] = createResource(source, fetch);
