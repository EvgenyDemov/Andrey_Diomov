function addRow(tableID) {
    var table = document.getElementById(tableID);

    var rowCount = table.rows.length; // row
    var row = table.insertRow(rowCount); //insertRow

    var cell1 = row.insertCell(0);
    cell1.innerHTML = rowCount;

    var nameVal = document.getElementById("name").value; //value
    var cell2 = row.insertCell(1);
    cell2.innerHTML = nameVal;

    var dateVal = document.getElementById("date").value;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = dateVal;

    var cell4 = row.insertCell(3);
    var element4 = document.createElement("button");
    element4.textContent = "Delete";
    element4.addEventListener('click', function(e) { deleteRow(row.rowIndex) });
    cell4.appendChild(element4);

    var cell5 = row.insertCell(4);
    var element5 = document.createElement("button");
    element5.textContent = "Update";
    cell5.appendChild(element5);
}

function deleteRow(i) {
    var table = document.getElementById('tableID');
    table.deleteRow(i);
}