import React from 'react';
import ReactDOM from 'react-dom';

let hookStates = [];
let hookIndex = 0;

function useRef(initialState) {
    hookStates[hookIndex] = hookStates[hookIndex] || { current: initialState };
    return hookStates[hookIndex++];
}
function forwardRef(FunctionComp) {
    return class extends React.Component {
        render() {
            return FunctionComp(this.props, this.ref);
        }
    };
}

// createElement中把current指向dom
function createRef() {
    return {
        current: null,
    };
}

function useImperativeHandle(ref, createHandle, deps) {
    ref.current = createHandle();
}

function createContext() {
    let context = {
        _currentValue: null,
    };
    function Provider({ value, children }) {
        context._currentValue = value;
        return children;
    }
    function Consumer({ children }) {
        return children(context._currentValue);
    }
    context.Provider = Provider;
    context.Consumer = Consumer;
    return context;
};

function useContext(context) {
    return context._currentValue;
}

function useReducer(reducer, initialState, init) {
    hookStates[hookIndex] = hookStates[hookIndex] || (init ? init(initialState) : initialState);
    let currentIndex = hookIndex;
    function dispatch(action) {
        hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action;
        render();
    }
    return [hookStates[hookIndex++], dispatch];
}
function useState(initialState) {
    return useReducer(null, initialState);
}
/*
function useState(initialState) {
    hookStates[hookIndex] = hookStates[hookIndex] || initialState;
    let currentIndex = hookIndex;
    function setState(newState) {
        hookStates[currentIndex] = newState;
        render();
    }
    return [hookStates[hookIndex++], setState];
}
*/
function useMemo(factory, deps) {
    const setNewMemo = () => {
        let newMemo = factory();
        hookStates[hookIndex++] = [newMemo, deps];
        return newMemo;
    };
    if (hookStates[hookIndex]) {
        let [lastMemo, lastDeps] = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
            return lastMemo;
        } else {
            return setNewMemo();
        }
    } else {//如果取不到，说明第一次调用
        return setNewMemo();
    }
}
function useCallback(callback, deps) {
    const setNewCallback = () => {
        hookStates[hookIndex++] = [callback, deps];
        return callback;
    };
    if (hookStates[hookIndex]) {
        let [lastCallback, lastDeps] = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
            return lastCallback;
        } else {
            setNewCallback();
        }
    } else {//如果取不到，说明第一次调用
        setNewCallback();
    }
}

function useEffect(callback, deps) {
    const setNewEffect = () => {
        hookStates[hookIndex++] = deps;
        setTimeout(callback);
    };
    if (hookStates[hookIndex]) {
        let lastDeps = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
        } else {
            setNewEffect();
        }
    } else {
        setNewEffect();
    }
}

function useLayoutEffect(callback, deps) {
    const setNewEffect = () => {
        hookStates[hookIndex++] = deps;
        queueMicrotask(callback);
    };
    if (hookStates[hookIndex]) {
        let lastDeps = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
        } else {
            setNewEffect();
        }
    } else {
        setNewEffect();
    }
}

let Child = ({ data, handleClick }) => {
    console.log('Child render');
    return (
        <button onClick={handleClick}>{data.number}</button>
    )
}
class PureComponent extends React.Component {
    shouldComponentUpdate(newProps, nextState) {
        return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState);
    }
}
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) {
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
function memo(OldComponent) {
    return class extends PureComponent {
        render() {
            return <OldComponent {...this.props} />
        }
    }
}
Child = memo(Child);

function App() {
    console.log('App render');
    const [name, setName] = useState('zhufeng');
    const [number, setNumber] = useState(0);
    let data = useMemo(() => ({ number }), [number]);
    let handleClick = useCallback(() => setNumber(number + 1), [number]);
    return (
        <div>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
            <Child data={data} handleClick={handleClick} />
        </div>
    )
}

function render() {
    hookIndex = 0;
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
render();

export default (props) => {
    console.log('Hooks---render--');
    console.log(props);
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const onInput = (e) => setName(e.target.value);

    const onClick = useCallback(() => setCount(x => x + 1), []);
    const data = useMemo(() => {
        console.log('useMemo----');
        return {
            count
        };
    }, [count]);

    // const onClick = () => setCount(x => x + 1);
    // const data = {
    //     count
    // };

    return (
        <>
            <input value={name} onInput={onInput} /> 修改input时 Counter不会重新re-render
            <Counter count={data} onClick={onClick} />
        </>
    );
};

const Counter = memo(({ count, onClick }) => {
    console.log('Counter--render---');
    return (
        <>
            <p>{count.count}</p>
            <button onClick={onClick}>+</button>
        </>
    );
});