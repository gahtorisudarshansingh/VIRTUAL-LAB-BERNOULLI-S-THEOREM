document.addEventListener("DOMContentLoaded", () => {
    let dischargeValue = 0;

    // Set the discharge value after user input
    document.getElementById('set-discharge').addEventListener('click', () => {
        dischargeValue = parseFloat(document.getElementById('discharge').value);
        if (isNaN(dischargeValue) || dischargeValue <= 0) {
            alert("Please enter a valid discharge value!");
            return;
        }
        alert("Discharge value set to: " + dischargeValue + " cm³/s");
    });

    document.getElementById('calculate-tank').addEventListener('click', () => {
        const h1 = parseFloat(document.getElementById('h1').value);
        const h2 = parseFloat(document.getElementById('h2').value);
        const t_tank = parseFloat(document.getElementById('t_tank').value);
      
        // Calculate discharge here (replace with your actual calculation formula)
        const discharge = 900*(h2 - h1) / t_tank;
      
        document.getElementById('discharge-value').textContent = discharge.toFixed(2) + ' cm³/s';
        document.getElementById('discharge-section').style.display = 'block';
      });




    // Add Row Button Functionality
    document.getElementById('add-row').addEventListener('click', () => {
        const tbody = document.getElementById('tube-rows');
        const rowCount = tbody.rows.length + 1;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td><input type="number" class="pressure-head" placeholder="Pressure Head"></td>
            <td><input type="number" class="tube-dia" placeholder="Tube Dia"></td>
            <td><input type="number" class="area" placeholder="Area"></td>
            <td><span class="velocity">-</span></td>
            <td><span class="velocity-head">-</span></td>
            <td><span class="total-head">-</span></td>
        `;
        tbody.appendChild(newRow);
    });

    // Calculate Button Functionality
    document.getElementById('calculate-btn').addEventListener('click', () => {
        if (dischargeValue <= 0) {
            alert("Please set a valid discharge value first.");
            return;
        }

        const rows = document.querySelectorAll('#tube-rows tr');
        rows.forEach(row => {
            const pressureHead = parseFloat(row.querySelector('.pressure-head').value);
            const tubeDia = parseFloat(row.querySelector('.tube-dia').value);
            const area = parseFloat(row.querySelector('.area').value);

            if (isNaN(pressureHead) || isNaN(tubeDia) || isNaN(area) || area <= 0 || tubeDia <= 0) {
                alert("Please enter valid values for pressure head, tube diameter, and area.");
                return;
            }

            // Calculate velocity (v = Q / A)
            const velocity = dischargeValue / area;

            // Calculate velocity head (v² / 2g)
            const velocityHead = Math.pow(velocity, 2) / (2 * 981); // Gravity constant: 9.81 m/s²

            // Calculate total head (pressure head + velocity head)
            const totalHead = pressureHead + velocityHead;

            // Update the UI with results
            row.querySelector('.velocity').innerText = velocity.toFixed(2);
            row.querySelector('.velocity-head').innerText = velocityHead.toFixed(2);
            row.querySelector('.total-head').innerText = totalHead.toFixed(2);
        });
    });
});
