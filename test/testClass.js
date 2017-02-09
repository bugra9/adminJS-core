class TestClass extends AdminJS {
    constructor(settings = {}) {
        super(settings);
        this.function = [];
        this.buffer = [];
    }
    inputInit(obj) {
    }
    navigation() {
        this.function.push("navigation");
        super.navigation();
    }
    write(str, s, status = false) {
        this.function.push("write");
        this.buffer.push(str);
    }
    loadMenu() {
        this.function.push("loadMenu");
        this.menu = [
            {
            title: "Yazar",
            path: "list/_other/author/",
            color: "teal",
            count: "25"
            },
            {
            html: '<div class="ui  small header center aligned inverted">Advanced</div>'
            },
            {
            title: "Extensions",
            path: "list/_extension/",
            color: "pink",
            count: "12"
            }
        ];
    }
    loadOption() {
        this.options = {
            "/": [
                {
                    attr: "file.path",
                    title: "Konum",
                    list: {
                        show: false
                    },
                    edit: {
                        order: 1,
                        section: 2
                    },
                    input: {
                        type: "text" 
                    }
                },
                {
                    attr: "title",
                    title: "Başlık",
                    list: {
                        show: true
                    },
                    edit: {
                        order: 1
                    },
                    input: {
                        type: "text" 
                    }
                },
                {
                    attr: "content",
                    title: "İçerik",
                    list: {
                        show: false
                    },
                    edit: {
                        type: 2,
                        order: 1,
                        section: 3
                    },
                    input: {
                        type: "text",
                        wysiwyg: true
                    }
                }
            ]
        };
    }
    loadData() {
        this.data = [
            {
                file: {path: "a.md"},
                content:  {
                    title: "Deneme",
                    a1: "deneme a1",
                    content: "Deneme Yazısı"
                }
            },
            {
                file: {path: "b/a.md"},
                content:  {
                    title: "Deneme2",
                    b1: "aa",
                    content: "Deneme Yazısı2"
                }
            },
            {
                file: {path: "b/b.md"},
                content:  {
                    title: "Deneme3",
                    b1: "dd",
                    content: "Deneme Yazısı3"
                }
            }
        ];
    }
}
var testClass = new TestClass({test: "test"});
testClass.run();

if(window.chai) {
    var expect = chai.expect;
    var assert = chai.assert;
}