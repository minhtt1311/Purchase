// api Province
const api = "https://provinces.open-api.vn/api/";
fetch("https://provinces.open-api.vn/api/?depth=1")
  .then((res) => res.json())
  .then((data) => renderData(data, "province"));

var renderData = (arr, select) => {
  let row = ' <option value="">--- Chọn ---</option>';
  arr.forEach((e) => {
    row += `<option value="${e.code}">${e.name}</option>`;
  });
  $("#" + select).innerHTML = row;
};

$("#province").addEventListener("change", () => {
  fetch(api + "p/" + $("#province").value + "?depth=2")
    .then((res) => res.json())
    .then((data) => renderData(data.districts, "district"));

  $("#ward").innerHTML = `<option value="">--- Chọn ---</option>`;
});
$("#district").addEventListener("change", () => {
  fetch(api + "d/" + $("#district").value + "?depth=2")
    .then((res) => res.json())
    .then((data) => renderData(data.wards, "ward"));
});
