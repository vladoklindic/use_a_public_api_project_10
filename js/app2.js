const container = document.getElementById('employees');
const overlay = document.getElementById('overlay');
const close = document.getElementById('close');


const url = 'https://randomuser.me/api/?results=12&nat=us,gb,au,ie,nz';

function createNode(element){
	return document.createElement(element);
}

function appendNode(parent, el){
	return parent.appendChild(el);
}

fetch(url) // Call the fetch function passing the url of the API as a parameter
.then((resp) => resp.json())
.then(function(data) {
	let employees = data.results;
	return employees.map(function(employee){

		let div = createNode('div');
		let img = createNode('img');
		let infoDiv = createNode('div');
		let name = createNode('h3');
		let username = createNode('p');
		let email = createNode('p');
		let city = createNode('p');
		
		let extraInfo = createNode('div');
		let phone = createNode('p');
		let address = createNode('p');
		let birthday = createNode('p');
		
		div.className = 'employees-div';
		infoDiv.className = 'info-div';
		extraInfo.className = 'extra-info-div';
		img.src = employee.picture.large;
		img.alt = 'Employee picture';
		img.className = 'employees-icon';
		name.className = 'employees-name';
		username.className = 'employees-username';
		email.className = 'employees-email';
		city.className = 'employees-city';
		name.innerHTML = `${employee.name.first} ${employee.name.last}`;
		username.innerHTML = `Username: ${employee.login.username}`;
		email.innerHTML = employee.email;
		city.innerHTML = employee.location.city;

		phone.className = 'employees-phone';
		address.className = 'employees-address';
		birthday.className = 'employees-birthday';
		phone.innerHTML = employee.cell;
		address.innerHTML = `${employee.location.street}, ${employee.location.state} ${employee.location.postcode}`;
		birthday.innerHTML = `Birthday: ${employee.dob.slice(0,11).replace(/-/g,'/')}`;


		appendNode(div, img);
		appendNode(infoDiv, name);
		appendNode(infoDiv, username);
		appendNode(infoDiv, email);
		appendNode(infoDiv, city);
		appendNode(extraInfo, phone);
		appendNode(extraInfo, address);
		appendNode(extraInfo, birthday);
		appendNode(div, infoDiv);
		appendNode(div, extraInfo);
		appendNode(container, div);

		$('.employees-div').on('click', function(e) {
			
			$('#overlay').show();
			$('#overlay-inner').html(this.innerHTML);
			
			$('.employees-username').show();
			$('.extra-info-div').show();
			$('.employees-div .extra-info-div').hide();
			$('.employees-div	.employees-username').hide();

			console.log($(".employees-div").index(this));

			let index = 0;
			let slideIndex = $(".employees-div").index(this);
			index = slideIndex;
			let allItems = document.querySelectorAll('.employees-div');
			let previous = document.querySelector("#previous");
			let next = document.querySelector("#next");

			function plusDivs(n) {
				showDivs(index += n);
			}

			function showDivs(n) {
				if (n >= allItems.length) {index = 0} 
					if (n < 0) {index = allItems.length - 1} ;
				$('#overlay').show();
				$('#overlay-inner').html(allItems[index].innerHTML);
				$('.employees-username').show();
				$('.extra-info-div').show();
				$('.employees-div .extra-info-div').hide();
				$('.employees-div .employees-username').hide();
			}

				//left and right keyboard button for navigation
				//through modal window employees data
				window.onkeyup = function(e){
					if (e.keyCode == 39) {
						$('#next').click();
					} else if (e.keyCode == 37) {
						$('#previous').click();
					}
				}

				previous.addEventListener('click', function(){
					plusDivs(-1);
					
				});

				next.addEventListener('click', function(){
					plusDivs(1);
				});
				
			});


		close.onclick = function() {
			overlay.style.display = "none";
		}

		window.onclick = function(e) {
			if (e.target == overlay) {
				overlay.style.display = "none";
			}
		}

		let employeesDivs = document.querySelectorAll('.employees-div');
		let employeesNames = document.querySelectorAll('.employees-name');
		let employeesUsernames = document.querySelectorAll('.employees-username');
		let search = document.getElementById('search');

		search.addEventListener('keyup', function(e){
			e.preventDefault();
			let searchValue = search.value.toUpperCase();
			
			for (let i=0; i<employeesNames.length; i++) {	
				for (let i=0; i<employeesDivs.length; i++) {
					if (employeesNames[i].innerHTML.toUpperCase().indexOf(searchValue) > -1) {
						employeesDivs[i].style.display = "flex";
					} else {
						employeesDivs[i].style.display = "none";
						
					}
				}

			}

		});

		
		

		
		
	})
})
.catch(function(error) {
	console.log(error);
});






