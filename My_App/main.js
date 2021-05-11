var arrayOptions = ['', 'Read', 'Write', 'Sleep', 'Dinner'];

document.addEventListener('DOMContentLoaded', function() {
    var nameElement = document.getElementById("name");

    arrayOptions.forEach((option, index) => {
        var optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.value = option;

        nameElement.appendChild(optionElement);
    });
})

function addRow(tableID) {
    var table = document.getElementById(tableID);
    var nameElement = document.getElementById("name");

    if (nameElement.value == '') {
        alert("Выберите значение!");

        return;
    }

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = rowCount;


    var nameText = document.createElement("text");
    nameText.innerHTML = nameElement.value;
    nameElement.value = "";
    nameText.className = "read-mode";

    var nameSelect = createSelectElement(nameElement.value);
    nameSelect.className = "hidden edit-mode";

    var cell2 = row.insertCell(1);
    cell2.appendChild(nameSelect);
    cell2.appendChild(nameText);

    var dateVal = document.getElementById("date").value;

    var dateText = document.createElement("text");

    var isoStr = new Date().toISOString();
    var currentDate = isoStr.substring(0, isoStr.length - 8);

    dateText.innerHTML = dateVal != "" ? dateVal : currentDate;
    dateText.className = "read-mode";

    var dateInput = document.createElement("input");
    dateInput.className = "hidden edit-mode";
    dateInput.type = "datetime-local";

    var cell3 = row.insertCell(2);
    cell3.appendChild(dateInput);
    cell3.appendChild(dateText);

    var cell4 = row.insertCell(3);
    var deleteButton = createButton("Delete", "read-mode", function() { deleteRow(row.rowIndex) });
    var saveButton = createButton("Save", "hidden edit-mode", function() {
        showElements([nameText, dateText, updateButton, deleteButton], true);
        showElements([nameSelect, dateInput, saveButton, cancelButton], false);

        saveRow(nameSelect, nameText, dateInput, dateText);
    });

    cell4.appendChild(deleteButton);
    cell4.appendChild(saveButton);

    var cell5 = row.insertCell(4);
    var cancelButton = createButton("Cancel", "hidden edit-mode", function() {
        showElements([nameText, dateText, updateButton, deleteButton], true);
        showElements([nameSelect, dateInput, saveButton, cancelButton], false);
    });

    var updateButton = createButton("Update", "read-mode", function() {
        var hiddentReadModeElements = document.getElementsByClassName('read-mode hidden');

        if (hiddentReadModeElements.length > 0) {
            if (!confirm('You will lose your changes, ok?')) {
                return;
            }
        }

        disableEditModeAll();

        showElements([nameSelect, dateInput, saveButton, cancelButton], true);
        showElements([nameText, dateText, updateButton, deleteButton], false);

        updateRow(nameSelect, nameText, dateInput, dateText);
    });

    cell5.appendChild(updateButton);
    cell5.appendChild(cancelButton);
}

function createButton(name, className, clickFunction) {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = name;
    buttonElement.className = className;
    buttonElement.addEventListener('click', function(e) { clickFunction() });

    return buttonElement;
}

function deleteRow(i) {
    var confirmResult = confirm('Are you sure?');
    if (confirmResult) {
        var table = document.getElementById('tableID');
        table.deleteRow(i);
    }
}

function updateRow(nameSelect, nameText, dateInput, dateText) {
    var nameVal = nameText.innerHTML;
    nameSelect.value = nameSelect.value;
    var dateVal = dateText.innerHTML;
    dateInput.value = dateVal;
}

function saveRow(nameSelect, nameText, dateInput, dateText) {
    var nameVal = nameSelect.value;
    nameText.innerHTML = nameVal;
    var dateVal = dateInput.value;
    dateText.innerHTML = dateVal;
}

function showElements(elementsArray, isVisible) {
    elementsArray.forEach(element => {
        if (isVisible) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
}

function disableEditModeAll() {
    var editModeElements = document.getElementsByClassName('edit-mode');
    var readModeElements = document.getElementsByClassName('read-mode');

    for (element of editModeElements) {
        element.classList.add('hidden');
    }

    for (element of readModeElements) {
        element.classList.remove('hidden');
    }
}

function createSelectElement(selectedValue) {
    var selectElement = document.createElement("select");

    arrayOptions.forEach((option, index) => {
        var optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.value = option;

        selectElement.appendChild(optionElement);
    });

    if (selectedValue) {
        selectElement.value = selectedValue;
    }

    return selectElement;
}