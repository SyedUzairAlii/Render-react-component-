import React, { Component } from 'react';
import './App.css';
import swal from 'sweetalert2'



class App extends Component {
  constructor() {
    super()

    this.state = {
      headerText: 'Admin Login',
      user: '',
      addForm: false,
      edit: false,
      eRow: undefined,
      employee: [{
        firstName: 'UZair ',
        lastName: 'Ali',
        email: 'maazuzair3322@gmail.com',
        salary: 99000,
        joiningdate: '31/8/2018'
      }]
    }
    this.userCheck = this.userCheck.bind(this)
    this.logout = this.logout.bind(this)
    this.updateStateForAdd = this.updateStateForAdd.bind(this)
    this.cancelForAdd = this.cancelForAdd.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  userCheck() {

    const email = document.getElementById('email')
    const password = document.getElementById('password')

    email.value === 'a' && password.value === 'a' ?
      this.setState({
        user: 'admin'
      }) :
      swal({
        type: 'error',
        title: 'Error...',
        text: 'Wrong Credentials',
      })
    email.value = ''
    password.value = ''

  }

  logout() {
    this.setState({
      user: '',
      addForm: false,
      edit : false
    })
  }

  updateStateForAdd() {
    this.setState({
      addForm: true,
      edit : false
    })
  }

  cancelForAdd() {
    this.setState({
      addForm: false
    })
  }

  addEmployee() {
    let date = new Date(Date.now())
    let month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    const { employee } = this.state
    const f_name = document.getElementById('f_name')
    const l_name = document.getElementById('l_name')
    const email = document.getElementById('email')
    const salary = document.getElementById('salary')

    let employees = {
      firstName: f_name.value,
      lastName: l_name.value,
      email: email.value,
      salary: salary.value,
      joiningdate: date.getDate() + '/' + month[date.getMonth()] + '/' + date.getFullYear()
    }

    employee.push(employees)

    this.cancelForAdd()
  }

  deleteEmployee(delId) {

    const { employee } = this.state
    const delRow = delId
    employee.splice(delRow, 1)

    this.setState({ employee })

  }

  cancelEdit() {
    this.setState({
      edit: false,
      eRow: undefined
    })
  }

  editEmployee = (id) => {
    const editRowId = id 
    this.setState({
      edit: true,
      eRow: editRowId
    })

  }

  updateEmployee() {
    const { eRow, employee } = this.state
    const updated_fName = document.getElementById('updateFname')
    const updated_lName = document.getElementById('updateLname')
    const updated_email = document.getElementById('updateEmail')
    const updated_salary = document.getElementById('updateSalary')
    const updated_Date = document.getElementById('updateDate')

    employee[eRow] = {
      firstName: updated_fName.value,
      lastName: updated_lName.value,
      email: updated_email.value,
      salary: updated_salary.value,
      joiningdate: updated_Date.value
    }
    this.setState({
      edit: false
    })
  }


  renderHeader() {
    const { user } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className='logout'>
            <h1 className="App-title">{!user ? 'Admin Login' : 'Employees Details'}</h1>
            {
              user &&
              <button onClick={this.logout}>Logout</button>
            }
          </div>
        </header>

      </div>
    );
  }

  renderLogin() {
    return (
      <div className='userReg'>
        <div className='signUpForm'>
          {/* <div className='userSignup'>
            LOGIN
          </div> */}
          <div className='hrow'>

          </div>
          
          <div className='text'>
            EMAIL
          </div>
          <div className='fields'>
            <input type='email' id='email' />
          </div>
          <div className='text'>
            PASSWORD
          </div>
          <div className='fields'>
            <input type='password' id='password' />
          </div>
          <div className='fields'>
            <button className='btn' onClick={this.userCheck}>Log In</button>
          </div>
        </div>
      </div>

    );
  }

  renderAddForm() {
    return (
      <div className='Form'>
        <div className='main'>
          <div className='add'>
            ADD EMPLOYEE
          </div>

          <div className='fields'>
            <input type='text' id='f_name' placeholder='First Name' />
          </div>

          <div className='fields'>
            <input type='text' id='l_name' placeholder='Last Name' />
          </div>

          <div className='fields'>
            <input type='email' id='email' placeholder='Email' />
          </div>

          <div className='fields'>
            <input type='number' id='salary' placeholder='Salary' />
          </div>

          <div className='fields'>
            <button onClick={this.addEmployee} className='btn'>ADD</button>
          </div>
        </div>
      </div>
    )


  }

  renderAddBtn() {
    const { addForm } = this.state
    return (
      <nav className="container" tooltip={!addForm ? "Add Employee" : "Cancel"}>
        {
          !addForm ?
            <button onClick={this.updateStateForAdd} icon='plus'>Add</button > :
            <button onClick={this.cancelForAdd} icon='times'>cancel</button>
        }
      </nav>
    );
  }

  renderEmployeeDetails() {
    const { employee } = this.state
    return (
      !employee.length ?
        <div className='noRecord   center'>
          <h1>No Records Available!</h1>
        </div> :
        <div className='details'>
          <table border='0'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                employee.map((item, index) => {
                  return (
                    <tr id={index} key={`${item.firstName}_${index}`}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.salary}</td>
                      <td>{item.joiningdate}</td>
                      <td align='center' className='editHover'><button onClick={this.editEmployee.bind(this, index)} className='editbtn' >Eddit</button></td>
                      <td align='center' className='delHover'><button onClick={this.deleteEmployee.bind(this, index)} className='deletebtn' >delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
        </div>
    );
  }

  renderEditFields() {
    const { eRow, employee } = this.state
    return (
      <div className='details'>
        <table border='0'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Update</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>
            {
              <tr id={eRow}>
                <td><input id='updateFname' type='text' defaultValue={employee[eRow].firstName} /></td>
                <td><input id='updateLname' type='text' defaultValue={employee[eRow].lastName} /></td>
                <td><input id='updateEmail' type='email' defaultValue={employee[eRow].email} /></td>
                <td><input id='updateSalary' type='number' defaultValue={employee[eRow].salary} /></td>
                <td><input id='updateDate' disabled = 'disabled' type='text' defaultValue={employee[eRow].joiningdate} /></td>
                <td align='center' className='editHover'><button onClick={this.updateEmployee.bind(this)} className='editbtn'>update</button></td>
                <td align='center' className='delHover'><button onClick={this.cancelEdit} className='deletebtn'>cancle</button></td>
              </tr>
            }
          </tbody>

        </table>
      </div>
    );



  }

  render() {
    const { user, addForm, edit } = this.state
    return (
      <div>
        {this.renderHeader()}
        {!user && this.renderLogin()}
        {user && this.renderAddBtn()}
        {user && !addForm && !edit && this.renderEmployeeDetails()}
        {edit && this.renderEditFields()}
        {user && addForm && this.renderAddForm()}
      </div>

    );
  }

}

export default App;
