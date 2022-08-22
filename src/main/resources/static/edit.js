const editModal = new bootstrap.Modal(document.querySelector('#editModal'))
const saveButton = document.querySelector('#saveButton')
const editFormElement = document.querySelector('#editForm')
const editedUserRoles = []

async function editButtonClicked(editButton, userID) {
    editButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        fillEditModal(userID)
        saveButtonClicked(saveButton)
        editModal.show()
    })
}

async function fillEditModal(userID) {

    fetch(`http://localhost:8080/users/${userID}`)
        .then(response => response.json())
        .then(user => {
            document.querySelector('#id').value = user.id
            document.querySelector('#firstName').value = user.firstName
            document.querySelector('#lastName').value = user.lastName
            document.querySelector('#age').value = user.age
            document.querySelector('#email').value = user.email
            document.querySelector('#password').value = user.password
        })

    fetch('http://localhost:8080/roles')
        .then(response => response.json())
        .then(roles => {
            const selectRoles = document.querySelector('#roles')
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
                selectRoles.append(option)
            }
        })
}

async function saveButtonClicked(button) {
    await button.addEventListener('click', evt => {
        const editFormData = new FormData(editFormElement)

        const editedUser = {
            id: editFormData.get('id'),
            firstName: editFormData.get('firstName'),
            lastName: editFormData.get('lastName'),
            age: editFormData.get('age'),
            email: editFormData.get('email'),
            password: editFormData.get('password'),
            roles: editedUserRoles
        }
        console.log(editedUser)

        fetch('http://localhost:8080/users', {
            method: 'PUT',
            body: JSON.stringify(editedUser),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
}
