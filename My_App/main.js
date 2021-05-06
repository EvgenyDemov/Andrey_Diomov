function addRow(tableID) {
    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = rowCount;

    var nameVal = document.getElementById("name").value;

    var nameText = document.createElement("text");
    nameText.innerHTML = nameVal;

    var nameInput = document.createElement("input");
    nameInput.className = "hidden";

    var cell2 = row.insertCell(1);
    cell2.appendChild(nameInput);
    cell2.appendChild(nameText);

    var dateVal = document.getElementById("date").value;

    var dateText = document.createElement("text");
    dateText.innerHTML = dateVal;

    var dateInput = document.createElement("input");
    dateInput.className = "hidden";
    dateInput.type = "datetime-local";

    var cell3 = row.insertCell(2);
    //cell3.innerHTML = dateVal;
    cell3.appendChild(dateInput);
    cell3.appendChild(dateText);


    var cell4 = row.insertCell(3);
    var deleteButton = createButton("Delete", "", function() { deleteRow(row.rowIndex) });
    var saveButton = createButton("Save", "hidden", function() {
        showElements([nameText, dateText, updateButton, deleteButton], true);
        showElements([nameInput, dateInput, saveButton, cancelButton], false);


        saveRow(nameInput, nameText, dateInput, dateText);
        //saveRow(nameInput, dateText);
    });

    cell4.appendChild(deleteButton);
    cell4.appendChild(saveButton);

    var cell5 = row.insertCell(4);
    var cancelButton = createButton("Cancel", "hidden", function() {
        showElements([nameText, updateButton, deleteButton], true);
        showElements([nameInput, saveButton, cancelButton], false);
    });

    var updateButton = createButton("Update", "", function() {
        showElements([nameInput, dateInput, saveButton, cancelButton], true);
        showElements([nameText, dateText, updateButton, deleteButton], false);

        updateRow(nameInput, nameText, dateInput, dateText);
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
    var table = document.getElementById('tableID');
    table.deleteRow(i);
}

function updateRow(nameInput, nameText, dateInput, dateText) {
    var nameVal = nameText.innerHTML;
    nameInput.value = nameVal;
    var dateVal = dateText.innerHTML;
    dateInput.value = dateVal;
}

function saveRow(nameInput, nameText, dateInput, dateText) {
    var nameVal = nameInput.value;
    nameText.innerHTML = nameVal;
    var dateVal = dateInput.value;
    dateI.innerHTML = dateVal;
}

function showElements(elementsArray, isVisible) {
    elementsArray.forEach(element => {
        if (isVisible) {
            element.className = "";
        } else {
            element.className = "hidden";
        }
    });
}