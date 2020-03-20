document.addEventListener(
  "DOMContentLoaded",
  function() {
    window.RunningTotals = { Fat: 0, Carbohydrate: 0, Protein: 0, Cals: 0 };
    const bg = chrome.extension.getBackgroundPage();
    document.getElementById("title").innerHTML = `Title: ${bg.tmpTitle}`;

    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi", addClicked);
      });
    }

    function addToTotal(nurVals) {
      window.RunningTotals.Fat =
        window.RunningTotals.Fat + parseFloat(nurVals.Fat.valueTotal);
      window.RunningTotals.Carbohydrate =
        window.RunningTotals.Carbohydrate +
        parseFloat(nurVals.Carbohydrate.valueTotal);
      window.RunningTotals.Protein =
        window.RunningTotals.Protein + parseFloat(nurVals.Protein.valueTotal);
      window.RunningTotals.Cals =
        window.RunningTotals.Cals + parseFloat(nurVals.Energy.valueTotal);
    }

    function addClicked(res) {
      addToTotal(res.nurVals);
      const div = document.createElement("div");
      div.textContent = JSON.stringify(window.RunningTotals, null, 2);
      document.body.appendChild(div);

      document.getElementById("kcals").innerHTML = window.RunningTotals.Cals;
      document.getElementById("carbs").innerHTML =
        window.RunningTotals.Carbohydrate;
      document.getElementById("proteins").innerHTML =
        window.RunningTotals.Protein;
      document.getElementById("fats").innerHTML = window.RunningTotals.Fat;
    }
  },
  false
);
