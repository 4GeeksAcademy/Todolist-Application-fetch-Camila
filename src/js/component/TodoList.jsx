import React, { useEffect, useState } from "react";

function TodoList() {
    const [inputValue, setInputValue] = useState("");
    const [tareas, setTareas] = useState([]);
    const [editLabel, setEditLabel] = useState([]);
    const [newTarea, setNewTarea] = useState("");


    function createUser() {
        fetch('https://playground.4geeks.com/todo/users/Camila1234', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then((response) => response.json())

            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function obtenerTareas() {
        fetch('https://playground.4geeks.com/todo/users/Camila1234', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then((response) => {
                if (response.status === 404) {
                    createUser()
                    return false;
                }
                return response.json()
            })


            .then(data => {
                if (data) {
                    setTareas(data.todos)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    //modificar tareas
    const modificarTareas = (e) => {
        e.preventDefault();
        if (newTarea.trim() !== "") {
            console.log(editLabel);
            fetch(`https://playground.4geeks.com/todo/todos/${editLabel}`, {
                
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "label": newTarea,
                    "is_done": true
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    return false;
                })
                .then(data => {
                    if (data) {
                        const tareaIndex = tareas.findIndex(item => item.id === editLabel);
                
                        if (tareaIndex !== -1) {
                            const updatedTarea = {
                                id: tareas[tareaIndex].id,
                                label: newTarea,
                                is_done: true
                            };
                
                            const updatedTareas = tareas
                                .slice(0, tareaIndex)
                                .concat(updatedTarea)
                                .concat(tareas.slice(tareaIndex + 1));
                
                            setTareas(updatedTareas);
                            setNewTarea("");
                        }
                    }
                })
                
                
                .catch(error => {
                    console.log(error);
                });
        };
    }

    //Editar tarea

    const handleEdit = (id) => {
        setEditLabel(id)
    }

    //input de modificar
    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    };
    const handleInputNewTareaChange = (e) => {
        setNewTarea(e.target.value)
    };


    //agregar tareas 
    const handleSubmit = (e) => {

        e.preventDefault();

        if (inputValue.trim() !== "") {

            fetch('https://playground.4geeks.com/todo/todos/Camila1234', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "label": inputValue,
                    "is_done": false
                })

            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json()
                    }
                    return false;
                })


                .then(data => {
                    if (data) {
                        setTareas(tareas.concat(data))
                        setInputValue("");
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        };

    };


    const handleDelete = (id) => {
        fetch('https://playground.4geeks.com/todo/todos/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    return response
                }
                return false;
            })

            .then(data => {

                if (data) {
                    const nuevasTareas = tareas.filter(item => item.id !== id);
                    setTareas(nuevasTareas);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        obtenerTareas()
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

                {tareas.map(item => (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                        <div>
                            <span className="" >{item.texto}</span>
                            <span className="" >{item.label}</span>

                        </div>
                        <button className="btn-close" aria-label="Close" onClick={() => handleDelete(item.id)}></button>
                        <button type="button" onClick={() => handleEdit(item.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Editar
                        </button>


                    </li>
                ))}
            </ul>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}> <input className="input-group w-50 " type="text" placeholder="Modificar tarea" onChange={handleInputNewTareaChange} value={newTarea} /></form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-primary" onClick={(e) => modificarTareas(e)}>Modificar</button>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}

export default TodoList;
