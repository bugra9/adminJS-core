
	inputInit(obj) {
		$('.ui.dropdown.search.addition').dropdown({
			allowAdditions: true
		});
		$('.ui.dropdown:not(.addition)').dropdown();
		$('.ui.calendar').calendar({
			monthFirst: false,
			ampm: false,
			today: true,
			text: {
				days: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
				months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
				monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
				today: 'Bugün',
				now: 'Şu an',
				am: 'ÖÖ',
				pm: 'ÖS'
			}
		});

		//simplemde.toggleFullScreen();


	}
	