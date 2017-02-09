/**
 * AdminJS v0.1
 *
 * @link   https://github.com/bugra9/adminJS
 * @author bugra9 https://github.com/bugra9
 * @license GPLv3
 */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminJS = function () {
	/**
  * ------------------------------------------------------------------------
  * Açıklama: Parametre olarak ayarları içeren bir nesne alır.
  * Ayarlar: {
  * 				debug (0) [0, 1, 2]: Hata ayıklamayı ileti gösterim sıklık seviyesi ayarlanır.
  * 			}
  * 	Yapılacaklar: 
  * ------------------------------------------------------------------------
  */
	function AdminJS() {
		var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, AdminJS);

		/*
  	-------------------------------------------------------------------
  	Ayarlar Oluşturuluyor. 
  	Önce varsayılan ayarlar atanıyor. 
  	Daha sonra parametre olarak alınanlar varsayılan parametrelerin üzerine yazılıyor.
  	-------------------------------------------------------------------
  */
		this.settings = {
			debug: 0
		};
		for (var key in settings) {
			this.settings[key] = settings[key];
		}this.log("Ayarlar Yüklendi.", 2);
		/*
  	-------------------------------------------------------------------
  	Yazılım başlatılıyor.
  	-------------------------------------------------------------------
  */
		this.log("Yazılım Başlatılıyor...", 2);

		// Geçici olarak bağlanmak için bu kodları ekleyelim.
		var temp = window.location.href.split("#");
		if (temp.length > 1) temp = temp[1].split('/');

		if (temp[0] == 'connect') {
			localStorage.token = temp[1];
			window.location.href = '#list/_posts/';
		}
	}

	_createClass(AdminJS, [{
		key: "run",
		value: function run() {
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
		/**
   * ------------------------------------------------------------------------
   * Açıklama: Menü yapısını oluşturur ve ilgili yere yazdırır.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "createMenu",
		value: function createMenu() {
			this.log("Menü Oluşturuluyor", 2);

			this.log("====== Menü Nesnesi =====", 2);
			this.log(this.menu, 2);

			var temp = '';
			for (var i in this.menu) {
				if (this.menu[i].html) temp += this.menu[i].html;else temp += "\n\t\t\t\t\t<a class=\"item\" href=\"#" + this.menu[i].path + "\">\n\t\t\t\t\t\t" + this.menu[i].title + " \n\t\t\t\t\t\t<div class=\"ui left pointing label " + this.menu[i].color + "\">" + this.menu[i].count + "</div>\n\t\t\t\t\t</a>";
			}this.write(temp, '#menu');

			this.log("Menü oluşturuldu", 2);
		}
		/**
   * ------------------------------------------------------------------------
   * Açıklama: İşlenecek verilerin tanıtılması yapılır.
   * Kullanılan Değişkenler: data, menu, options
   * ------------------------------------------------------------------------
   */

	}, {
		key: "loadData",
		value: function loadData() {
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
	}, {
		key: "loadMenu",
		value: function loadMenu() {
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
	}, {
		key: "loadOption",
		value: function loadOption() {
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

		/**
   * ------------------------------------------------------------------------
   * Açıklama: İlgili tetiklemelerin yapıldığı alandır.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "event",
		value: function event() {
			var _this = this;
			window.addEventListener("hashchange", function () {
				_this.navigation();
			}, false);
			this.navigation();
		}
	}, {
		key: "findAll",
		value: function findAll(options) {
			var dataTemp = [];
			for (var i in this.data) {
				var status = true;

				for (var i2 in options) {
					var attr = this.getDataAttr(options[i2].attr, i);

					if (!this.condition(options[i2].op, attr, options[i2].value)) {
						status = false;
						break;
					}
				}

				if (status) dataTemp.push(i);
			}
			return dataTemp;
		}
	}, {
		key: "condition",
		value: function condition(op, key, value) {
			switch (op) {
				case "==":
					return key == value;
				case ">=":
					return key >= value;
				case ">":
					return key > value;
				case "<=":
					return key <= value;
				case "<":
					return key < value;
				case "[]":
					return value.indexOf(key) != -1;
				case "contain":
					return key.indexOf(value) != -1;
				case "path":
					return key.indexOf(value) != -1 && key.split('/').length == value.split('/').length;
			}
			return false;
		}
	}, {
		key: "getDataAttr",
		value: function getDataAttr(v, i) {
			if (i === undefined) return undefined;
			var temp = v.split('.');

			var attr;
			if (i == -1) attr = this.tempData;else attr = this.data[i];

			if (temp.length == 1) attr = attr.content;

			for (var i3 in temp) {
				attr = attr[temp[i3]];
			}return attr;
		}

		/**
   * ------------------------------------------------------------------------
   * Açıklama: Hem listeleme sayfasında hem de düzenleme sayfasında özelliklere ait girişlerin nasıl görüleceği belirtilir.
   * Türler: 
   * 		Text: Eğer satır sayısı tanımlanmış ve birden büyükse textarea, değilse text input gösterecek şekilde ayarlanır.
   *   	Select: Sabit seçeneklere sahipse bunlar değilse ilgili yer ile bağlantı kurulup oradaki veriler seçenek olarak listelenir.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "templateInput",
		value: function templateInput(attr, value, type) {
			var temp = { list: "", edit: "" };
			var temp2 = '';
			switch (attr.input.type) {
				case "text":
					if (value === undefined) value = "";
					// List
					temp.list = '<td>' + value + '</td>';

					// Edit
					var class2 = "";
					if (attr.input.wysiwyg) class2 = "mdEditor";
					if (attr.input.rows && attr.input.rows > 1 || attr.input.wysiwyg) temp.edit = "\n<div class=\"field\">\n\t<label>" + attr.title + "</label>\n\t<textarea class=\"" + class2 + "\" rows=\"" + attr.input.rows + "\" name=\"" + attr.attr + "\">" + value + "</textarea>\n</div>";else temp.edit = "\n<div class=\"field\">\n\t<label>" + attr.title + "</label>\n\t<input type=\"text\" name=\"" + attr.attr + "\" value=\"" + value + "\" />\n</div>";

					break;
				case "date":
					// List
					var date = new Date(value);
					var month = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
					temp.list = '<td title="' + value + '">' + date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear() + '</td>';

					// Edit
					temp.edit = "\n<div class=\"field\">\n\t<label>" + attr.title + "</label>\n\t<div class=\"ui calendar\">\n\t\t<div class=\"ui input left icon\">\n\t\t\t<i class=\"calendar icon\"></i>\n\t\t\t<input type=\"datetime\" placeholder=\"Zaman\" name=\"" + attr.attr + "\" value=\"" + value + "\">\n\t\t</div>\n\t</div>\n</div>";

					break;
				case "select":
					// List
					if (attr.input.isRelated && value !== "") {
						var options = attr.input.options.slice(0);
						var op = "==";
						if (Array.isArray(value)) op = "[]";
						options.push({
							attr: attr.input.value,
							value: value,
							op: op
						});
						var out = this.findAll(options);
						if (out.length === 0) temp2 = '';else if (out.length == 1) temp2 = this.data[out[0]].content.title;else {
							temp2 = '';
							for (var i in out) {
								temp2 += '<div class="ui label">' + this.data[out[i]].content.title + '</div>';
							}
						}
					} else temp2 = value;
					temp.list = '<td>' + temp2 + '</td>';

					// Edit
					if (attr.input.multiple) temp2 = 'multiple';else temp2 = '';
					temp.edit = "\n<div class=\"field\">\n\t<div class=\"leftRight\">\n\t\t<label>" + attr.title + "</label>\n\t\t<div><i class=\"add icon green link\"></i></div>\n\t</div>\n\t<select class=\"ui selection dropdown search\" name=\"" + attr.attr + "\" " + temp2 + "><option value=\"\">Se\xE7</option>";
					if (!attr.input.isRelated) {
						for (var _i in attr.input.options) {
							if (_i == value) temp2 = "selected";else temp2 = "";
							temp.edit += "<option value=\"" + _i + "\" " + temp2 + ">" + attr.input.options[_i] + "</option>";
						}
					} else {
						var temp3 = this.findAll(attr.input.options);
						for (var _i2 in temp3) {
							if (!Array.isArray(value)) value = [value];

							if (value !== undefined && value.indexOf(this.data[temp3[_i2]].content[attr.input.value]) != -1) temp2 = "selected";else temp2 = "";
							temp.edit += "<option value=\"" + this.data[temp3[_i2]].content[attr.input.value] + "\" " + temp2 + ">" + this.data[temp3[_i2]].content.title + "</option>";
						}
					}
					temp.edit += "\n\t</select>\n</div>";

					break;
			}
			return temp[type];
		}
	}, {
		key: "inputInit",
		value: function inputInit(obj) {
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
	}, {
		key: "defaultType",
		value: function defaultType(attr, value) {
			if (Array.isArray(value)) return {
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
			};else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') ;else return {
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

	}, {
		key: "getType",
		value: function getType(v) {
			//console.log('v: ', v);
			var dataTemp = {};
			for (var i in this.options) {
				if (v.indexOf(i) != -1) for (var i2 in this.options[i]) {
					dataTemp[this.options[i][i2].attr] = this.options[i][i2];
				}
			}
			return dataTemp;
		}

		/**
   * ------------------------------------------------------------------------
   * Açıklama: Listeleme yapılacak verilerin sütunlarının analizini yapar.
   * Ne kadar çok kullanılmış diye.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "getAttrList",
		value: function getAttrList(index, type) {
			var ret = [];
			var count = {};
			for (var i in index) {
				var data2 = this.data[index[i]];
				for (var i2 in data2.content) {
					if (count[i2] === undefined) count[i2] = 1;else ++count[i2];
				}
			}
			count['file.path'] = index.length;
			// Sıralayalım.
			var sortable = [];
			for (i in count) {
				sortable.push([i, count[i]]);
			}sortable.sort(function (a, b) {
				return a[1] - b[1];
			});

			for (i in sortable) {
				sortable[i][1] = sortable[i][1] / index.length * 100;
				if (sortable[i][1] > 50 && !(type[sortable[i][0]] && type[sortable[i][0]].list.show == false) && ret.length < 10) ret.push(sortable[i][0]);
			}
			return ret;
		}

		/**
   * ------------------------------------------------------------------------
   * Açıklama: İlgili çıktıları ilgili yerlere yazılmasını sağlar.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "write",
		value: function write(str, s) {
			var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			if (status) $(s).html(str);else $(s).append(str);
		}

		/**
   * ------------------------------------------------------------------------
   * Açıklama: Hata ayıklama için verilen bilgileri uçbirime basar.
   * ------------------------------------------------------------------------
   */

	}, {
		key: "log",
		value: function log(message, level) {
			if (this.settings.debug >= level) console.log(message);
		}
	}, {
		key: "getDirs",
		value: function getDirs(v) {
			var temp2 = {};
			var len = v.split('/').length;
			for (var i in this.data) {
				var temp = this.data[i].file.path.split('/').length;
				if (this.data[i].file.path.indexOf(v) === 0 && temp == len + 1) temp2[this.data[i].file.path.substring(v.length, this.data[i].file.path.lastIndexOf('/'))] = 0;
			}
			var temp3 = [];
			for (i in temp2) {
				temp3.push(i);
			}return temp3;
		}
	}, {
		key: "navigationDelete",
		value: function navigationDelete(v) {
			var index = this.findAll([{
				attr: "file.path",
				value: v,
				op: "=="
			}])[0];
			this.data.splice(index, 1);
			this.deleteData(v);

			window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/') + 1);
		}
	}, {
		key: "deleteData",
		value: function deleteData(v) {}

		// Düzenleme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.

	}, {
		key: "navigationEdit",
		value: function navigationEdit(v) {
			var newFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			$('#back').attr('href', '#list/' + v.substr(0, v.lastIndexOf('/') + 1));
			$('#attrTab').click();

			if (newFile) $('#saveButton').attr('href', '#saveNewFile/');else $('#saveButton').attr('href', '#save/' + v);

			var index;
			var data;
			if (newFile) {
				index = -1;
				this.tempData = data = {
					file: {
						path: "yeniDosya.md"
					},
					content: {}
				};
			} else {
				index = this.findAll([{
					attr: "file.path",
					value: v,
					op: "=="
				}])[0];
				data = this.data[index];
			}
			//console.log("data", data);

			var path = v.split('/');
			path.pop();
			path = path.join('/') + '/';
			var type = this.getType('/' + path);
			//console.log("type", type);

			if (type['file.path'] === undefined) type['file.path'] = this.defaultType('file.path', '');

			var attr = [[], [], [], []];
			attr[2].push('file.path');
			for (var i in data.content) {
				if (type[i] === undefined) attr[0].push(i);else if (type[i].edit.section !== undefined) attr[type[i].edit.section].push(i);else attr[1].push(i);
			}

			for (i in type) {
				if (data.content[i] === undefined && type[i].edit !== undefined && (type[i].edit.type == 2 || type[i].edit.type == 1 && newFile)) if (type[i].edit.section !== undefined) attr[type[i].edit.section].push(i);else attr[1].push(i);
			}
			//console.log("attr", attr);

			var temp2 = '';
			for (i in attr[1]) {
				temp2 += this.templateInput(type[attr[1][i]], this.getDataAttr(attr[1][i], index), 'edit');
			}
			this.write('<h4 class="ui dividing header">Genel Bilgiler</h4>' + temp2, '#edit1', true);

			temp2 = '';
			for (i in attr[2]) {
				temp2 += this.templateInput(type[attr[2][i]], this.getDataAttr(attr[2][i], index), 'edit');
			}
			this.write('<h4 class="ui dividing header">Yayınlama Bilgileri</h4>' + temp2, '#edit2', true);

			temp2 = '';
			for (i in attr[0]) {
				temp2 += this.templateInput(this.defaultType(attr[0][i], this.getDataAttr(attr[0][i], index)), this.getDataAttr(attr[0][i], index), 'edit');
			}
			this.write(temp2, '#edit0', true);

			temp2 = '';
			for (i in attr[3]) {
				temp2 += this.templateInput(type[attr[3][i]], this.getDataAttr(attr[3][i], index), 'edit');
			}
			this.write(temp2, '#edit3', true);

			this.inputInit({ url: v });
		}

		// Listeleme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.

	}, {
		key: "navigationList",
		value: function navigationList(v) {
			$('#newFile').attr('href', '#new/' + v);
			//console.log("navigationList: ", v);
			var temp = this.findAll([{
				attr: "file.path",
				value: v,
				op: "path"
			}]);
			//console.log('temp: ', temp);

			var type = this.getType('/' + v);
			//console.log('type: ', type);
			var attrList = this.getAttrList(temp, type);
			//console.log('attrList: ', attrList);

			var temp2 = '';
			for (var i in temp) {
				if (attrList.indexOf('title') == -1) temp2 += '<tr><td class="collapsing"><i class="file outline icon"></i> ' + this.data[temp[i]].file.path.split('/').pop() + '</td>';else temp2 += '<tr><td class="collapsing" title="' + this.data[temp[i]].file.path + '"><i class="file outline icon"></i></td>';

				for (var a in attrList) {
					if (type[attrList[a]] === undefined) type[attrList[a]] = {
						attr: attrList[a],
						title: attrList[a],
						list: {
							show: true
						},
						input: {
							type: "text"
						}
					};
					temp2 += this.templateInput(type[attrList[a]], this.getDataAttr(attrList[a], temp[i]), 'list');
				}
				var color = "green";
				if (this.data[temp[i]].file.path.split('/').pop().substr(0, 1) == '_') color = "red";
				temp2 += "<td class=\"right aligned collapsing\">\n\t\t\t\t\t\t\t\t<a href=\"#edit/" + this.data[temp[i]].file.path + "\"><i class=\"edit icon\"></i></a>\n\t\t\t\t\t\t\t\t<a href=\"#toggle/" + this.data[temp[i]].file.path + "\"><i class=\"circle icon " + color + "\"></i></a>\n\t\t\t\t\t\t\t\t<a href=\"#delete/" + this.data[temp[i]].file.path + "\"><i class=\"remove icon red\"></i></a>\n\t\t\t\t\t\t\t</td></tr>";
			}
			var tempHeader = '';
			for (var a in attrList) {
				if (type[attrList[a]] === undefined) tempHeader += '<th>' + attrList[a] + '</th>';else tempHeader += '<th>' + type[attrList[a]].title + '</th>';
			} //console.log(temp2);
			this.write('<tr><th></th>' + tempHeader + '<th>İşlemler</th></tr>', 'thead', true);
			this.write(temp2, 'tbody', true);

			var dirs = this.getDirs(v);
			temp = '';
			for (i in dirs) {
				temp += "\n<a class=\"item\" href=\"#list/" + v + dirs[i] + "/\">\n\t<i class=\"big folder icon\"></i>\n\t<div class=\"content\">\n\t\t<div class=\"header\">" + dirs[i] + "</div>\n\t</div>\n</a>";
			}this.write(temp, '#dirs', true);
		}

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

	}, {
		key: "navigation",
		value: function navigation() {
			$('.page').hide();
			var location = window.location.href.split("#");

			if (location.length < 2) return;
			location = location[1];

			var locationArray = location.split("/");

			if (locationArray.length < 2) return;

			switch (locationArray[0]) {
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
					if (locationArray[0].substr(-2) == '()') {
						this[locationArray[0].substr(0, locationArray[0].length - 2)](locationArray.join('/'));
					} else console.log(locationArray[0] + " sayfası bulunamadı.");
			}
		}

		// Kaydetme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.

	}, {
		key: "navigationSave",
		value: function navigationSave(v) {
			var newFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			console.log("save");
			var data = {};
			$('#edit :input').each(function () {
				if ($(this).attr('name') === undefined) return;

				if ($(this).attr('type') == 'datetime') {
					var date = new Date($(this).parents('.ui.calendar').calendar('get date'));
					date.setHours(date.getHours() + 3);
					date = date.toJSON();
					data[$(this).attr('name')] = date.substring(0, date.indexOf('T')) + ' ' + date.substring(date.indexOf('T') + 1, date.lastIndexOf(':'));
				} else data[$(this).attr('name')] = $(this).val();
			});
			//console.log("data", data);
			this.saveData(v, data, newFile);

			window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/') + 1);
		}
	}, {
		key: "saveData",
		value: function saveData(v, data) {
			var newFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		}
	}, {
		key: "navigationToggle",
		value: function navigationToggle(v) {
			var index = this.findAll([{
				attr: "file.path",
				value: v,
				op: "=="
			}])[0];
			var temp = this.data[index].file.path.split('/');
			var name = temp.pop();
			if (name.substr(0, 1) == '_') name = name.substr(1);else name = '_' + name;

			this.data[index].file.path = temp.join('/') + '/' + name;

			this.renameData(v, this.data[index].file.path);

			window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/') + 1);
		}
	}, {
		key: "renameData",
		value: function renameData(path, newPath) {}
	}]);

	return AdminJS;
}();