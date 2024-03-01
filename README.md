# usegetstate

What is the best way to console log count exactly once a second?

```jsx
const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState(123);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
```

#### Try Number 1

Add it to the useEffect dependency

```jsx
const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState(123);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]); // <-- add count here

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
```

This sort of works except we recreate the effect when count is changed so we don't actually log every second, we get it one second after the button is clicked then one second on from that.

We can add some extra delta logic to solve this using deltas, but things are getting complicated fast...

#### Try Number 2

Use Ref

```jsx
const ExampleComponent: React.FC = () => {
  const countRef = useRef(134);
  const [count, setCount] = useState(countRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
```

This works at the cost of adding an extra place to store the data. We will have to keep this in sync from now on and is a little bit ugly.

#### Enter usegetstate

```jsx
const ExampleComponent: React.FC = () => {
  const [count, setCount, getCount] = useGetState(countRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(getCount());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
```

When using getState in your functions you ensure that you are always using the latest version of the state. This makes it super simple to write performant react code.

How often have we done something like this?

```jsx
import doesSomethingImportant from 'real-world-sideeffects'

const App: React.FC = ()=> {

   const [count, setCount, getCount] = useGetState(countRef.current);

	const onClick = () => {
		setCount(count + 1);
		someFunction();
	}

	const someFunction() = () => thatOtherFunction();

	const thatOtherFunction = () => {
		doesSomethingImportant(count)
	}

	return <div>
		{count}
		<button onClick={() => setCount(count + 1)}>increment</button>
	</div>
}
```

usegetstate Solves this too

```jsx
import doesSomethingImportant from 'real-world-sideeffects'

const App: React.FC = ()=> {

   const [count, setCount, getCount] = useGetState(countRef.current);

	const onClick = () => {
		setCount(count + 1);
		someFunction();
	}

	const someFunction() = () => thatOtherFunction();

	const thatOtherFunction = () => {
		doesSomethingImportant(getCount())
	}

	return <div>
		{count}
		<button onClick={() => setCount(count + 1)}>increment</button>
	</div>
}
```

# Install

```bash
npm install usegetstate
```
