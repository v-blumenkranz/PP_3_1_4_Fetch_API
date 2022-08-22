const deleteModal = new bootstrap.Modal(document.querySelector('#deleteModal'))
const innerDeleteButton = document.querySelector('#deleteButton')

async function deleteButtonClicked(deleteButton, userID) {
    deleteButton.addEventListener('click', evt => {
        evt.preventDefault()
        fillDeleteModal(userID)
        innerDeleteButtonClicked(innerDeleteButton, userID)
        deleteModal.show()
    })
}

async function fillDeleteModal(userID) {
    fetch(`http://localhost:8080/users/${userID}`).then(response => response.json())
        .then(user => {
            document.querySelector('#deleteId').value = user.id
            document.querySelector('#deleteFirstName').value = user.firstName
            document.querySelector('#deleteLastName').value = user.lastName
            document.querySelector('#deleteAge').value = user.age
            document.querySelector('#deleteEmail').value = user.email
            document.querySelector('#deletePassword').value = user.password
        })

    fetch('http://localhost:8080/roles')
        .then(response => response.json())
        .then(roles => {
            const selectRoles = document.querySelector('#deleteRoles')
            for (let i = 0; i < roles.length; i++) {
                const option = document.createElement('option')
                option.value = roles[i].id
                option.textContent = roles[i].role
                selectRoles.append(option)
            }
        })
}

async function innerDeleteButtonClicked(button, userID) {
    console.log(userID)
    await button.addEventListener('click', evt => {
        evt.preventDefault()
        fetch(`http://localhost:8080/users/${userID}`, {
            method: 'DELETE'
        })
    })
}