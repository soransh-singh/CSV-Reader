window.onload = (e)=>{
    const btn = document.querySelector("form")
    const error = document.querySelector(".error")
    
    function Upload() {
        const fileUpload = document.querySelector("#fileUpload")

        const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                const reader = new FileReader()
                reader.onload =  (e)=> {
                    const table = document.createElement("table");
                    const rows = e.target.result.split("\n");
                    for (let i = 0; i < rows.length; i++) {
                        let cells = rows[i].split(",")
                        if (cells.length > 1) {

                            const row = table.insertRow(-1);

                            for (let j = 0; j < cells.length; j++) {
                                const cell = row.insertCell(-1)
                                cells[j]=cells[j].replaceAll('"','')
                                cell.innerHTML = cells[j]
                            }
                        }
                    }
                    var csv = document.getElementById("csv")
                    csv.innerHTML = "";
                    csv.appendChild(table);
                }
                reader.readAsText(fileUpload.files[0])
            } else {
                
                error.innerHTML = "This browser does not support HTML5."
            }
        } else {
            error.innerHTML = "Please upload a valid CSV file."
        }
    }


    btn.addEventListener("submit", (e)=>{
        e.preventDefault();
        error.innerHTML = ""
        console.log("btn clicked");
        Upload()
    })
}