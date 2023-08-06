function drawGraph() {
    // get values -----------------------------------------------------------
    let years = parseInt(document.getElementById("years").value);
    let interest = parseFloat(document.getElementById("interest").value);

    let startingCapital = parseInt(document.getElementById("initialSum").value);
    let yearlyContribution = parseInt(document.getElementById("yearlyContribution").value);

    let skilled = false; // not used atm

    let totalBalance = startingCapital;
    let totalInvested = startingCapital;
    let totalBalance_arr = [];
    let totalInvested_arr = [];
    let years_arr = [];

    // main logic -----------------------------------------------------------
    for (let year = 1; year <= years; year++) {
        totalBalance = totalBalance + yearlyContribution;
        totalBalance = totalBalance * (1 + interest);
        totalInvested = totalInvested + yearlyContribution;

        // 2% increased income every year
        if (skilled) {
            yearlyContribution = yearlyContribution * (1 + 0.02)
        }
        years_arr.push(year);
        totalBalance_arr.push(totalBalance);
        totalInvested_arr.push(totalInvested);

    }


    totalBalance = Math.round(totalBalance * 100) / 100;
    totalInvested = Math.round(totalInvested * 100) / 100;
    console.log("Total invested: ", totalInvested);
    console.log("Total $$$$$$$$: ", totalBalance);
    console.log("Growth (sum)    ", Math.round((totalBalance - totalInvested) * 100) / 100);

    // plot-------------------------------------------------------------------------
    var data = [
        { x: years_arr, y: totalBalance_arr, mode: "lines", name:"Sina"},
        { x: years_arr, y: totalInvested_arr, mode: "lines", name:"Su naaber"}
    ];
    var layout = {
        plot_bgcolor: "rgb(228, 211, 217)",
        font: {
            color: "black"
        }
    };


    Plotly.newPlot("chart", data, layout);
}