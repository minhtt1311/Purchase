var $ = document.querySelector.bind(document);
var surname = $("#surname");
var email = $("#email");
var sdt = $("#sdt");
var province = $("#province");
var district = $("#district");
var ward = $("#ward");
var addrssHome = $("#addrssHome");
var errName = $(".errName");
var errEmail = $(".errEmail");
var errSDT = $(".errSDT");
var errProvince = $(".errProvince");

function check() {
  var name = $("#name");

  var result = true;
  if (name.value == "" && surname.value == "") {
    errName.innerHTML = "Không được để trống họ và tên";
    result = false;
  } else {
    if (name.value == "") {
      errName.innerHTML = `không được để trống tên`;
      result = false;
    } else {
      errName.innerHTML = "";
    }
    if (surname.value == "") {
      errName.innerHTML = `không được để trống họ`;
      result = false;
    } else {
      errName.innerHTML = "";
    }
  }

  const reEmail = /\S+@\S+\.\S+/;

  if (email.value == "") {
    errEmail.innerHTML = "Không để trống email";
    result = false;
  } else {
    if (!reEmail.test(email.value)) {
      errEmail.innerHTML = "Email không đúng định dạng";
      result = false;
    } else {
      errEmail.innerHTML = "";
    }
  }

  const reSDT =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  if ("" === sdt.value) {
    errSDT.innerHTML = "Không để trống SĐT";
    result = false;
  } else {
    if (!reSDT.test(sdt.value)) {
      errSDT.innerHTML = "SDT không đúng định dạng";
      result = false;
    } else {
      errSDT.innerHTML = "";
    }
  }

  if (province.value == "" || district.value == "" || ward.value == "") {
    errProvince.innerHTML = "Vui lòng chọn địa chỉ ";
    result = false;
  } else if (addrssHome.value == "") {
    errProvince.innerHTML = "Vui lòng ghi địa chỉ nhà";
    result = false;
  } else {
    errProvince.innerHTML = "";
  }
  return result;
}
