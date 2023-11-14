async function CallAdminWs(url, method, sentData = {}) {
    let data;
    if (method == "Aselectall") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "Aselect") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "Ainsert" || method == "Aupdate" || method == "Adelete") {
      let aMethod;
      if (method == "Ainsert") {
        aMethod = "POST";
      } else if (method == "Aupdate") {
        aMethod = "PUT";
      } else if (method == "Adelete") {
        aMethod = "DELETE";
      }
      let response = await fetch(url, {
        method: aMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentData),
      });
      data = await response.json();
    }
  
    return data;
  }

let STU_ID, STU_FNAME, STU_LNAME, STU_AGE;
let STU_IDTxtRef = document.querySelector("#STU_ID");
let STU_FNAMETxtRef = document.querySelector("#STU_FNAME");
let STU_LNAMETxtRef = document.querySelector("#STU_LNAME");
let STU_AGETxtRef = document.querySelector("#STU_AGE");


let insertBtnRef = document.querySelector("#insert");

insertBtnRef.addEventListener("click", () => {
    STU_ID = STU_IDTxtRef.value;
    STU_FNAME = STU_FNAMETxtRef.value;
    STU_LNAME = STU_LNAMETxtRef.value;
    STU_AGE = STU_AGETxtRef.value;
    let student_data = {
      STU_ID: STU_ID,
      STU_FNAME: STU_FNAME,
      STU_LNAME: STU_LNAME,
      STU_AGE: STU_AGE,
    };
    callStudentWS(rootURL + "student", "insert", student_data).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
  });
