// importing... 

import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";






// exporting and defining the funciton for adding the task 
export default function AddTask(props) {
    const app = useAppContext();

    // specifying the backend 
    const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";
    const [value, setValue] = useState("");
    const addTask = () => {
        const todoText = value.trim();

        if (!todoText) {
            // izitoast for the better userinterface 
            iziToast.destroy();
            iziToast.error({
                title: "Error",
                message: "🙏Please Enter Text"
            });
            return;
        }







        // axios section 

        axios({
            headers: {
                Authorization: "Token " + app.token
            },
            url: API_BASE_URL + "todo/create/",
            method: "post",
            data: { title: todoText }
        })
            .then(function (response) {
                axios({
                    headers: {
                        Authorization: "Token " + app.token
                    },
                    url: API_BASE_URL + "todo/",
                    method: "get"
                }).then(function ({ data, status }) {
                    const newTask = data[data.length - 1];
                    props.addNewTask(newTask);
                    iziToast.destroy();
                    iziToast.success({
                        title: "Todo",
                        message: "😀Successfully added new Todo"
                    });
                });
            }) 
            // promises part 
            .catch(function (err) {
                iziToast.destroy();
                iziToast.error({
                    title: "Error",
                    message: "😫Error Occured"
                });
            });
    };






    // getting the output what we required 
    return (
        <div className="flex items-center max-w-sm mt-24">
            <input
                type="text"
                className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
                placeholder="Enter Todo to Add"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />




            {/* adding the button to add the task to your Todo list  */}
            <button
                type="button"
                className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
                onClick={addTask}>
                Add Task
            </button>
        </div>
    );
}
