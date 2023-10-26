function Data() {
    var url = document.getElementById("urlInput").value;
    var tableContainer = document.querySelector(".table-container");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var responseData = JSON.parse(xhr.responseText);
                    var table = "<table>";
                    table += "<tr>";

                    var keys = Object.keys(responseData[0]);
                    for (var i = 0; i < keys.length; i++) {
                        table += "<th>" + keys[i] + "</th>";
                    }
                    table += "</tr>";

                    for (var j = 0; j < responseData.length; j++) {
                        table += "<tr>";
                        for (var k = 0; k < keys.length; k++) {
                            table += "<td>" + responseData[j][keys[k]] + "</td>";
                        }
                        table += "</tr>";
                    }

                    table += "</table>";
                    tableContainer.innerHTML = table;
                } catch (error) {
                    tableContainer.innerHTML = "Gagal mengurai data JSON.";
                }
            } else {
                tableContainer.innerHTML = "Gagal mengambil data dari URL. Status: " + xhr.status;
            }
        }
    };
    xhr.send();
}

document.getElementById('search-btn').addEventListener('click', function() {
    var query = document.getElementById('query').value;
    if (query.trim() === '') {
        alert('Kolom pencarian tidak boleh kosong!');
        return;
    }

    var tableContainer = document.querySelector(".table-container");
    var table = tableContainer.querySelector("table");
    var trs = table.querySelectorAll("tr");

    for (var i = 0; i < trs.length; i++) {
        var tr = trs[i];
        var tds = tr.querySelectorAll("td");
        var isMatch = false;

        for (var j = 0; j < tds.length; j++) {
            var td = tds[j];
            if (td.textContent.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                isMatch = true;
                break;
            }
        }

        if (isMatch) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    }
});