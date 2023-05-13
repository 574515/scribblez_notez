class InputClassStyles {
	errorInput = "errorInput my-2 form-control form-control-sm";
	validInput = "validInput my-2 form-control form-control-sm";
	errorPasswordInput = "errorInput my-2 w-75 form-control form-control-sm";
	validPasswordInput = "validInput my-2 w-75 form-control form-control-sm";
}

const goToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

let inputClassStyles = new InputClassStyles();

module.exports = {inputClassStyles, goToTop}