chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const title = document.getElementsByClassName(
    "product-details-tile__title"
  )[0].innerHTML;
  const nurVals = { title, Fat: {}, Carbohydrate: {}, Protein: {}, Energy: {} };

  const table = document.getElementsByClassName("product__info-table");
  const sizeEl = document.getElementsByClassName(
    "product-info-block--net-contents"
  )[0];
  const sizeEl1 = sizeEl.getElementsByClassName("product-info-block__content");
  const sizeEl2 = sizeEl1[0];
  const sizeEl3 = sizeEl2.innerHTML;
  const patt1 = /[0-9]/g;
  const size = sizeEl3.match(patt1).join("");
  const body = table[0] && table[0].tBodies[0];

  for (var i = 0; i < body.rows.length; i++) {
    const row = body.rows[i];
    const name = row.cells[0].innerHTML;
    if (
      name === "Fat" ||
      name === "Carbohydrate" ||
      name === "Protein" ||
      name === "Energy"
    ) {
      if (name === "Energy") {
        const valuePer100 = row.cells[1].innerHTML.split("/").pop();
        nurVals[name].valuePer100 = valuePer100;
        nurVals[name].valuePerServe = row.cells[2].innerHTML.split("/").pop();
        nurVals[name].valueTotal = (
          (valuePer100.split("kcal").shift() / 100) *
          size
        ).toFixed(0);
      } else {
        nurVals[name].valuePer100 = row.cells[1].innerHTML;
        nurVals[name].valuePerServe = row.cells[2].innerHTML;
        nurVals[name].valueTotal = (
          (row.cells[1].innerHTML.split("g").shift() / 100) *
          size
        ).toFixed(2);
      }
    }
  }

  console.log(JSON.stringify(nurVals, null, 2));
  sendResponse({ nurVals });
});

const title = document.getElementsByClassName("product-details-tile__title")[0]
  .innerHTML;

chrome.runtime.sendMessage({
  url: window.location.href,
  title
});
