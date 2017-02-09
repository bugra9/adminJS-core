
	// Kaydetme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.
	navigationSave(v, newFile = false) {
		console.log("save");
		var data = {};
		$('#edit :input').each(function() {
			if($(this).attr('name') === undefined)
				return;
			
			if($(this).attr('type') == 'datetime') {
				var date = new Date($(this).parents('.ui.calendar').calendar('get date'));
				date.setHours(date.getHours() + 3);
				date = date.toJSON();
				data[$(this).attr('name')] = date.substring(0, date.indexOf('T'))+' '+date.substring(date.indexOf('T')+1, date.lastIndexOf(':'));
			}
			else
				data[$(this).attr('name')] = $(this).val();
		});
		//console.log("data", data);
		this.saveData(v, data, newFile);

		window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/')+1);
	}

	saveData(v, data, newFile = false) {

	}
