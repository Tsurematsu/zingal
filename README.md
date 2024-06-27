# Zingal module documentation
## Description
 Zingal is a module that combines features from Zustand and Signal to create an easy-to-use, reactive state store in JavaScript applications, especially useful in frameworks like React.

# Facility
```bash
 npm install zingal
```

## Parameters:

* object: An object that defines the initial state and properties of the store.
* Returns: A Proxy that wraps the store and provides reactive functionality.
*Automatically generated methods
For each key property in the initial object, a setter method with the name setKey is automatically generated.


 Note: Zingal automatically handles reactivity for these common operations, ensuring that subscribed components are updated when state changes.

## Special method: subscribe()
```jsx
store.subscribe();
```
Description: Subscribes the current component to the store, updating its state when the store changes.


## Usage examples

### Example 1: Simple counter
This example shows how to create a simple counter using zingal in two different components.

#### Counter.jsx
```jsx
import React from 'react';
import zingal from 'zingal';

const store = zingal({
 counter: 0,
});
export { store };
export default function Counter() {
 store.subscribe();
 return (
 <div>
    <h1>Counter: {store.counter}</h1>
 </div>
 );
}
```

#### Button.jsx
```jsx
import React from 'react';
import { store } from './Counter';

export default function Button() {
 const incrementCounter = () => {
    store.counter++;
 };
 const decrementCounter = () => {
    store.counter--;
 };

 return (
 <button onClick={incrementCounter}>Increase</button>
 );
}
```

## Working with Arrays and Objects
 Zingal provides a simple way to work with arrays and objects, allowing reactive updates with common operations.

### Arrays

#### Using push
To add elements to an array, you can use `push` directly and the store will update automatically:

```javascript
import zingal from 'zingal';

const store = zingal({
 fruits: ['apple', 'banana']
});

// In any component
store.subscribe();

// Add an element
store.fruits.push('orange');
console.log(store.fruits); // ['apple', 'banana', 'orange']
```

## Using map
You can use map to transform arrays. The result must be assigned back to the store:

```js
store.fruits = store.fruits.map(fruit => fruit.toUpperCase());
console.log(store.fruits); // ['APPLE', 'BANANA', 'ORANGE']
```

## Object Arrays
You can manipulate arrays of objects by combining the previous techniques:
```js
const store = zingal({
 all: [
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Exercise', completed: true }
 ]
});

store.subscribe();

// Add a new everything
store.todos.push({ id: 3, text: 'Read a book', completed: false });

// Update an existing whole
store.todos = store.todos.map(todo =>
 all.id === 1 ? { ...all, completed: true } : all
);

console.log(store.all);
// [
//    { id: 1, text: 'Buy milk', completed: true },
//    { id: 2, text: 'Exercise', completed: true },
//    { id: 3, text: 'Read a book', completed: false }
// ]
```

## Advanced Example: Dynamic Components with Deep Update

This example demonstrates how Zingal can handle complex scenarios, including generating dynamic components via `map` and deep updating objects passed as props.

```jsx
import React from 'react';
import zingal from 'zingal';

// Store creation
const store = zingal({
 tasks: [
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Master Zingal', completed: false },
    { id: 3, title: 'Build an app', completed: false },
 ]
});

// Main component that renders the task list
function TaskList() {
 store.subscribe();

 return (
 <div>
    <h1>To Do List</h1>
    {store.tasks.map(task => (
      <TaskItem key={task.id} task={task} />
    ))}
    <button onClick={addTask}>Add Task</button>
 </div>
 );
}

// Child component that represents an individual task
function TaskItem({ task }) {
 return (
 <div>
    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.title}
    </span>
    <button onClick={() => toggleTask(task.id)}>
      {task.completed ? 'Uncheck' : 'Complete'}
    </button>
 </div>
 );
}

// Function to toggle the state of a task
function toggleTask(id) {
 store.tasks = store.tasks.map(task =>
 task.id === id ? { ...task, completed: !task.completed } : task
 );
}

// Function to add a new task
function addTask() {
 const newTask = {
 id: Date.now(),
 title: `New Task ${store.tasks.length + 1}`,
 completed: false
 };
 store.tasks.push(newTask);
}

export default TaskList;
```

### Using pop
The `pop()` method removes the last element from an array and updates the store automatically:

```javascript
import zingal from 'zingal';

const store = zingal({
 stack: ['first', 'second', 'third']
});

store.subscribe();
console.log(store.stack); // ['first second Third']

const removedItem = store.stack.pop();

console.log(removedItem); // 'third'
console.log(store.stack); // ['first second']

// Trying to pop into an empty array
store.stack.pop();
store.stack.pop();
const lastPop = store.stack.pop();

console.log(lastPop); // undefined
console.log(store.stack); //[]
```

## Keywords
- **State Management**
- **React**
- **JavaScript**
- **Zustand**
- **Signal**
- **Reactive Programming**
- **Store**
- **Frontend Development**
- **Web Development**