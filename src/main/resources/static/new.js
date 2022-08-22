const newUserFormElement = document.querySelector('#newUserForm')
let userRoles = []

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
                console.log(userRoles)
            })
            selectRoles.append(option)
        }
    })


async function addButtonClicked() {
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

        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
}

addButtonClicked()


