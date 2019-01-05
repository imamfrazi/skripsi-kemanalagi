$(document).ready(function() {
	$(".sidenav").sidenav(); // mobile menu
	$(".dropdown-trigger").dropdown({
		coverTrigger: false,
		constrainWidth: false,
		closeOnClick: false
	}); // cek pemesanan
	$(".datepicker").datepicker({
		minDate: new Date()
	}); // tanggal berangkat
	$(".tooltipped").tooltip(); // tooltip fasilitas
	$(".modal").modal({
		dismissible: false
	}); // modal kursi
	$("select").formSelect(); // pilih jenis kelamin
	$(".collapsible").collapsible(); // list f.a.q.

	// $(".form-control")
	// 	.bind("blur", function() {
	// 		$(this)
	// 			.parent()
	// 			.next("div")
	// 			.find(".form_helper")
	// 			.hide();
	// 	})
	// 	.bind("focus", function() {
	// 		$(this)
	// 			.parent()
	// 			.next("div")
	// 			.find(".form_helper")
	// 			.show();
	// 	});
});

window.onscroll = function() {
	myFunction();
};
var searchbox = document.getElementById("searchBox");
var sticky = searchbox.offsetTop;
function myFunction() {
	if (window.pageYOffset >= sticky) {
		searchbox.classList.add("sticky");
		searchbox.style.width = "70%";
	} else {
		searchbox.classList.remove("sticky");
		searchbox.style.width = "100%";
	}
}
