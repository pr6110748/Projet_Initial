/**
* import all modules
**/

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var sqlQuery = '';
const crypto = require("crypto");
// Importing module
const date = require('date-and-time');

/*
* parse all form data
*/
   app.use(bodyParser.urlencoded({ extended: true}));

   module.exports = app;
/*
*used for formatting dates
*/
var dateFormat = require('dateformat');
var currentDate = new Date();


/*
* view engine template parsing (ejs types)
*/

app.set('view engine','ejs');

/**
* import all related Javascript and css files to inject in our app urls
*/

app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

/**
* connect to the database
* root: Homework2023!
*/

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Homework2023!",
	database: "RESERVATION"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });

/**
* Global site title and base url
*/

const siteTitle = "Simple application";
const baseURL = "http://localhost:4000/";

/*
* Get all the existing booking
*/
app.get('/',function (req,res) {   
	
	sqlQuery = "SELECT * FROM reserve INNER JOIN client ON idClient = clientId INNER JOIN stay ON stayId = idstay"
	
	con.query(sqlQuery, function (err, result){
		res.render('pages/index',{
			siteTitle : siteTitle,
			pageTitle : "The reservation list",
			items : result
		});
		
	});

}); 



/*
* Get the add Booking page
*/

app.get('/booking/add/new',function (req,res) {
	
	/*
	* Get all the existing booking
	*/
	sqlQuery = "SELECT * FROM reserve INNER JOIN client ON idClient = clientId INNER JOIN stay ON stayId = idstay"		
	con.query(sqlQuery, function (err, result){
		res.render('pages/add-event.ejs',{
			siteTitle : siteTitle,
			pageTitle : "Adding of Booking",
			items : result
		});
	});

});


/*
* Get the add Booking page for old user
*/

app.get('/booking/add',function (req,res) {
	res.render('pages/add-event-old.ejs',{
        siteTitle : siteTitle,
        pageTitle : "Booking for old user"
    });

});


/*
* Get the error if the dates is not correct
*/
app.get('/error',function (req,res) {
	res.render('pages/Errors-Page.ejs',{
        siteTitle : siteTitle,
        pageTitle : "Error page"
    });

});

/* 
* redirect to the success if not error
*/
app.get('/success/:id',function (req,res) {
	res.render('pages/success-page.ejs',{
		siteTitle : siteTitle,
		pageTitle : "Successfully reserve the presidential suite",
	});
						
});


/*
* post a new booking to the database 
*/
app.post('/booking/add/new',function (req,res) {

	/* 
	* 	The ID variables
	*/
	var clientId = crypto.randomInt(10000, 90000);
	var guestId1 = crypto.randomInt(10000, 90000);
	var guestId2 = crypto.randomInt(10000, 90000);
	var stayId = crypto.randomInt(10000, 90000);
	var reservationId = crypto.randomInt(10000, 90000);
	var startDateR = req.body.startDate;
	var bookingEndDay = date.addDays(new Date(startDateR), req.body.countClient);


	//The squeries sql variables
	/* 
	* get the client table
	*/
	var client = "INSERT INTO client (idClient, firstName, lastName,email) VALUES (";
		client += " '"+ clientId+"',";
		client += " '"+req.body.firstNameP+"',";
		client += " '"+req.body.lastNameP+"',";
		client += " '"+req.body.emailP+"')";

	/* 
	* get the stay table
	*/
	var stay = "INSERT INTO stay (idstay, startDate, endDate) VALUES (";
		stay += " '"+ stayId+"',";
		stay += " '"+req.body.startDate+"',";
		stay += " '"+dateFormat(bookingEndDay, "UTC:yyyy-mm-dd'T'HH:MM")+"')";


	/* 
	* get the guest table of all the guests
	*/
	var guest1 = "INSERT INTO guest (idguest, firstName, lastName) VALUES (";
		guest1 += " '"+ guestId1+"',";
		guest1 += " '"+req.body.firstNameG1+"',";
		guest1 += " '"+req.body.lastNameG1+"')";
		
					
	var guest2 = "INSERT INTO guest (idguest, firstName, lastName) VALUES (";
		guest2 += " '"+ guestId2+"',";
		guest2 += " '"+req.body.firstNameG1+"',";
		guest2 += " '"+req.body.lastNameG1+"')";


	/* 
	* get the invitation table of all the guests
	*/
	var invitation1 = "INSERT INTO invitation (clientId, guestId) VALUES (";
		invitation1 += " '"+ clientId+"',";
		invitation1 += " '"+guestId1+"')";

	var invitation2 = "INSERT INTO invitation (clientId, guestId) VALUES (";
		invitation2 += " '"+ clientId+"',";
		invitation2 += " '"+guestId2+"')";


	/* 
	* Make a reservation
	*/
	var reservation = "INSERT INTO reserve (idreserve, countDay, countClient, clientId, stayId) VALUES (";
		reservation += " '"+ reservationId+"',";
		reservation += " '"+ req.body.countDay+"',";
		reservation += " '"+ req.body.countClient+"',";
		reservation += " '"+ clientId+"',";
		reservation += " '"+stayId+"')";



	/* 
	* check if startdate is correct the booking list
	*/
	sqlQuery = "SELECT * FROM reserve INNER JOIN client ON idClient = clientId INNER JOIN stay ON stayId = idstay";	
	con.query(sqlQuery, function (err, result){

		/* 
		* Calling the checkBookingDates() method for check dates
		*/
		var isCorrect = checkBookingDates(result, startDateR, bookingEndDay);


		/* 
		* Calling the checkBookingDates() method for check dates
		*/
		var validate = saveBookingData(isCorrect, client, stay, guest1, guest2, invitation1, invitation2, reservation, req.body.countClient);

		if (validate){
			/* 
			* redirect to the success if not error
			*/
			res.redirect('/success/'+reservationId);
		} else {
			/* 
			* redirect to the error if error
			*/
			res.redirect('/error');
		}
		
	});
	
});	


