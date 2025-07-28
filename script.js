let input = document.getElementById('input');
let button = document.querySelector('button');
let todos = document.querySelector('.todos');
let ol = document.querySelector('ol');

let arr = [];

let oldData = JSON.parse(localStorage.getItem('todos')) || [];
oldData.forEach(function(array){
    let li = document.createElement('li');
    li.innerHTML = array;

    ol.appendChild(li)
})

button.addEventListener('click', function(dets){
    if(input.value.trim() === '') return;

     let newTodo = input.value.trim();
    oldData.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(oldData));

    let li = document.createElement('li');
    li.textContent = newTodo;
    ol.appendChild(li);

    input.value = '';

})



function popup(currentValue, liElement) {
    let popup = document.querySelector('.popup-overlay');
    popup.classList.remove('hidden');

    let popup_input = document.querySelector('.popup-input');
    popup_input.value = currentValue;

    let close = document.querySelector('.close-btn');
    close.onclick = () => {
        popup.classList.add('hidden');
    };

    let updateBtn = document.querySelector('.update-btn');
    updateBtn.onclick = function () {
        let updated = popup_input.value.trim();
        if (updated !== '') {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            let index = todos.indexOf(currentValue);
            if (index !== -1) {
                todos[index] = updated;
                localStorage.setItem('todos', JSON.stringify(todos));
                liElement.childNodes[0].textContent = updated;
            }
        }
        popup.classList.add('hidden');
    };

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.onclick = function () {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        let index = todos.indexOf(currentValue);
        if (index !== -1) {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            liElement.remove();
        }
        popup.classList.add('hidden');
    };
}


ol.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'LI' || evt.target.tagName === 'BUTTON') {
        let li = evt.target.closest('li');
        if (!li) return;
        let todoText = li.childNodes[0].textContent;
        popup(todoText, li);
    }
});











// ol.addEventListener('click', function(evt){
//     let targetData = evt.target.textContent
//     let updateData = prompt('Current Todo :',targetData);
//     if(updateData && updateData.trim() !== ""){
//         let arr = localStorage.getItem('todos');
//         let parseArr = JSON.parse(arr)
//         let index = parseArr.indexOf(targetData);
//         if(index !== -1){
//             parseArr[index] = updateData;

//             let newArr = JSON.stringify(parseArr);
//             localStorage.setItem('todos', newArr);

//             evt.target.textContent = updateData;

//         }
//     }

// })



// ]