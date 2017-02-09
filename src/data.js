	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: İşlenecek verilerin tanıtılması yapılır.
	 * Kullanılan Değişkenler: data, menu, options
	 * ------------------------------------------------------------------------
	 */
	loadData() {
		this.log("Veriler yükleniyor", 2);

		/*
			------------------------------------------------------------------------
			Açıklama: Tüm dosyalara ait veriler buraya yazılır. Dizinler burada belirtilmez ve dosya yolundan otomatik çıkarılır.
			Örnek: 	[
						{
							file: {
								path: "_posts/deneme.md",
								sha: "dasfawe...",
								size: 12,
								type: markdown // diğer seçenekler => image|text|yml|js|css|... 
							},
							content: {
								title: "Deneme Makalesi",
								date: ...,
								permalink: "deneme",
								yazar: "...",
								content: "..."
							}
						},
						...
					]
			------------------------------------------------------------------------
		*/
		this.data = [];
	}

	loadMenu() {
		/*
			------------------------------------------------------------------------
			Açıklama: Menüde listelenmesi istenen veriler buraya girilir.
			Örnek: 	[
						{
							title: "Posts",
							path: "/_posts/",
							color: "blue",
							count: "5192"
						},
						...
					]
			------------------------------------------------------------------------
		*/
		this.menu = [];
	}

	loadOption() {
		/*
			------------------------------------------------------------------------
			Açıklama: Dizinler için nasıl tepki verileceği ayarlanır yani dizinlerin özelleştirmesi burada yapılır. 
				Alt dizinler üst dizinlerin özelliklerini ezer.
			Örnek: 	{
						"/": [
							{
								attr: "title",
								title: "Başlık",
								showList: false,
								input: {
									type: "text" 
								}
							}
						],
						"/_posts/": [
							{
								attr: "title",
								title: "Makale Başlığı",
								showList: true,
								input: {
									type: "text" 
								}
							},
							{
								attr: "categories",
								title: "Kategori",
								showList: true,
								input: {
									type: "select",
									multi: false,
									isRelated: true,
									relatedPath: "/_category/",
									query: {},
									valueAttr: "code"
								}
							}
						],
						...
					}
			Giriş Türleri:
				Text: Düz metin girişi için kullanılır.
					rows: Alanın kaç satırdan oluşacağı belirtilir. Belirtilmediği takdirde bir olarak değerlendirilir.
				Select | !isRelated: Seçenekleri belli olan seçim kutusu için kullanılır.
					multiple: birden fazla seçim yapılıp yapılamayacağı belirtilir.
					options: Seçim kutusunun seçenekleri buraya yazılır. Örn: { key: value, key2: value2}
				Select | isRelated: Seçenekleri başka bir dizine bağlı olup değişebilen seçim kutusu için kullanılır.
					multi: birden fazla seçim yapılıp yapılamayacağı belirtilir.
					relatedPath: Hangi dizine bağlı olduğu yazılır.
					query: Bağlı olduğu dizin altındaki verilerde eleme yapmak için kullanılır. Örn: rengi kırmızı ve boyutu 3kb'dan fazla olanlar
		 			valueAttr: Seçilen verinin hangi özelliği değer/sonuç için kullanılacağı belirtilir.
		 		Date: Zaman seçimi için kullanılır.
		 		Assets: Herhangi bir dosya seçimi için kullanılır.
		 			path: Hangi dizinden seçim yapılacağı belirtilir.
		 			type: image | file
			------------------------------------------------------------------------
		*/
		this.options = {};
	}