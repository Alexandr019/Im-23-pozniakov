window.addEventListener("DOMContentLoaded", async () => {
            const MODEL_URL = '/model.json';
            const model = await tf.loadLayersModel(MODEL_URL);

            let consumption_text = document.getElementById("consumption");
            consumption_text.innerHTML = "Тепер можете визначити енергоспоживання";

            let button = document.getElementById("predict");

            button.addEventListener("click", () => {
                const T = parseFloat(document.getElementById("T").value);
                const H = parseFloat(document.getElementById("H").value);
                const WS = parseFloat(document.getElementById("WS").value);
                const GDF = parseFloat(document.getElementById("GDF").value);
                const DF = parseFloat(document.getElementById("DF").value);

                const input = tf.tensor2d([[T, H, WS, GDF, DF]], [1, 5]);
                const result = model.predict(input).dataSync();
                consumption_text.innerHTML = 
                    `<div class="result">Zone 1 Power Consumption = ${result[0].toFixed(2)} kW</div>` +
                    `<div class="result">Zone 2 Power Consumption = ${result[1].toFixed(2)} kW</div>` +
                    `<div class="result">Zone 3 Power Consumption = ${result[2].toFixed(2)} kW</div>`;
            });
        });