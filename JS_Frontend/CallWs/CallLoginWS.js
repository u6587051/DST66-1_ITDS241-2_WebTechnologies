//function ในการเรียก productWS ผ่านการ fetch api
async function callLoginWS(url, method,sentData = {}) {
    let data;
    if (method == "login") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง productWS
      });
      data = await response.json();
    }
    return data; //ส่งข้อมูลกลับมา
}

//รับค่ามาจาก inputbox โดย id
let USERNAME, PWD;
let USERNAME_TXT = document.querySelector("#username");
let PWD_TXT = document.querySelector("#pwd");

//รับค่าปุ่มมาจาก input box โดย id
let loginB = document.querySelector("#login");

//หากกด login จะส่ง method post
loginB.addEventListener("click", () => {
  USERNAME = USERNAME_TXT.value;
  PWD = PWD_TXT.value;

  console.log(USERNAME);
  console.log(PWD);
  let username = `USERNAME=${USERNAME}`;
  let pwd = `PWD=${PWD}`;
  callLoginWS("http://localhost:8022/loginWS/"+ "login?"+username+"&"+pwd, "login").then((data) => {
    alert(data.message);
    if (data.error == true){
      console.log("Failed to login")
    }
    else{
      window.location.replace("http://localhost:8021/admin-edit");
    }
  });
});