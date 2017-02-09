
	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: İlgili tetiklemelerin yapıldığı alandır.
	 * ------------------------------------------------------------------------
	 */
	event() {
		let _this = this;
		window.addEventListener("hashchange", function() { _this.navigation(); }, false);
		this.navigation();
	}
	