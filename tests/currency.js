define(["doh/main", "require", "../currency", "../i18n"], function(doh, require, currency, i18n){

	var runTest= function(t){
		doh.is("\u20ac123.45", currency.format(123.45, {currency: "EUR", locale: "en-us"}));
		doh.is("$123.45", currency.format(123.45, {currency: "USD", locale: "en-us"}));
		doh.is("$1,234.56", currency.format(1234.56, {currency: "USD", locale: "en-us"}));
		doh.is("US$123.45", currency.format(123.45, {currency: "USD", locale: "en-ca"}));
		doh.is("$123.45", currency.format(123.45, {currency: "CAD", locale: "en-ca"}));
		doh.is("CA$123.45", currency.format(123.45, {currency: "CAD", locale: "en-us"}));
		doh.is("123,45\xa0\u20ac", currency.format(123.45, {currency: "EUR", locale: "de-de"}));
		doh.is("1.234,56\xa0\u20ac", currency.format(1234.56, {currency: "EUR", locale: "de-de"}));
		// There is no special currency symbol for ADP, so expect the ISO code instead
		doh.is("ADP123", currency.format(123, {currency: "ADP", locale: "en-us"}));
		doh.is("$1,234", currency.format(1234, {currency: "USD", fractional: false, locale: "en-us"}));

		doh.is(123.45, currency.parse("$123.45", {currency: "USD", locale: "en-us"}));
		doh.is(1234.56, currency.parse("$1,234.56", {currency: "USD", locale: "en-us"}));
		doh.is(123.45, currency.parse("123,45 \u20ac", {currency: "EUR", locale: "de-de"}));
		doh.is(123.45, currency.parse("123,45\xa0\u20ac", {currency: "EUR", locale: "de-de"}));
		doh.is(1234.56, currency.parse("1.234,56 \u20ac", {currency: "EUR", locale: "de-de"}));
		doh.is(1234.56, currency.parse("1.234,56\u20ac", {currency: "EUR", locale: "de-de"}));

		doh.is(1234, currency.parse("$1,234", {currency: "USD", locale: "en-us"}));
		doh.is(1234, currency.parse("$1,234", {currency: "USD", fractional: false, locale: "en-us"}));
		doh.t(isNaN(currency.parse("$1,234", {currency: "USD", fractional: true, locale: "en-us"})));
	};

	require(["../_base/array",  "../i18n"], function(array){
		doh.register("tests.currency", {
			name: "currency",
			timeout: 2000,
			runTest: function(t){
				var
					def = new doh.Deferred(),
					deps= [];
				array.forEach(["en-us", "en-ca", "de-de"], function(locale){
					deps.push(i18n.getL10nName("dojo/cldr", "currency", locale));
					deps.push(i18n.getL10nName("dojo/cldr", "number", locale));
				});
				require(deps, def.getTestCallback(runTest));
				return def;
			}
		});
	});
});
