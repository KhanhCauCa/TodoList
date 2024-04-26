// Tên công viên
// Trạng thái

const TODOLIST_APP_UNITOP = "TODOLIST_APP_UNITOP"

let data = [
    {
        task: "Run 2km",
        is_complete: true
    }

]

// input: data
// save localStorage
const saveData = (data) => {
    localStorage.setItem(TODOLIST_APP_UNITOP, JSON.stringify(data))
}

// saveData(data)

const loadData = () => {
    let data
    data = JSON.parse(localStorage.getItem(TODOLIST_APP_UNITOP))
    data = data ? data : [];
    return data

}

// data = loadData()
// console.log(data)

const addTask = (new_task) => {
    let data
    data = loadData()
    // data.push(new_task)
    data = [...data, new_task]
    saveData(data)
}




const createTaskItem = (task, is_complete, index) => {
    return `
    <li class="task-item" index=${index} is-complete=${is_complete}>
    <span class="task" onclick="markTaskComplete(${index})">${task}</span>
    <div class="task-action">
        <button onclick = 'pushEditTask(${index})'><i class="fa-solid fa-pencil"></i></button>
        <button onclick = 'deleteTask(this,${index})'><i class="fa-solid fa-trash-can"></i></button>
    </div>
    </li>`
}

const renderTask = () => {
    let data, ulTaskHtml, ulTasks, task_result,count_complete
    task_result = document.querySelector('.task-result')
    ulTasks = document.querySelector('ul.tasks')
    data = loadData()
    count_complete = 0
    ulTaskHtml = data.map((element, index) => {
        if(element.is_complete== true) count_complete ++
        return createTaskItem(element.task, element.is_complete, index)
    })
    task_result.textContent = `Good! ${count_complete} tasks completed`
    ulTasks.innerHTML = ulTaskHtml.join('')
}


const markTaskComplete = (index) => {
    let data
    data = loadData()
    // nếu là true thì trả về false còn nếu không thì trả về true
    data[index].is_complete = (data[index].is_complete == true) ? false : true
    saveData(data)
    renderTask()
}

const deleteTask = (element, index) => {
    let data
    data = loadData()
    let delete_confirm = confirm("Bạn có muốn thực sự xóa công việc này không?")
    if (delete_confirm == false) return false
    data.splice(index, 1)
    saveData(data)
    //casch 1: khong can phải load lại toàn bộ dom
    element.closest('.task-item').remove()
    //cách 2: ko cần phần tử element, và phải load lại toàn bộ dom
    // renderTask()
}

const pushEditTask = (index) => {
    let data = loadData()
    const btn = document.querySelector('#add_task button')
    btn.innerText = 'edit task'
    const task = document.querySelector('#task')
    task.setAttribute('index', index)
    task.value = data[index].task
}

const editTask = (update_task, index) => {
    let data = loadData()
    data[index].task = update_task
    saveData(data)
    btn.innerText = 'ADD TASK'

}

const formAddTask = document.forms.add_task

//nên dùng submit hơn là click
formAddTask.addEventListener('submit', (e) => {
    let new_task
    const task = document.querySelector('#task')
    const index = task.getAttribute('index')

    if(task.value.length < 2){
        alert('Enter your task')
        return false
    }

    if (index) {
        editTask(task.value, index)
        task.removeAttribute('index')
    }
    else {
        new_task = {
            task: task.value,
            is_complete: false
        }
        addTask(new_task)
    }

    renderTask()
    task.value = ''
    e.preventDefault() // set cho form ko bị reload
})

document.addEventListener('keyup', (e)=>{
    const task = document.querySelector('#task')

    if(e.which == 27){
        const btn = document.querySelector('#add_task button')
        btn.textContent = "ADD TASK"
        task.value = ''
        task.removeAttribute('index')
    }
})

renderTask()
