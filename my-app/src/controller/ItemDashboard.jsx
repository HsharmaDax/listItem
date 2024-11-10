import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { API_URL } from '../config';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
const ItemDashboard = () => {
    const [task, settask] = useState('');
    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();
    const [taskId, setTaskId] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))

    const fetchItems = useCallback(async () => {
        if (!user) {
            return navigate('/login');
        }
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/item/allitems/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItemList(response.data);
        } catch (error) {
            alert('Failed to get items');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchItems();
    }, [user, navigate, fetchItems]);

    const handleAddItem = async () => {
        const token = localStorage.getItem('token')
        if (!user) {
            navigate('/login');
            return;
        }
        if (task !== "") {
            await axios.post(`${API_URL}/item/add/${user.id}`, { task: task }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            settask('');
        }
    };

    // function to delete data 
    const handleDeleteItem = async (id) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${API_URL}/item/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Item Deleted Successfully')
            fetchItems()
        } catch (error) {
            alert("Error Deleting item", error)
        }
    };

    const handleUpdateItem = async () => {
        const token = localStorage.getItem('token')
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            if (task !== "") {
                await axios.put(`${API_URL}/item/update/${taskId}`, { task: task }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("Item Updated")
                fetchItems();
            }
        } catch (error) {
            alert("Error updating item", error)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
    }

    return (
        <div className='vh-100 bg-secondary'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold" >Dashboard</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="ms-auto me-3">
                            <button className="btn btn-secondary" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='text-center'>
                <h1 className='h1'>Enter Your List Items</h1>
                <div className='div'>
                    <form onSubmit={handleAddItem}>
                        <label htmlFor='inputTask' className='label'>Enter the List Item : </label>
                        <input type="text" value={task} onChange={e => settask(e.target.value)} id="inputTask" className='task' />
                        <button type='submit' className='button'>Add Item</button>
                    </form>
                </div>
                <ul className='ul mt-5'>
                    {itemList.length > 0 ? (itemList.map((Task, index) =>
                        <li className='li d-flex align-items-center' key={Task.id}>
                            <span className='me-1 mb-auto mt-auto' >{index + 1}.</span>
                            <span className='dtask'>
                                {Task.task}
                            </span>
                            <div className='d-flex'>
                                <div>
                                    <button type="button" className="dbutton btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e => setTaskId(Task.id)}>
                                        Edit
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Item</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form onSubmit={handleUpdateItem}>
                                                    <div className="modal-body" style={{ fontSize: "18px" }}>
                                                        <label htmlFor="task" className='me-2 fw-normal fs-0'>Item :</label>
                                                        <input type="text" className='ps-2' id='task' value={task} onChange={e => settask(e.target.value)} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteItem(Task.id)} className='dbutton btn btn-danger'>Delete</button>
                            </div>
                        </li>
                    )
                    ) : (
                        <li className='text-center'>No items available.</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ItemDashboard