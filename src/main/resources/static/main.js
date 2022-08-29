const usersUrl = 'http://localhost:8080/api/admin'
const tableBody = document.querySelector('#adminTableBody')

//Переменная для создания нового пользователя
const newUserFormElement = document.querySelector('#newUserForm')
const userRoles = []

//Переменные для удаления
const deleteModal = new bootstrap.Modal(document.querySelector('#deleteModal'))
const innerDeleteButton = document.querySelector('#deleteButton')

//Переменные для редактирования
const editModal = new bootstrap.Modal(document.querySelector('#editModal'))
const saveButton = document.querySelector('#saveButton')
const editFormElement = document.querySelector('#editForm')
let userPassword = ''
let editedUserRoles = []

//Заполнение панели
const fillPanel = (usersData) => {

    usersData.forEach((user) => {
        const userFields = Object.keys(user)

        const tr = document.createElement('tr')

        for (let j = 0; j < 5; j++) {
            const td = document.createElement('td')
            td.innerText = user[userFields[j]]
            tr.append(td)
        }

        const rolesTD = document.createElement('td')
        const userRoles = user['roles']
        let outputRoles = []
        userRoles.forEach((role) => {
            outputRoles.push(role.role)
        })
        rolesTD.innerText = outputRoles.join(' ')
        tr.append(rolesTD)


        const btnETD = document.createElement('td')
        const eBtn = document.createElement('button')
        eBtn.innerText = 'Edit'
        eBtn.id = 'eBtn'
        eBtn.classList.add("btn", "btn-info")
        editButtonClicked(eBtn, user.id)
        btnETD.append(eBtn)
        tr.append(btnETD)

        const btnDTD = document.createElement('td')
        const dBtn = document.createElement('button')
        dBtn.innerText = 'Delete'
        dBtn.id = 'dBtn'
        dBtn.classList.add("btn", "btn-danger")
        deleteButtonClicked(dBtn, user.id)
        btnDTD.append(dBtn)
        tr.append(btnDTD)

        tableBody.append(tr)
    })
}

fetch(usersUrl)
    .then(response => response.json())
    .then(data => fillPanel(data))


//Создание нового пользователя и инициализация ролей
fetch('http://localhost:8080/roles')
    .then(response => response.json())
    .then(roles => {
        const selectRoles = document.querySelector('#newRoles')
        for (let i = 0; i < roles.length; i++) {
            const option = document.createElement('option')
            option.value = roles[i].id
            option.textContent = roles[i].role
            option.addEventListener('click', evt => {
                evt.preventDefault()
                const roleOption = {
                    id: option.value,
                    role: option.textContent
                }
                const index = userRoles.findIndex((currentValue) => currentValue.id === roleOption.id)
                if (index === -1) {
                    userRoles.push(roleOption)
                }
            })
            selectRoles.append(option)
        }
    })

newUserFormElement.addEventListener('submit', evt => {
    evt.preventDefault()
    const formData = new FormData(newUserFormElement)

    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: userRoles
    }

    fetch(usersUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(user => {
            const newUserFields = Object.keys(user)

            const tr = document.createElement('tr')

            for (let j = 0; j < 5; j++) {
                const td = document.createElement('td')
                td.innerText = user[newUserFields[j]]
                tr.append(td)
            }

            const newRolesTD = document.createElement('td')
            const userRoles = user['roles']
            let outputRoles = []
            userRoles.forEach((role) => {
                outputRoles.push(role.role)
            })
            newRolesTD.innerText = outputRoles.join(' ')
            tr.append(newRolesTD)


            const newBtnETD = document.createElement('td')
            const eBtn = document.createElement('button')
            eBtn.innerText = 'Edit'
            eBtn.id = 'eBtn'
            eBtn.classList.add("btn", "btn-info")
            editButtonClicked(eBtn, user.id)
            newBtnETD.append(eBtn)
            tr.append(newBtnETD)

            const newBtnDTD = document.createElement('td')
            const dBtn = document.createElement('button')
            dBtn.innerText = 'Delete'
            dBtn.id = 'dBtn'
            dBtn.classList.add("btn", "btn-danger")
            deleteButtonClicked(dBtn, user.id)
            newBtnDTD.append(dBtn)
            tr.append(newBtnDTD)

            tableBody.append(tr)

            $('#nav-admin-tab').tab('show')
            evt.target.reset()
        })
})


