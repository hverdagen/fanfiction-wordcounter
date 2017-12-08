window.addEventListener('load', function() {
  loadOptions();
  document.getElementById("saveoptions").addEventListener("click", saveOptions);
});

function loadOptions() {
	chrome.storage.sync.get(['truncate'], function(items) {
    	var truncate = items["truncate"];
    	console.log("Got settings with truncate: " + truncate);

		if (truncate == undefined || (truncate != "true" && truncate != "false")) {
			truncate = "true";
		}

		var select = document.getElementById("truncatebuttons");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
				if (child.value == truncate) {
				child.checked = true;
				break;
			}
		}
	});;
}

function saveOptions() {
	var truncate = document.querySelector('input[name="truncatebutton"]:checked').value;
	console.log(truncate);
	chrome.storage.sync.set({'truncate': truncate,}, function() {
      console.log("Set settings with truncate: " + truncate);
    });
}
