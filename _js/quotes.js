// JavaScript Document

var quotes = new Array(9);
quotes[0] = "Mathematics are well and good but nature keeps dragging us around by the nose.  <br />~Albert Einstein";
quotes[1] = "If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.  <br />~John Louis von Neumann";
quotes[2] = "Black holes result from God dividing the universe by zero.  <br />~Author Unknown";
quotes[3] = "If equations are trains threading the landscape of numbers, then no train stops at pi.  <br />~Richard Presto";
quotes[4] = "Go down deep enough into anything and you will find mathematics.  <br />~Dean Schlicter";
quotes[5] = "A mathematician is a device for turning coffee into theorems.  <br />~Paul Erdos";
quotes[6] = "A topologist is somebody who does not know the difference between a bagel and a coffee cup.  <br />~Author Unknown";
quotes[7] = "Discussion is an exchange of knowledge; argument is an exchange of ignorance.  <br />~Author Unknown";
quotes[8] = "What can be stated at all, can be stated clearly.  <br />~Wittgenstein";


function random_quote() {
    "use strict";
	return quotes[Math.floor(Math.random() * quotes.length)];
}

