// import { DataAPIClient, VectorDoc, SomeDoc } from '@datastax/astra-db-js';

// const { eventNames } = require("process");

function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

const similarity_form = document.querySelector('#similarity-form')
document.querySelector('#byProblemText').addEventListener('click', function() {
    // check to see if metadata textbox (OTHER ONE) doesn't exists
    const form_elements = similarity_form.children;
    const flag = (form_elements.length == 0);
    for (let i = 0; i < form_elements.length; i++) {
        if (form_elements[i].id == 'problemMetadataInput' || form_elements[i].id == 'problemMetadataButton') {
            // then the text input existed before
            flag = true;
            similarity_form.removeChild(form_elements[i])

        }
    }
    // if the button is being clicked, then it has to be selected

    // if flag is true, then we have to add the problem text input elements

    var inputElement = document.createElement('input');

    // Set the attributes
    inputElement.setAttribute('id', 'problemTextInput');
    inputElement.setAttribute('class', 'flex h-10 w-full bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200');
    inputElement.setAttribute('placeholder', 'Enter problem text');
    inputElement.setAttribute('type', 'text');

    var buttonElement = document.createElement('button');

    // Set the attributes
    buttonElement.setAttribute('type', 'submit');
    buttonElement.setAttribute('id', 'problemTextButton');
    buttonElement.setAttribute('class', 'inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800');


    similarity_form.appendChild(inputElement)
    similarity_form.appendChild(buttonElement)

})

document.querySelector('#byProblemMetadata').addEventListener('click', function() {
    const form_elements = similarity_form.children();
    const flag = (form_elements.length == 0);
    for (let i = 0; i < form_elements.length; i++) {
        if (form_elements[i].id == 'problemMetadataInput' || form_elements[i].id == 'problemMetadataButton') {
            // then the text input existed before
            flag = true;
            similarity_form.removeChild(form_elements[i])

        }
    }
})

document.querySelector('#problemTextButton').addEventListener('click', async function(event) {
    event.preventDefault();
    const raw_text = document.getElementById('problemTextInput').value;
    const results_table = document.getElementById('results-table')
    console.log(raw_text)
    fetch(`http://localhost:5000/process?rawtext=${encodeURIComponent(raw_text)}`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {

            // first remove table entries from a previous search
            if (results_table.firstElementChild) {
                results_table.innerHTML = ""
                delay(2000)
            }
            for (let i = 0; i < data.length; i++) {
                results_table.appendChild(createRow(data[i][1]))
            }
        } else if (data.error) {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
})

function createRow(problemData) {
    const row = document.createElement('tr')
    row.classList.add('bg-white', 'hover:bg-gray-100', 'dark:bg-gray-700', 'dark:hover:bg-gray-600')

    const contest_cell = document.createElement('td')
    const year_cell = document.createElement('td')
    const number_cell = document.createElement('td')
    const link_cell = document.createElement('td')

    const link = document.createElement('a')
    link.href = problemData["Link"]
    link.textContent = 'Link'
    link.classList.add('text-blue-500', 'hover:underline')
    link_cell.appendChild(link)
    link_cell.classList.add('px-4', 'py-3', 'text-sm', 'text-gray-900', 'dark:text-gray-200')

    contest_cell.classList.add('px-4', 'py-3', 'text-sm', 'text-gray-900', 'dark:text-gray-200')
    contest_cell.textContent = problemData["Contest"]

    year_cell.classList.add('px-4', 'py-3', 'text-sm', 'text-gray-900', 'dark:text-gray-200')
    year_cell.textContent = problemData["Year"]

    number_cell.classList.add('px-4', 'py-3', 'text-sm', 'text-gray-900', 'dark:text-gray-200')
    number_cell.textContent = problemData["Number"]

    row.appendChild(contest_cell)
    row.appendChild(year_cell)
    row.appendChild(number_cell)
    row.appendChild(link_cell)

    return row

}

document.querySelector('#clear').addEventListener('click', function(event) {
    event.preventDefault()
    const results_table = document.getElementById('results-table')
    // console.log(String(results_table.children.length))
    // if (results_table.children.length > 0) {
    //     for (let i = 0; i < results_table.children.length; i++) {
    //         console.log(results_table.children[i])
    //         results_table.removeChild(results_table.children[i])
    //     }
    // }
    // console.log('cleared')

    results_table.innerHTML = ""
})
