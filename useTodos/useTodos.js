import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';


const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodos = ( initialState = [] ) => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])


    const handleNewTodo = ( todo ) => {
        dispatch({
            type: '[TODO] Add todo',
            payload: todo
        });
    }

    const handleDeleteTodo = ( id ) => {
        dispatch( {
            type: '[TODO] Remove todo',
            payload: id
        });
        console.log('remove ID:', id);
    }

    const handleToggleTodo = ( id ) => {
        dispatch( {
            type: '[TODO] Toggle todo',
            payload: id
        });
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
