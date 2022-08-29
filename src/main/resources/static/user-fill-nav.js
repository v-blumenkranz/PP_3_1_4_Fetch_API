const principalInformationURL = 'http://localhost:8080/api/user'
const userTableBody = document.querySelector('#userTableBody')
const usernameSpan = document.querySelector('#username-span')
const rolesSpan = document.querySelector('#roles-span')

fetch(principalInformationURL).then(response => response.json())
    .then(user => {
        console.log(user)
        const userFields = Object.keys(user)
        const tr = document.createElement('tr')

        for (let i = 0; i < 5; i++) {
            const td = document.createElement('td')
            td.textContent = user[userFields[i]]
            tr.append(td)
        }

        const rolesTD = document.createElement('td')
        const userRoles = user['roles']
        const outputRoles = new Array()
        for (let r = 0; r < userRoles.length; r++) {
            outputRoles.push(userRoles[r].role)
        }
        rolesTD.innerText = outputRoles.join(' ')
        rolesSpan.innerText = outputRoles.join(' ')
        tr.append(rolesTD)

        userTableBody.append(tr)

        usernameSpan.innerText = user['email']
    })