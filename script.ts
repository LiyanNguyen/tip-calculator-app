let billInput = document.querySelector<HTMLInputElement>("#bill")!;
let customTipInput = document.querySelector < HTMLInputElement>("#customTip")!;
let peopleNumberInput = document.querySelector<HTMLInputElement>("#people")!;
let tipAmountPerPerson = document.querySelector<HTMLHeadingElement>("#tipAmountPerPerson")!;
let totalPerPerson = document.querySelector<HTMLHeadingElement>("#totalPerPerson")!;
let tipButtons = document.querySelectorAll<HTMLButtonElement>(".tipChoices button")!;
let errorMessage = document.querySelector<HTMLParagraphElement>("#errorMsg")!;
let validResetButton = document.querySelector<HTMLButtonElement>("#validReset")!;

let bill: any = 0;
let tip: any = 0;
let numberOfPeople: any = 0;
let TipAmount: any = 0;
let TotalAmount: any = 0;

billInput.oninput = () => {
	if (billInput.value != "") {
		bill = billInput.value;
		caculateTipAndTotal();
	}
};

customTipInput.oninput = () => {
	if (customTipInput.value != "") {
		tip = customTipInput.value;
	}
	else {
		tip = 0;
	}
	tipButtons.forEach((button) => {
		button.classList.remove("selectedTip");
	});
	caculateTipAndTotal();
};

customTipInput.onfocus = () => {
	if (customTipInput.value != "") {
		tip = customTipInput.value;
	}
	else {
		tip = 0;
	}
	tipButtons.forEach((button) => {
		button.classList.remove("selectedTip");
	});
	caculateTipAndTotal();
};

peopleNumberInput.oninput = () => {
	if (peopleNumberInput.value != "" && peopleNumberInput.value != "0") {
		numberOfPeople = peopleNumberInput.value;
		peopleNumberInput.classList.remove("invalidInput");
		errorMessage.style.display = "none";
		caculateTipAndTotal();
	}

	else if (peopleNumberInput.value == "" || peopleNumberInput.value == "0") {
		peopleNumberInput.classList.add("invalidInput");
		errorMessage.style.display = "block"
		tipAmountPerPerson.innerText = `$0.00`;
		totalPerPerson.innerText = `$0.00`;
		validResetButton.style.display = "none";
	}
};

let caculateTipAndTotal = () => {
	// allow to give no tip at all
	if (bill != 0 && numberOfPeople != 0) {
		TipAmount = (bill * (tip / 100)) / numberOfPeople;
		TotalAmount = (bill * (1 + tip / 100)) / numberOfPeople;
		// smart solution to always show 2 decimal places but not rounding on the 2nd decimal place
		tipAmountPerPerson.innerText = `$${TipAmount.toFixed(3).slice(0, -1)}`;
		//weird, this one we round to 2 decimal places - accoding to the design anyway
		totalPerPerson.innerText = `$${TotalAmount.toFixed(2)}`;	
		validResetButton.style.display = "block";
	}
};

tipButtons.forEach((button) => {
	button.onclick = () => {
		tipButtons.forEach((allButtons) => {
			allButtons.classList.remove("selectedTip");
		});
		button.classList.add("selectedTip");
		tip = button.innerText.slice(0, -1);
		customTipInput.value = "";
		caculateTipAndTotal();
	};
});

validResetButton.onclick = () => {
	bill = 0;
	tip = 0;
	numberOfPeople = 0;
	TipAmount = 0;
	TotalAmount = 0;
	billInput.value = "";
	customTipInput.value = "";
	peopleNumberInput.value = "";
	tipAmountPerPerson.innerText = `$0.00`;
	totalPerPerson.innerText = `$0.00`;
	tipButtons.forEach((allButtons) => {
		allButtons.classList.remove("selectedTip");
	});
	validResetButton.style.display = "none";
};

// dont allow user to use the - and + for the inputs
// so we dont have to deal with negative inputs in the first place
window.addEventListener("keydown", (event) => {
	if (event.key == "-" || event.key == "+") {
		event.preventDefault();
	}
});