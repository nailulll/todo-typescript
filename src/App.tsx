import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { Todo } from "./model";
import Todolist from "./components/Todolist";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = (): React.ReactNode => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, idDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "active") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    if (destination.droppableId === "active") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">Taskify</div>
        <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Todolist
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
