
	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Adres çubuğunda yazan adrese göre sayfa için hazırlık yapar. 
	 * 		Bir veri kullanılacaksa veri ile ilgili hazırlıkları, dizin kullanılacaksa içerisindeki dosyalarla ilgili hazırlıklar yapılır.
	 * Örnek Adresler:
	 * 		.../list/_posts => Belirtilen yoldaki verileri listeler.
	 * 		.../edit/_posts/deneme.md => Belirtilen yoldaki dosyayı düzenler.
	 * 		.../save/_posts/deneme.md => Belirtilen yoldaki dosyaya değişiklikleri kaydeder.
	 * Kullanılan Değişkenler: 
	 * ------------------------------------------------------------------------
	 */	
	navigation() {
		$('.page').hide();
		var location = window.location.href.split("#");

		if(location.length < 2)
			return;
		location = location[1];

		var locationArray = location.split("/");

		if(locationArray.length < 2)
			return;

		switch(locationArray[0]) {
			case "list":
				locationArray.shift(); 
				this.navigationList(locationArray.join('/'));
				$('#list').show();
				break;
			case "edit":
				locationArray.shift(); 
				this.navigationEdit(locationArray.join('/'));
				$('#edit').show();
				break;
			case "new":
				locationArray.shift(); 
				this.navigationEdit(locationArray.join('/'), true);
				$('#edit').show();
				break;
			case "save":
				locationArray.shift(); 
				this.navigationSave(locationArray.join('/'));
				$('#loader').show();
				break;
			case "saveNewFile":
				locationArray.shift(); 
				this.navigationSave(locationArray.join('/'), true);
				$('#loader').show();
				break;
			case "delete":
				locationArray.shift(); 
				this.navigationDelete(locationArray.join('/'));
				break;
			case "toggle":
				locationArray.shift(); 
				this.navigationToggle(locationArray.join('/'));
				break;
			default:
				if(locationArray[0].substr(-2) == '()') {
					this[locationArray[0].substr(0, locationArray[0].length - 2)](locationArray.join('/'));
				}
				else
					console.log(locationArray[0] + " sayfası bulunamadı.");
		}
	}
