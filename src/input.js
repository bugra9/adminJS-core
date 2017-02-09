
	/**
	 * ------------------------------------------------------------------------
	 * Açıklama: Hem listeleme sayfasında hem de düzenleme sayfasında özelliklere ait girişlerin nasıl görüleceği belirtilir.
	 * Türler: 
	 * 		Text: Eğer satır sayısı tanımlanmış ve birden büyükse textarea, değilse text input gösterecek şekilde ayarlanır.
	 *   	Select: Sabit seçeneklere sahipse bunlar değilse ilgili yer ile bağlantı kurulup oradaki veriler seçenek olarak listelenir.
	 * ------------------------------------------------------------------------
	 */ 
	
	
	templateInput(attr, value, type) {
		let temp = {list: "", edit: ""};
		let temp2 = '';
		switch(attr.input.type) {
			case "text":
				if(value === undefined)
					value = "";
				// List
				temp.list = '<td>' + value + '</td>';
				
				// Edit
				var class2="";
				if(attr.input.wysiwyg)
					class2="mdEditor";
				if((attr.input.rows && attr.input.rows > 1) || attr.input.wysiwyg)
					temp.edit = `
<div class="field">
	<label>${attr.title}</label>
	<textarea class="${class2}" rows="${attr.input.rows}" name="${attr.attr}">${value}</textarea>
</div>`;
				else
					temp.edit = `
<div class="field">
	<label>${attr.title}</label>
	<input type="text" name="${attr.attr}" value="${value}" />
</div>`;
				
				break;
			case "date":
				// List
				var date = new Date(value);
				var month = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
							"Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
				temp.list = '<td title="'+ value +'">'+ date.getDate() +' '+ month[date.getMonth()] +' '+ date.getFullYear() +'</td>';

				// Edit
				temp.edit = `
<div class="field">
	<label>${attr.title}</label>
	<div class="ui calendar">
		<div class="ui input left icon">
			<i class="calendar icon"></i>
			<input type="datetime" placeholder="Zaman" name="${attr.attr}" value="${value}">
		</div>
	</div>
</div>`;
				
				break;
			case "select":
				// List
				if(attr.input.isRelated && value !== "") {
					var options = attr.input.options.slice(0);
					var op = "==";
					if(Array.isArray(value))
						op = "[]";
					options.push({
						attr: attr.input.value,
						value: value,
						op: op
					});
					var out = this.findAll(options);
					if(out.length === 0)
						temp2 = '';
					else if(out.length == 1)
						temp2 = this.data[out[0]].content.title;
					else {
						temp2 = '';
						for(var i in out)
							temp2 += '<div class="ui label">'+ this.data[out[i]].content.title +'</div>';
					}
				}
				else
					temp2 = value;
				temp.list = '<td>' + temp2 + '</td>';

				// Edit
				if(attr.input.multiple)
					temp2 = 'multiple';
				else
					temp2 = '';
				temp.edit = `
<div class="field">
	<div class="leftRight">
		<label>${attr.title}</label>
		<div><i class="add icon green link"></i></div>
	</div>
	<select class="ui selection dropdown search" name="${attr.attr}" ${temp2}><option value="">Seç</option>`;
				if(!attr.input.isRelated) {
					for(let i in attr.input.options) {
						if(i == value) 
							temp2 = "selected";
						else 
							temp2 = "";
						temp.edit += `<option value="${i}" ${temp2}>${attr.input.options[i]}</option>`;	
					}
				}
				else {
					let temp3 = this.findAll(attr.input.options);
					for(let i in temp3) {
						if(!Array.isArray(value))
							value = [value];

						if(value !== undefined && value.indexOf(this.data[temp3[i]].content[attr.input.value]) != -1) 
							temp2 = "selected";
						else 
							temp2 = "";
						temp.edit += `<option value="${this.data[temp3[i]].content[attr.input.value]}" ${temp2}>${this.data[temp3[i]].content.title}</option>`;	
					}
				}
				temp.edit += `
	</select>
</div>`;

				break;
		}
		return temp[type];
	}
	