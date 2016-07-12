var dbUrl='localhost/shail';
var collections=['books'];
var db=require('mongojs').connect(dbUrl,collections);

function book(bookid,bookname,booktype){
	this.bookid=bookid;
	this.bookname=bookname;
	this.booktype=booktype;
}
db.books.ensureIndex({bookid:1},{unique:true});

var book1=new book(1,'java hello world','programming');
db.books.save(book1);

var book2=new book(2,'java expert','programming');
db.books.save(book2);

var book3=new book(3,'java in action','programming');
db.books.save(book3);

var book4=new book(2,'java expert','programming');
db.books.save(book2);
