
	findAll(options) {
		var dataTemp = [];
		for(var i in this.data) {
			var status = true;

			for(var i2 in options) {
				var attr = this.getDataAttr(options[i2].attr, i);

				if(!this.condition(options[i2].op, attr, options[i2].value)) {
					status = false;
					break;
				}
			}

			if(status)
				dataTemp.push(i);
		}
		return dataTemp;
	}

	condition(op, key, value) {
		switch(op) {
			case "==":
				return (key == value);
			case ">=" :
				return (key >= value);
			case ">" :
				return (key > value);
			case "<=" :
				return (key <= value);
			case "<" :
				return (key < value);
			case "[]":
				return (value.indexOf(key) != -1);
			case "contain":
				return (key.indexOf(value) != -1);
			case "path":
				return (key.indexOf(value) != -1 && key.split('/').length == value.split('/').length);
		}
		return false;
	}

	getDataAttr(v, i) {
		if(i === undefined)
			return undefined;
		var temp = v.split('.');
		
		var attr;
		if(i == -1)
			attr = this.tempData;
		else
			attr = this.data[i];
		
		if(temp.length == 1)
			attr = attr.content;

		for(var i3 in temp)
			attr = attr[temp[i3]];

		return attr;
	}
