//Variables
const form = document.querySelector('#agregar-gasto');
const list = document.querySelector('#gastos ul');


//Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', getBudget);

    form.addEventListener('submit', addBudget);
}


//Class
class Budget {

    constructor(budget) {
        this.budget = Number(budget);
        this.rest = Number(budget);
        this.expenses = [];
    }

    newExpense(expense) {
        this.expenses = [...this.expenses, expense];
    }

}

class UI {

    addBudgetHTML(objBudget) {
        const { budget, rest } = objBudget;
        document.querySelector('#total').textContent = budget;
        document.querySelector('#restante').textContent = rest;
    }

    showAlert(msg, type) {
        const divAlert = document.createElement('div');
        divAlert.classList.add('text-center', 'alert');

        if (type === 'error') {
            divAlert.classList.add('alert-danger');
        } else {
            divAlert.classList.add('alert-success');
        }

        divAlert.textContent = msg;
        document.querySelector('.primario').insertBefore(divAlert, form);

        setTimeout(() => {
            divAlert.remove();
        }, 2500);
    }

    showExpensesList(expenses) {

        this.cleanHTML();
        
        expenses.forEach(expense => {

            const { name, amount, id } = expense;

            //Create li
            const liExpense = document.createElement('li');
            liExpense.className = 'list-group-item d-flex justify-content-between align-items-center';
            liExpense.dataset.id = id;

            //Add li in HTML
            liExpense.innerHTML = `${name} 
            <span class='badge badge-primary badge-pill'>$${amount}</span>
            `;

            //Button delete
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnDelete.textContent = 'Borrar x';

            liExpense.appendChild(btnDelete);

            //Add button in HTML
            list.appendChild(liExpense);

        });

    }

    cleanHTML(){
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

}

const ui = new UI();
let budget;

//Functions
function getBudget() {

    // const userBudget = prompt('Cuál es tu presupuesto?');

    const userBudget = 1200;

    if (userBudget === '' || userBudget === null || isNaN(userBudget) || userBudget <= 0) {
        window.location.reload();
    }

    budget = new Budget(userBudget);
    
    ui.addBudgetHTML(budget);

}

function addBudget(e) {
    e.preventDefault();

    const name = document.querySelector('#gasto').value;
    const amount = Number(document.querySelector('#cantidad').value);

    if (name === '' || amount === '') {
        ui.showAlert('Campos vacíos', 'error');
        return;
    } else if(amount <= 0 || isNaN(amount)) {
        ui.showAlert('Cantidad no válida', 'error');
        return;
    }

    //Object literal
    const expense = { name, amount, id: Date.now() };
    budget.newExpense(expense);

    //Alert success
    ui.showAlert('Gasto agregado');

    //Show expenses
    const { expenses } = budget;
    ui.showExpensesList(expenses);

    //Form content reset
    form.reset();

}