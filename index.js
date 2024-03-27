const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const sequelize = require('./config')
const Emp = require('./Employee');
const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());


sequelize.sync();

const empSchema = Joi.object({
    EmployeeName: Joi.string().required(),
    EmployeeEmail: Joi.string().email().required()
});

// app.post('/add', async (req, res) => {
//     const emp = req.body
//     try {
//         const Employee = await Emp.create(emp);
//         res.send(Employee);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("server error");
//     }
// })

app.post('/addorupdate', async (req, res) => {
    const { error } = empSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const empData = req.body;
    try {

        const Employee = await Emp.findOrCreate({
            where: { EmployeeEmail: empData.EmployeeEmail },
            defaults: empData // Data to insert if the record doesn't exist
        });;
        res.send(Employee);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
})

app.post('/add', async (req, res) => {
    const { error } = empSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const empData = req.body;
    try {
        const newEmp = await Emp.create(empData);
        res.json(newEmp);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});


app.get('/get', async (req, res) => {
    try {
        const Employee = await Emp.findAll();
        res.send(Employee);
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/:id', async (req, res) => {
    try {
        
        const Employee = await Emp.findByPk(req.params.id);
        res.send(Employee);
    } catch (error) {
        console.log(error)
    }
})


app.put('/edit', async (req, res) => {
    try {
        const newData = req.body;
        const EmployeeID = req.body.id
        const Employee = await Emp.findByPk(EmployeeID);
        if (Employee) {
            const updatedEmployee = await Emp.update(newData, {
                where: { EmployeeID: EmployeeID }
            });
            res.send(updatedEmployee);
        } else {
            res.status(404).send('Employee with given ID not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Employee error to update');
    }
})


app.delete('/delete/:id', async (req, res) => {
    try {
        const EmployeeID = req.params.id
        const employee = await Emp.findByPk(EmployeeID);
        if (employee) {
            await employee.destroy();
            res.send('Employee deleted successfully');
        } else {
            res.status(404).send('Employee with given ID not found');
        }
    } catch (error) {
        console.log(error)
    }
})


app.post('/login', (req, res) => {

    const user = Emp.find(u => u.EmployeeName === req.body.username && u.EmployeeEmail === req.body.password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    const token = jwt.sign({ id: user.EmployeeID, username: user.EmployeeName, email:user.EmployeeEmail}, {secretKey:"hghffhfhkh"}, { expiresIn: '1h' });
    res.json({ token });
});


app.listen(port, () => {
    console.log(`port running on ${port}`)
})
