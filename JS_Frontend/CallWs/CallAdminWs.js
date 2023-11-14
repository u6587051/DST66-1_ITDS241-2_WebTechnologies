async function CallAdminWs(url, method, sentData = {}) {
    let data;
    if (method == "selectall") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "select") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "insert" || method == "update" || method == "delete") {
      let aMethod;
      if (method == "insert") {
        aMethod = "POST";
      } else if (method == "update") {
        aMethod = "PUT";
      } else if (method == "delete") {
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
  
  function clearInput() {
    STU_IDTxtRef.value = "";
    STU_FNAMETxtRef.value = "";
    STU_LNAMETxtRef.value = "";
    STU_AGETxtRef.value = "";
  }
  
  let insertB = document.querySelector("#ainsert");
  let updateB = document.querySelector("#aupdate");
  let deleteB = document.querySelector("#adelete");
  let selectB = document.querySelector("#aselect");
  let selectallB = document.querySelector("#aselectall");
  
  insertB.addEventListener("click", () => {
    STU_ID = STU_IDTxtRef.value;
    console.log(STU_ID);
    STU_FNAME = STU_FNAMETxtRef.value;
    STU_LNAME = STU_LNAMETxtRef.value;
    STU_AGE = STU_AGETxtRef.value;
    let student_data = {
      STU_ID: STU_ID,
      STU_FNAME: STU_FNAME,
      STU_LNAME: STU_LNAME,
      STU_AGE: STU_AGE,
    };
    callStudentWS("http://localhost:8021/adminWS" + "student", "insert", student_data).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
  });
  
  updateB.addEventListener("click", () => {
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
    callStudentWS("http://localhost:8021/adminWS" + "student", "update", student_data).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
  });
  
  deleteB.addEventListener("click", () => {
    STU_ID = STU_IDTxtRef.value;
    let student_data = {
      student_id: STU_ID,
    };
    callStudentWS("http://localhost:8021/adminWS" + "student", "delete", student_data).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
  });
  
  selectB.addEventListener("click", () => {
    STU_ID = STU_IDTxtRef.value;
    callStudentWS("http://localhost:8021/adminWS" + "student/" + STU_ID, "select").then((data) => {
      console.log(data);
      if (data) {
        alert(data.message);
        STU_IDTxtRef.value = data.data.STU_ID;
        STU_FNAMETxtRef.value = data.data.STU_FNAME;
        STU_LNAMETxtRef.value = data.data.STU_LNAME;
        STU_AGETxtRef.value = data.data.STU_AGE;
      }
    });
  });
  
  selectallB.addEventListener("click", () => {
    callStudentWS("http://localhost:8021/adminWS" + "students", "selectall").then((data) => {
      console.log(data);
      if (data.data.length > 0) {
        alert(data.message);
        let output;
        output = "<h1>Student List</h1>";
        output += "<table class='table'>";
        output += "<thead>";
        output += "<tr>";
        output +=
          "<th scope='col'>#</th><th scope='col'>First name</th><th scope='col'>Last name</th><th scope='col'>Age</th>";
        output += "</tr>";
        output += "</thead>";
        output += "<tbody>";
        data.data.forEach((element) => {
          output += "<tr>";
          output += "<td>" + element.STU_ID + "</td>";
          output += "<td>" + element.STU_FNAME + "</td>";
          output += "<td>" + element.STU_LNAME + "</td>";
          output += "<td>" + element.STU_AGE + "</td>";
          output += "</tr>";
        });
        output += "</tbody>";
        output += "</table>";
        $("#output").html(output);
        clearInput();
      }
    });
  });
  