//Удаление пользователя
async function deleteButtonClicked(deleteButton, userID) {
    deleteButton.addEventListener('click', evt => {
        evt.preventDefault()
        fillDeleteModal(userID)
        innerDeleteButtonClicked(innerDeleteButton, userID)
        deleteModal.show()
    })
}

async function fillDeleteModal(userID) {
    fetch(`http://localhost:8080/api/admin/${userID}`).then(response => response.json())
        .then(user => {
            document.querySelector('#deleteId').value = user.id
            document.querySelector('#deleteFirstName').value = user.firstName
            document.querySelector('#deleteLastName').value = user.lastName
            document.querySelector('#deleteAge').value = user.age
            document.querySelector('#deleteEmail').value = user.email
        })

    fetch('http://localhost:8080/roles')
        .then(response => response.json())
        .then(roles => {
            const selectRoles = document.querySelector('#deleteRoles')
            while (selectRoles.firstChild) {
                selectRoles.removeChild(selectRoles.firstChild)
            }
            for (let i = 0; i < roles.length; i++) {
                const option = document.createElement('option')
                option.value = roles[i].id
                option.textContent = roles[i].role
                selectRoles.append(option)
            }
        })
}

function innerDeleteButtonClicked(button, userID) {
    button.addEventListener('click', evt => {
        evt.preventDefault()
        fetch(`http://localhost:8080/api/admin/${userID}`, {
            method: 'DELETE'
        }).then(response =>
            response.json()
        ).then(data => {
            clearPanel()
            fillPanel(data)
        })
    })
}

//Служебная функция для очистки таблицы
function clearPanel() {
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild)
    }
}


//Редактирование пользователя
async function editButtonClicked(editButton, userID) {
    editButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        fillEditModal(userID)
        saveButtonClicked(saveButton)
        editModal.show()
    })
}

async function fillEditModal(userID) {

    fetch(`http://localhost:8080/api/admin/${userID}`)
        .then(response => response.json())
        .then(user => {
            document.querySelector('#id').value = user.id
            document.querySelector('#firstName').value = user.firstName
            document.querySelector('#lastName').value = user.lastName
            document.querySelector('#age').value = user.age
            document.querySelector('#email').value = user.email
            document.querySelector('#password').value = ''
            userPassword = user.password
        })

    fetch('http://localhost:8080/roles')
        .then(response => response.json())
        .then(roles => {
            const editRoles = document.querySelector('#editRoles')
            editedUserRoles = []
            while (editRoles.firstChild) {
                editRoles.removeChild(editRoles.firstChild)
            }
            for (let i = 0; i < roles.length; i++) {
                const option = document.createElement('option')
                option.value = roles[i].id
                option.textContent = roles[i].role
                option.addEventListener('click', evt => {
                    evt.preventDefault()
                    const roleOption = {
                        id: option.value,
                        role: option.textContent
                    }
                    const index = editedUserRoles.findIndex((currentValue) => currentValue.id === roleOption.id)
                    if (index === -1) {
                        editedUserRoles.push(roleOption)
                    }
                })
                editRoles.append(option)
            }
        })
}

function saveButtonClicked(button) {
    button.addEventListener('click', (evt) => {
        const editFormData = new FormData(editFormElement)

        const editedUser = {
            id: editFormData.get('id'),
            firstName: editFormData.get('firstName'),
            lastName: editFormData.get('lastName'),
            age: editFormData.get('age'),
            email: editFormData.get('email'),
            password: userPassword,
            roles: editedUserRoles
        }

        fetch(usersUrl, {
            method: 'PUT',
            body: JSON.stringify(editedUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            clearPanel()
            fillPanel(data)
        })
    })
}





