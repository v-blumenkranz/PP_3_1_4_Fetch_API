const usersUrl = 'http://localhost:8080/users'

async function fillPanel() {

    fetch(usersUrl)
        .then(response => {
            response.json().then(usersData => {
                const tableBody = document.querySelector('#adminTableBody')
                const userFields = Object.keys(usersData[0])

                for (let i = 0; i < usersData.length; i++) {
                    const tr = document.createElement('tr')

                    for (let j = 0; j < 5; j++) {
                        const td = document.createElement('td')
                        td.innerText = usersData[i][userFields[j]]
                        tr.append(td)
                    }

                    const rolesTD = document.createElement('td')
                    const userRoles = usersData[i]['roles']
                    const outputRoles = new Array()
                    for (let r = 0; r < userRoles.length; r++) {
                        outputRoles.push(userRoles[r].role)
                    }
                    rolesTD.innerText = outputRoles.join(' ')
                    tr.append(rolesTD)


                    const btnETD = document.createElement('td')
                    const eBtn = document.createElement('button')
                    eBtn.innerText = 'Edit'
                    eBtn.id = 'eBtn'
                    eBtn.classList.add("btn", "btn-info")
                    editButtonClicked(eBtn, usersData[i].id)
                    btnETD.append(eBtn)
                    tr.append(btnETD)



                    const btnDTD = document.createElement('td')
                    const dBtn = document.createElement('button')
                    dBtn.innerText = 'Delete'
                    dBtn.id = 'dBtn'
                    dBtn.classList.add("btn", "btn-danger")
                    deleteButtonClicked(dBtn, usersData[i].id)
                    btnDTD.append(dBtn)
                    tr.append(btnDTD)


                    tableBody.append(tr)
                }
            })
        })
}

async function clearPanel() {
    const tableBodyToDelete = document.querySelector('#adminTableBody')
    while (tableBodyToDelete.firstChild) {
        tableBodyToDelete.removeChild(tableBodyToDelete.firstChild)
    }
}

fillPanel()