/* 
* Function that save the booking informations to the database
*
* isCorrect: for show if the booking is validate
* client: the client table
* stay: the client table
* guest1, guest2: the guest table
* invitation1, invitation2: the invitation table
* reservation: the reservation table
*/
function saveBookingData(isCorrect, client, stay, guest1, guest2, invitation1, invitation2, reservation, countClient){

	var validate = true;
	if (isCorrect == 0){
		/* 
		* Create all the tables for a presidencial booking
		*/
		con.query(client, function (err, result){
			if (err) throw err;
			console.log('Finished with client');

			/* 
			* Create the stay
			*/
			con.query(stay, function (err, result){
				if (err) throw err;
				/* 
				* Create the invitations
				*/
				if ( countClient == 1) {

					/* 
					* one invitation if 0ne guest
					*/
					con.query(guest1, function (err, result){
						if (err) throw err;

						con.query(invitation1, function (err, result){
							if (err) throw err;
						});
						console.log('Finished with one guest');
					});

				} else if ( countClient == 2) {
					/* 
					* two invitation if two guest
					*/
					con.query(guest1, function (err, result){

						if (err) throw err;
						con.query(guest2, function (err, result){
							if (err) throw err;
						});


						con.query(invitation1, function (err, result){
							if (err) throw err;
							con.query(invitation2, function (err, result){
								if (err) throw err;
							});
						});
					});
					console.log('Finished with the two guest');
				}
			});

			/* 
			* Create the reservation table
			*/
			con.query(reservation, function (err, result){
				if (err) throw err;
				console.log('Finished!!!!!');			
			});

		});

	} else {
		validate = false;
	}

	return validate;

}



/* 
* Function that check if the booking date is correct
*
* result: the existing booking list
* startDateR: the new booking date to check
*/
function checkBookingDates(result, startDateR, bookingEndDay){

	var isCorrect = 0;

	for ( var reserve of result)
			{

				var bookingDate = dateFormat(startDateR, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
				var todayDate = dateFormat(currentDate, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
				var existingDateE = dateFormat(reserve.endDate , "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
				var existingDateS = dateFormat(reserve.startDate, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");

				// the booking date will be a present day
				if (existingDateE  > todayDate ){
					if ( bookingDate > todayDate ) {
						// the booking date must not coincide with any other existence date
						if ( existingDateE > bookingDate ) {
							if ( existingDateS < dateFormat(bookingEndDay, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'") ) {
								isCorrect += 1;
								console.log('Day booking doesn"t match with an existing date! ');
								break;
							}	
						} 	
					} else {
						isCorrect += 1;
						console.log('Day booking is a past day! ');
						break;
					}
				}
			}

	return isCorrect;
}



var server = app.listen(4000, function(){
	console.log("serveur fonctionne sur 4000... ! ");
});
