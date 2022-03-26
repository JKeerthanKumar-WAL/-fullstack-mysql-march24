import { useState, useEffect } from 'react';
import axios from 'axios';
const TodoMySql = () => {
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateTodo, setUpdateTodo] = useState({});
    const getTodos = () => {
        axios
            .get('/todomysql')
            .then((res) => {
                setTodos(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getTodos();
    }, []);
    const createTodo = (event) => {
        event.preventDefault();
        const todoObject = {
            item: event.target.item.value,
            status: event.target.status.value,
        };
        axios
            .post('/todomysql', todoObject)
            .then((res) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteTodo = (item) => {
        axios
            .delete('/todomysql/' + item)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getTodos();
    };
    const deleteAll = () => {
        axios
            .get('/todomysql/deleteall')
            .then((res) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editTodo = (item) => {
        setEdit(true);
        setUpdateTodo(item);
    };
    const saveTodo = (event) => {
        event.preventDefault();
        const todoObject = {
            item: event.target.item.value,
            status: event.target.status.value,
        };
        axios.put(`/todomysql/${updateTodo}`, todoObject).then((res) => {
            getTodos();
            setEdit(false);
            console.log(res.data);
        });
    };
    return (
        <div className="container-fluid text-center">
            {edit ? (
                <div>
                    <h1 className="mt-3">Update Todo</h1>
                    <form className="form-group" onSubmit={saveTodo}>
                        <b className="subHeading">Todo Item : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="item"
                            placeholder="Enter Todo Item"
                        />
                        <br />
                        <b className="subHeading">Select Status : </b>
                        <select
                            className="form-select d-inline-flex w-50"
                            name="status"
                        >
                            <option selected>Select</option>
                            <option value="Complete">Complete</option>
                            <option value="Incomplete">Incomplete</option>
                        </select>
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Update Todo</b>
                        </button>
                        <br />
                    </form>
                    <br />
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Todo App</h1>
                    <form className="form-group" onSubmit={createTodo}>
                        <b className="subHeading">Todo Item : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="item"
                            placeholder="Enter Todo Item"
                        />
                        <br />
                        <b className="subHeading">Select Status : </b>
                        <select
                            className="form-select d-inline-flex w-50"
                            name="status"
                        >
                            <option selected>Select</option>
                            <option value="Complete">Complete</option>
                            <option value="Incomplete">Incomplete</option>
                        </select>
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Add Todo</b>
                        </button>
                        <br />
                    </form>
                    <button
                        className="btn btn-outline-danger"
                        onClick={deleteAll}
                    >
                        <b>Delete All</b>
                    </button>
                    <br />
                    <br />
                </div>
            )}
            <div className="table table-bordered table-striped text-center">
                <table className="text-center ">
                    <tr>
                        <th>S.No</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    {todos.map((val, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{val.item}</td>
                                <td>{val.status}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                            deleteTodo(val.item);
                                        }}
                                    >
                                        <b> Delete</b>
                                    </button>
                                    <br />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            editTodo(val.item);
                                        }}
                                    >
                                        <b> Edit</b>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};
export default TodoMySql;
