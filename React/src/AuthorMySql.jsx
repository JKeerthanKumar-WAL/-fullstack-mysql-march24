import { useState, useEffect } from 'react';
import axios from 'axios';
const AuthorMySql = () => {
    const [author, setAuthor] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateAuthor, setUpdateAuthor] = useState({});
    const getAuthors = () => {
        axios
            .get('/authormysql')
            .then((res) => {
                setAuthor(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getAuthors();
    }, []);
    const createAuthor = (event) => {
        event.preventDefault();
        const authorObject = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            dob: event.target.dob.value,
            dod: event.target.dod.value,
        };
        axios
            .post('/authormysql', authorObject)
            .then((res) => {
                getAuthors();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteAuthor = (item) => {
        axios
            .delete('/authormysql/' + item)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getAuthors();
    };
    const deleteAll = () => {
        axios
            .get('/authormysql/deleteall')
            .then((res) => {
                getAuthors();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editAuthor = (item) => {
        setEdit(true);
        setUpdateAuthor(item);
    };
    const saveAuthor = (event) => {
        event.preventDefault();
        const authorObject = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            dob: event.target.dob.value,
            dod: event.target.dod.value,
        };
        axios.put(`/authormysql/${updateAuthor}`, authorObject).then((res) => {
            getAuthors();
            setEdit(false);
        });
    };
    return (
        <div className="container-fluid text-center">
            {edit ? (
                <div>
                    <h1 className="mt-3">Update Author</h1>
                    <form className="form-group" onSubmit={saveAuthor}>
                        <b className="subHeading">First Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                        />
                        <br />
                        <b className="subHeading">Last Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                        />
                        <br />
                        <b className="subHeading">Date of Birth : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="date"
                            name="dob"
                        />
                        <br />
                        <b className="subHeading">Date of Death : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="date"
                            name="dod"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Update Author</b>
                        </button>
                        <br />
                    </form>
                    <br />
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Author Details</h1>
                    <form className="form-group" onSubmit={createAuthor}>
                        <b className="subHeading">First Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                        />
                        <br />
                        <b className="subHeading">Last Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                        />
                        <br />
                        <b className="subHeading">Date of Birth : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="date"
                            name="dob"
                        />
                        <br />
                        <b className="subHeading">Date of Death : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="date"
                            name="dod"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Add Author</b>
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Date of Death</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    {author.map((val, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{val.first_name}</td>
                                <td>{val.last_name}</td>
                                <td>{val.dob}</td>
                                <td>{val.dod}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                            deleteAuthor(val.first_name);
                                        }}
                                    >
                                        <b> Delete</b>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            editAuthor(val.first_name);
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
export default AuthorMySql;
