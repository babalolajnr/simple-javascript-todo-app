const submitButton = document.getElementById('submitButton')
const newTodo = document.getElementById('newTodo')
const tasks = document.getElementById('tasks')

submitButton.addEventListener('click', () => {
    let latestTodo = newTodo.value
    let latestTodoSlug = string_to_slug(latestTodo)

    //check if to-do exists
    let exists = document.querySelector('[id="' + latestTodoSlug + '"]')

    if (exists != null) {
        alert('Todo Exists')
    } else {
        tasks.innerHTML += '<tr id="' + latestTodoSlug + '">' +
            '<td>' + latestTodo + '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-warning" onclick="editItem(\'' + latestTodoSlug + '\')">Edit</button>' +
            '<span class="px-1"></span><button type="button" class="btn btn-danger" onclick="removeItem(\'' + latestTodoSlug + '\')">Delete</button></td>' +
            '</tr>'

        newTodo.value = ''
    }


})

//delete todo
function removeItem(item) {
    let task = document.getElementById(item)
    task.remove()
}

function editItem(item) {
    let task = document.getElementById(item)
    let firstChild = task.firstChild.innerHTML
    newTodo.value = firstChild

    //check if the buttons created for the update exists to prevent duplicate buttons
    let updateButton = document.querySelector('[id$="-update"]')
    if (updateButton != null) {
        updateButton.parentNode.removeChild(updateButton)
    }

    //create an update button 
    let span = document.createElement('span')

    //insert the button just before the submit button
    let todoForm = submitButton.parentNode

    todoForm.insertBefore(span, submitButton)
    
    //set the attribute of the update button to have a dynamic id according to the name of the task
    span.setAttribute('id', `${item}-update`)
    span.innerHTML += '<button type="button" class="btn btn-info" onclick="updateItem(\'' + item + '\')">Update</button>'
}

//Updates the todos
function updateItem(item) {
    let task = document.getElementById(item)
    task.firstChild.innerHTML = newTodo.value

    let itemUpdateButton = document.getElementById(`${item}-update`)
    itemUpdateButton.remove()
    newTodo.value = ''

}

//This function is to generate a slug that I am going to use to uniquely identify the todos
function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}