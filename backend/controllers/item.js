const db = require('../models/index');
const { Task } = db;

const getAllTask = async (req, res) => {
    const userId = req.params.userid;
    if (!userId) {
        return res.status(400).json({ message: 'user id missing' });
    }
    try {
        const items = await Task.findAll({
            where: {
                userId: userId
            }
        })
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const addItem = async (req, res) => {
    const userId = req.params.userid;
    const { task } = req.body;
    if (!userId || !task) {
        return res.status(400).json({ message: 'Required details are not provided' });
    }
    console.log(task , userId)
    try {
        const addedTask = await Task.create({ userId, task });
        if (addedTask) {
            return res.status(200).json({ message: 'task added' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const deleteItem = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({ message: 'Item id missing' })
    }
    try {
        const deletedItem = await Task.destroy({
            where: { id: taskId }
        })
        if (deletedItem) {
            return res.status(204).json({ message: 'Item deleted' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const updateItem = async (req, res) => {
    const taskId = req.params.id;
    const { task } = req.body;
    if (!taskId || !task) {
        return res.status(400).json({ message: 'Required details are not provided' });
    }
    try {
        const updatedItem = await Task.update({ task: task }, { where: { id: taskId } });
        if (updatedItem) {
            return res.status(201).json({ message: 'Item Updated' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}


module.exports = { getAllTask, updateItem, deleteItem, addItem }