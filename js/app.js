$.ajax({
  url: 'https://randomuser.me/api/?results=5',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    const employees = data.results;
    const overlay = document.getElementById('overlay');
    const overlayProfile = document.getElementById('overlay-inner');
    let output = '';
    for(let i in employees){
      output += `<div class='employees-div'>
                  <img class='employees-icon' src='${employees[i].picture.medium}'>
                  <h3 class='employees-name'>${employees[i].name.first} ${employees[i].name.last}</h3>
                  <p class='employees-email'>${employees[i].email}</p>
                  <p class='employees-city'>${employees[i].location.city}</p>
                  <div class='extra-info-div'>
                    <p class='employees-phone'>${employees[i].login.username}</p>  
                  </div>

                </div>`;
    }
    document.getElementById('employees').innerHTML = output;

    $('.employees-div').on('click', function(e) {
      overlay.style.display = 'block';
      
      $('#overlay-inner').html(this.innerHTML);
      $('.extra-info-div').show();
      $('.employees-div .extra-info-div').hide();
      
    });

    const close = document.querySelector(".close");
    
    close.addEventListener("click", function(e) {
      overlay.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == overlay) {
            overlay.style.display = "none";
        }
    }


  }

});




// let output="<table>";
//     for(let i in employees){
//       output += `<tr><td><img src='${employees[i].picture.thumbnail}'</img></td>
//             <td> ${employees[i].name.first} ${employees[i].name.last} </td>
//             <td> ${employees[i].email} </td>
//             <td> ${employees[i].location.city} </td></tr>`;
//       } 
//     output += "</table>";
//     document.getElementById('employee').innerHTML = output;