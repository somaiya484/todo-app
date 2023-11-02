import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import TodosContext from "../context/MainContext";
import { Link } from "react-router-dom";
import '../index.css'
import { BsCheck2Square, BsFillTrash3Fill } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'

const Home = () => {

    const [input, setInput] = useState({
        name: "",
    });
    const { todos, setTodos, getAllTodos } = useContext(TodosContext);
    useEffect(() => {
        getAllTodos();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/todos", input);
        getAllTodos();
        setInput({ name: "" });
        setInput({ description: "" });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/todos/${id}`);

        const remainingItems = todos.filter((item) => {
            return item.id !== id;
        });
        setTodos(remainingItems);
    };

    const [inprogress, setInprogress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const addToProgress = (id) => {
        const item = todos.find(x => x.id === id);
        setInprogress([item, ...inprogress]);
        const filterarray = todos.filter(x => x.id !== id);
        setTodos(filterarray);
    }

    const addtoCompleted = (id) => {
        const item = inprogress.find(x => x.id === id);
        setCompleted([item, ...completed]);
        const filterarray = inprogress.filter(x => x.id !== id);
        setInprogress(filterarray);
    }
    useEffect(() => {

    }, [todos, inprogress])


    return (
        <div className="container my-5 py-5 ">
            <h3 className="text-center pt-4">ToDo List App</h3>
            <form
                onSubmit={handleAdd}
                class="row row-cols-lg-auto g-3 justify-content-center align-items-center mt-3 mb-4 pb-2"
            >
                <div class="col-12">
                    <div class="form-outline">
                        <input
                            name="name" value={input.name} type="text" required
                            onChange={(e) =>
                                setInput({
                                    ...input,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            placeholder="Type your next step"
                            class="form-control rounded-0"
                            id="form1"
                        />
                    </div>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-success rounded-0 ">
                        Save
                    </button>
                </div>
            </form>


            <div className="todos_wrapper pb-5 border-top pt-4 border-dark">
                <div className="todos_list">
                    <h3 className="todo_title">Todos List</h3>
                    {todos.map((item, index) =>
                        <div className="todo_card rounded-1 mt-2 text-black " key={item.id}>
                            <p>{item.name}</p>
                            <div className="d-flex justify-content-center gap-2 ">
                                <FcProcess onClick={() => addToProgress(item.id)} className="text-success fs-5" ></FcProcess>
                                <BsFillTrash3Fill onClick={() => handleDelete(item.id)} className="text-danger fs-5"></BsFillTrash3Fill>
                            </div>
                        </div>
                    )}
                </div>
                <div className="todos_list">
                    <h3 className="todo_title">In Progress</h3>
                    {inprogress.map((item, index) =>
                        <div className="progress_card rounded-1 mt-2 bg-light-subtle " key={item.key}>
                            <p className="card_text">{item.name}</p>
                            <BsCheck2Square onClick={() => addtoCompleted(item.id)} lassName="text-success fs-5" ></BsCheck2Square>
                        </div>
                    )}
                </div>
                <div className="todos_list ">
                    <h3 className="todo_title">Completed</h3>
                    {completed.map((item, index) =>
                        <div className="completed_card rounded-1 mt-2  bg-success" key={item.id}>
                            <p className="card_text">{item.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Home;