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
        this.expense = [];
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
    const amount = document.querySelector('#cantidad').value;

    if (name === '' || amount === '') {
        ui.showAlert('Campos vacíos', 'error');
        return;
    } else if(amount <= 0 || isNaN(amount)) {
        ui.showAlert('Cantidad no válida', 'error');
        return;
    }

    console.log('Agregando gasto...');

}