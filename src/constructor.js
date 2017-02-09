
	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Parametre olarak ayarları içeren bir nesne alır.
	 * Ayarlar: {
	 * 				debug (0) [0, 1, 2]: Hata ayıklamayı ileti gösterim sıklık seviyesi ayarlanır.
	 * 			}
	 * 	Yapılacaklar: 
	 * ------------------------------------------------------------------------
	 */
	constructor(settings = {}) {
		/*
			-------------------------------------------------------------------
			Ayarlar Oluşturuluyor. 
			Önce varsayılan ayarlar atanıyor. 
			Daha sonra parametre olarak alınanlar varsayılan parametrelerin üzerine yazılıyor.
			-------------------------------------------------------------------
		*/
		this.settings = {
			debug: 0,
		};
		for(let key in settings)
			this.settings[key] = settings[key];

		this.log("Ayarlar Yüklendi.", 2);
		/*
			-------------------------------------------------------------------
			Yazılım başlatılıyor.
			-------------------------------------------------------------------
		*/
		this.log("Yazılım Başlatılıyor...", 2);

		// Geçici olarak bağlanmak için bu kodları ekleyelim.
		var temp = window.location.href.split("#");
		if(temp.length > 1)
			temp = temp[1].split('/');

		if(temp[0] == 'connect') {
			localStorage.token = temp[1];
			window.location.href = '#list/_posts/';
		}
	}

	run() {
		this.log("Veriler Yükleniyor", 2);
		this.loadData();
		this.loadMenu();
		this.loadOption();

		this.log("Menü Yükleniyor", 2);
		this.createMenu();

		this.log("Tetiklemeler yükleniyor", 2);
		this.event();

		this.log("Yazılım başarıyla başlatıldı.", 1);
	}