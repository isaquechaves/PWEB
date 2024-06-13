document.addEventListener('DOMContentLoaded', function() {
    //Exibir o modal de criar tarefa
    const addCardModal = document.getElementById('addCardModal');   
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const addCardForm = document.getElementById('addCardForm');
    const searchBar = document.getElementById('searchBar');

    // Função para salvar os cards no localStorage
    function saveCards() {
        const columns = document.querySelectorAll('.kanban-column');
        const data = Array.from(columns).map(column => {
            const cards = Array.from(column.querySelectorAll('.kanban-card')).map(card => {
                return {
                    title: card.querySelector('.card-title').value,
                    description: card.querySelector('input[name="description"]').value,
                    priority: card.querySelector('input[name="priority"]').value,
                    assignedTo: card.querySelector('input[name="assignedTo"]').value,
                    dueDate: card.querySelector('input[type="date"]').value,
                    status: column.id
                };
            });
            return {
                id: column.id,
                cards
            };
        });
        localStorage.setItem('kanbanData', JSON.stringify(data));
    }

    // Função para carregar os cards do localStorage
    function loadCards() {
        const data = JSON.parse(localStorage.getItem('kanbanData'));
        if (data) {
            data.forEach(columnData => {
                const column = document.getElementById(columnData.id);
                columnData.cards.forEach(cardData => {
                    addCardToColumn(column, cardData);
                });
            });
        }
    }

     // Função para adicionar um card a uma coluna
     function addCardToColumn(column, cardData) {
        const { title, description, priority, assignedTo, dueDate, status } = cardData;
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.draggable = true;
        card.innerHTML = `
        <button class="edit-button">Edit</button>
        <button class="save-button" style="display: none;">Save</button>
        <p><strong>Título:</strong> <input type="text" value="${title}" readonly class="card-title" name="title"> </p>
        <p><strong>Descrição:</strong> <input type="text" value="${description}" readonly name="description"></p>
        <p><strong>Prioridade:</strong> <input type="text" value="${priority}" readonly name="priority"></p>
        <p><strong>Atribuído:</strong> <input type="text" value="${assignedTo}" readonly name="assignedTo"></p>
        <p><strong>Prazo:</strong> <input type="date" id="dueDate" value="${dueDate}" readonly name="dueDate"></p>
        <p><strong>Status:</strong> <select disabled>
            <option value="todo"${status === 'todo' ? ' selected' : ''}>Pendente</option>
            <option value="in progress"${status === 'in progress' ? ' selected' : ''}>Em progresso</option>
            <option value="done"${status === 'done' ? ' selected' : ''}>Concluído</option>
        </select></p>
         `;

        card.addEventListener('dblclick', () => {
            const inputs = card.querySelectorAll('input, select');
            inputs.forEach(input => input.readOnly = !input.readOnly);
            inputs.forEach(select => select.disabled = !select.disabled);
        });

        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            saveCards(); // Salva os cards sempre que um card é movido
        });

        document.getElementById(status.toLowerCase().replace(' ', '-')).appendChild(card);

        column.appendChild(card);

        // Adiciona eventos de edição e salvamento
        const editButton = card.querySelector('.edit-button');
        const saveButton = card.querySelector('.save-button');
        const inputs = card.querySelectorAll('input, select');
        const inputDate = card.querySelector('#dueDate'); 

        editButton.addEventListener('click', () => {
            inputs.forEach(input => input.readOnly = false);
            inputDate.readOnly = false;
            editButton.style.display = 'none';
            saveButton.style.display = 'inline';
        });

        saveButton.addEventListener('click', () => {
            console.log(inputs)
            inputs.forEach(input => input.readOnly = true);
            inputs.forEach(select => select.disabled = true);
            editButton.style.display = 'inline';
            saveButton.style.display = 'none';
            saveCards(); // Salva os cards sempre que um card é editado
        });

        checkDueDate(card, dueDate);
        updateCardColor(card, status);
    }

    openModalButton.addEventListener('click', function() {
        addCardModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', function() {
        addCardModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == addCardModal) {
            addCardModal.style.display = 'none';
        }
    });

    //Form para criar a tarefa
    addCardForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        const assignedTo = document.getElementById('assignedTo').value;
        const dueDate = document.getElementById('dueDate').value;
        const status = document.getElementById('status').value;

        //Card a ser inserido na coluna
        const cardData = { title, description, priority, assignedTo, dueDate, status };
        const column = document.getElementById(status.toLowerCase().replace(' ', '-'));
        addCardToColumn(column, cardData);

        addCardModal.style.display = 'none';
        this.reset();
        saveCards();
    });

    const columns = document.querySelectorAll('.kanban-column');

    function updateCardStatus(card, newStatus) {
        const statusSelect = card.querySelector('select');
        const options = statusSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value.toLowerCase() === newStatus.toLowerCase()) {
                options[i].selected = true;
                break;
            }
        }
        updateCardColor(card, newStatus);
    }

    function updateCardColor(card, status) {
        status = status.replace('-', ' ');
        console.log('Updating card color. Status:', status);
        switch (status.toLowerCase()) {
            case 'done':
                card.style.backgroundColor = '#9be699';
                break;
            case 'in progress':
                card.style.backgroundColor = '#e0db8f';
                break;
            case 'todo':
                card.style.backgroundColor = '#f3c7c7';
                break;
            default:
                card.style.backgroundColor = '#f3c7c7';
                break;
        }
    }

    //Chama a função updateCardStatus para atualizar o status
    function handleDrop(columnId, card) {
        const status = columnId.replace('-', ' ');
        updateCardStatus(card, status);
        saveCards();
    }

    //Lida com evento de mover os cards de coluna
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                column.appendChild(draggable);
            } else {
                column.insertBefore(draggable, afterElement);
            }
        });
        column.addEventListener('drop', e => {
            e.preventDefault();
            const card = document.querySelector('.dragging');
            const columnId = column.id;
            handleDrop(columnId, card);
        });
    });

    //Lida com a ordenação que o elemento movido irá ficar na coluna
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.kanban-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function checkDueDate(card, dueDate) {
        const today = new Date().toISOString().split('T')[0];
        if (dueDate === today) {
            console.log(today + ' comparado ' + dueDate)
            let dueTodayTag = card.querySelector('.due-today');
            if (!dueTodayTag) {
                dueTodayTag = document.createElement('div');
                dueTodayTag.className = 'due-today';
                dueTodayTag.innerText = 'Hoje';
                card.appendChild(dueTodayTag);
            }
        } else {
            const dueTodayTag = card.querySelector('.due-today');
            if (dueTodayTag) {
                dueTodayTag.remove();
            }
        }
        if (dueDate < today){
            let dueLateTag = card.querySelector('.due-late');
            if (!dueLateTag) {
                dueLateTag = document.createElement('div');
                dueLateTag.className = 'due-late';
                dueLateTag.innerText = 'Atrasado';
                card.appendChild(dueLateTag);
            }
        }else {
            const dueLateTag = card.querySelector('.due-late');
            if (dueLateTag) {
                dueLateTag.remove();
            }
        }
    }

    // Função de busca de tarefas pelo título
    searchBar.addEventListener('input', function() {
        const query = searchBar.value.toLowerCase();
        const cards = document.querySelectorAll('.kanban-card');

        cards.forEach(card => {
            const title = card.querySelector('.card-title').value.toLowerCase();
            if (title.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    function applyColorsToAllCards() {
        const cards = document.querySelectorAll('.kanban-card');
        cards.forEach(card => {
            const status = card.closest('.kanban-column').id;
            updateCardColor(card, status);
        });
    }

    //Carrega os cards da localStorage
    loadCards();
    applyColorsToAllCards();
});
