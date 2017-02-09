
	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: İlgili çıktıları ilgili yerlere yazılmasını sağlar.
	 * ------------------------------------------------------------------------
	 */ 
	write(str, s, status = false) {
		if(status)
			$(s).html(str);
		else
			$(s).append(str);
	}

	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Hata ayıklama için verilen bilgileri uçbirime basar.
	 * ------------------------------------------------------------------------
	 */ 
	log(message, level) {
		if(this.settings.debug >= level)
			console.log(message);
	}

	getDirs(v) {
		var temp2 = {};
		var len = v.split('/').length;
		for(var i in this.data) {
			var temp = this.data[i].file.path.split('/').length;
			if(this.data[i].file.path.indexOf(v) === 0 && temp == len + 1)
				temp2[this.data[i].file.path.substring(v.length, this.data[i].file.path.lastIndexOf('/'))] = 0;
		}
		var temp3 = [];
		for(i in temp2)
			temp3.push(i);
		return temp3;
	}
	