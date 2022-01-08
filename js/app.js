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
        this.getRest();
    }

    getRest() {
        const currentExpenses = this.expenses.reduce( (total, expense) => total + expense.amount, 0 );
        this.rest = this.budget - currentExpenses;
    }

    deleteExpense(id) {
        
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.getRest();

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
            <span class='badge badge-primary badge-pill'>$ ${amount}</span>
            `;

            //Button delete
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnDelete.textContent = 'Borrar x';
            btnDelete.onclick = () => {
                deleteExpense(id)
            }
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

    updateRest(rest) {
        document.querySelector('#restante').textContent = rest;
    }

    checkBudget(objBudget) {

        const { budget, rest } = objBudget;
        const restDiv = document.querySelector('.restante');

        if ((budget / 4) > rest) {

            restDiv.classList.remove('alert-success', 'alert-warning');
            restDiv.classList.add('alert-danger');

        } else if((budget / 2) > rest) {

            restDiv.classList.remove('alert-success');
            restDiv.classList.add('alert-warning');

        } else {
            restDiv.classList.remove('alert-danger', 'alert-warning');
            restDiv.classList.add('alert-success');
        }

        if (rest <= 0) {
            ui.showAlert('Presupuesto agotado', 'error');
            form.querySelector('button[type="submit"]').disabled = true;
        }

    }

}

const ui = new UI();
let budget;



//Functions
function getBudget() {

    // const userBudget = prompt('Cuál es tu presupuesto?');

    const userBudget = 500;

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
    const { expenses, rest } = budget;
    ui.showExpensesList(expenses);
    
    ui.updateRest(rest);

    ui.checkBudget(budget);

    //Form content reset
    form.reset();

}

function deleteExpense(id) {
    //Delete from class
    budget.deleteExpense(id);

    //Delete from HTML
    const { expenses, rest } = budget;
    ui.showExpensesList(expenses);
    ui.updateRest(rest);
    ui.checkBudget(budget);
}