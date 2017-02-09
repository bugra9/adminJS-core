	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Menü yapısını oluşturur ve ilgili yere yazdırır.
	 * ------------------------------------------------------------------------
	 */ 
	createMenu() {
		this.log("Menü Oluşturuluyor", 2);

		this.log("====== Menü Nesnesi =====", 2);
		this.log(this.menu, 2);

		let temp = '';
		for(let i in this.menu)
			if(this.menu[i].html)
				temp += this.menu[i].html;
			else
				temp += `
					<a class="item" href="#${this.menu[i].path}">
						${this.menu[i].title} 
						<div class="ui left pointing label ${this.menu[i].color}">${this.menu[i].count}</div>
					</a>`;
		this.write(temp, '#menu');

		this.log("Menü oluşturuldu", 2);
	}