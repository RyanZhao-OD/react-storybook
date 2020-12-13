import React, { memo, useState, useCallback, useMemo } from 'react';

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