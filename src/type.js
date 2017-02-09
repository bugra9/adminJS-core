	
	defaultType(attr, value) {
		if(Array.isArray(value))
			return {
				attr: attr,
				title: attr,
				list: {
					show: true
				},
				input: {
					type: "select",
					isRelated: false,
					multiple: true,
					options: []
				}
			};
		else if(typeof value === 'object')
			;
		else
			return {
				attr: attr,
				title: attr,
				list: {
					show: true
				},
				input: {
					type: "text" 
				}
			};
	}

	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: 
	 * ------------------------------------------------------------------------
	 */ 
	getType(v) {
		//console.log('v: ', v);
		var dataTemp = {};
		for(var i in this.options) {
			if(v.indexOf(i) != -1)
				for(var i2 in this.options[i])
					dataTemp[this.options[i][i2].attr] = this.options[i][i2];
		}
		return dataTemp;
	}

	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Listeleme yapılacak verilerin sütunlarının analizini yapar.
	 * Ne kadar çok kullanılmış diye.
	 * ------------------------------------------------------------------------
	 */ 
	getAttrList(index, type) {
		var ret = [];
		var count = {};
		for(var i in index) {
			var data2 = this.data[index[i]];
			for(var i2 in data2.content) {
				if(count[i2] === undefined)
					count[i2] = 1;
				else
					++count[i2];
			}	
		}
		count['file.path'] = index.length;
		// Sıralayalım.
		var sortable = [];
		for (i in count)
		    sortable.push([i, count[i]]);
		sortable.sort(function(a, b) { return a[1] - b[1] });
		
		for(i in sortable) {
			sortable[i][1] = sortable[i][1] / index.length * 100;
			if(sortable[i][1] > 50 && !(type[sortable[i][0]] && type[sortable[i][0]].list.show == false) && ret.length < 10)
				ret.push(sortable[i][0]);
		}
		return ret;
	}