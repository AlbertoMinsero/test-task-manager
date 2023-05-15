window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const list_completed_el = document.querySelector("#completed-tasks");
	const filter_pending_task = document.querySelector('#filter-task-input');
	const filter_completed_task = document.querySelector('#filter-completed-task-input');

	filter_pending_task.addEventListener('keyup', filterList);
	filter_completed_task.addEventListener('keyup', filterCompletedList);

	function filterList(){
		const searchInput = document.querySelector("#filter-task-input");
		const filter = searchInput.value.toLowerCase();
		const listItems = document.querySelectorAll(".task");

		listItems.forEach((item) =>{
			let text = item.children[0].children[0].value;
			if(text.toLowerCase().includes(filter.toLowerCase())){
				item.style.display = "";
			}
			else{
				item.style.display = "none";
			}
		})

	}

	function filterCompletedList(){
		const searchInput = document.querySelector("#filter-completed-task-input");
		const filter = searchInput.value.toLowerCase();
		const listItems = document.querySelectorAll(".task");

		listItems.forEach((item) =>{
			let text = item.children[0].children[0].value;
			if(text.toLowerCase().includes(filter.toLowerCase())){
				item.style.display = "";
			}
			else{
				item.style.display = "none";
			}
		})

	}




	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Editar';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Eliminar';

		const task_delete_c_el = document.createElement('button');
		task_delete_c_el.classList.add('delete');
		task_delete_c_el.innerText = 'Eliminar';

		const task_complete_el = document.createElement('button');
		task_complete_el.classList.add('complete');
		task_complete_el.innerText = 'Completar';

		const task_pending_el = document.createElement('button');
		task_pending_el.classList.add('pending');
		task_pending_el.innerText = 'Mover a Pendientes';

		task_actions_el.appendChild(task_complete_el);
		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);
		

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "editar") {
				task_edit_el.innerText = "Guardar";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Editar";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});

		task_delete_c_el.addEventListener('click', (e) => {
			list_completed_el.removeChild(task_el);
		});

		task_complete_el.addEventListener('click', (e) => {
			task_actions_el.removeChild(task_edit_el);
			task_actions_el.removeChild(task_complete_el);
			task_actions_el.removeChild(task_delete_el);
			task_actions_el.appendChild(task_pending_el);
			task_actions_el.appendChild(task_delete_c_el);
			list_completed_el.appendChild(task_el);
		});

		task_pending_el.addEventListener('click', (e) => {
			task_actions_el.removeChild(task_pending_el);
			task_actions_el.removeChild(task_delete_c_el);
			task_actions_el.appendChild(task_complete_el);
			task_actions_el.appendChild(task_edit_el);
			task_actions_el.appendChild(task_delete_el);
			list_el.appendChild(task_el);
		});
	});
});