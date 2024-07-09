import React, { useEffect, useState } from "react";

function TodoList() {
    const [inputValue, setInputValue] = useState("");
    const [tareas, setTareas] = useState([]);


    function createUsuario() {
        fetch('https://playground.4geeks.com/todo/users/Camila', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    function agregarTarea() {
        fetch('https://playground.4geeks.com/todo/users/Camila', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
          setTareas(data.todos)
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            const nuevaTarea = {
                id: tareas.length + 1,
                texto: inputValue,
                completada: false
            };

            setTareas([...tareas, nuevaTarea]);
            setInputValue("");
        }
    };

    const handleDelete = (id) => {
        const nuevasTareas = tareas.filter(item => item.id !== id);
        setTareas(nuevasTareas);
    };

    useEffect(() => {
        createUsuario()
        agregarTarea()

    }, [])


    

    return (


        <div className="card mt-5 bg-ligth w-50 shadow-lg p-3 mb-5 bg-body">
            <p className="text-center text-danger" style={{ fontSize: "100px" }}>Todos</p>
            <form className="d-flex justify-content-center " onSubmit={handleSubmit}>
                <input className="input-group w-50 "
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Agregar nueva tarea"
                />

            </form>

            <ul className="list-group mt-5">
                {tareas.map(item=> (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                        <div>
                            <span className="" >{item.texto}</span>
                             <span className="" >{item.label}</span>
                           
                        </div>
                        <button className="btn-close" aria-label="Close" onClick={() => handleDelete(item.id)}></button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
